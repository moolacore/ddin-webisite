const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const port = Number(process.env.API_PORT || (process.env.NODE_ENV === 'production' ? process.env.PORT : undefined) || 5001);
const koboBaseUrl = (process.env.KOBO_BASE_URL || 'https://kf.kobotoolbox.org').replace(/\/$/, '');
const requiredConfig = ['KOBO_API_TOKEN', 'KOBO_ASSET_UID', 'KOBO_USERNAME', 'KOBO_FORM_ID', 'KOBO_FORM_UUID'];
const listFields = {
  province: 'provinces',
  district: 'districts',
  sector: 'sectors',
  cell: 'cells',
  gender: 'gender',
  age: 'age',
  education: 'education',
  marital: 'marital',
  business_type: 'business_type',
  source_type: 'source_type',
  ddin_staff: 'ddin_staff',
  digital_champion_name: 'digital_champions',
  coordinator_name: 'coordinators',
  platform: 'platform',
  criminal: 'criminal',
  consent: 'consent',
  consent1: 'consent1',
};
const fields = [
  'names', 'nid', 'province', 'district', 'sector', 'cell', 'village', 'gender', 'age',
  'phone', 'momo_phone', 'email', 'education', 'marital', 'emergency_name', 'emergency_phone',
  'spouse_name', 'spouse_phone', 'business_type', 'ubundi', 'business_name', 'source_type',
  'digital_champion_name', 'ddin_staff', 'coordinator_name', 'platform', 'tin', 'criminal',
  'criminal_ref', 'other', 'gps_location', 'consent', 'consent1',
];
const fileFields = ['id_copy', 'rdb', 'photo', 'criminal_cert', 'imico'];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: fileFields.length, fileSize: 3 * 1024 * 1024, fields: 50, fieldSize: 20 * 1024 },
});

let cachedOptions;
let cachedOptionsAt = 0;

function configIsReady() {
  return requiredConfig.every((key) => Boolean(process.env[key]));
}

async function getAssetOptions() {
  if (cachedOptions && Date.now() - cachedOptionsAt < 60 * 60 * 1000) return cachedOptions;
  const response = await fetch(`${koboBaseUrl}/api/v2/assets/${encodeURIComponent(process.env.KOBO_ASSET_UID)}/`, {
    headers: { Authorization: `Token ${process.env.KOBO_API_TOKEN}`, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Kobo options request failed (${response.status})`);
  const asset = await response.json();
  const content = asset.content || {};
  const choices = Array.isArray(content.choices) ? content.choices : [];
  const survey = Array.isArray(content.survey) ? content.survey : [];
  const formOptions = {};

  Object.entries(listFields).forEach(([fieldName, listName]) => {
    const question = survey.find((item) => item.name === fieldName);
    const fromQuestion = question && String(question.type || '').match(/^select_(?:one|multiple)\s+(.+)$/);
    const actualListName = fromQuestion ? fromQuestion[1] : listName;
    formOptions[fieldName] = choices
      .filter((choice) => choice.list_name === actualListName)
      .map((choice) => {
        const label = Array.isArray(choice.label)
          ? (choice.label[1] || choice.label[0] || choice.name)
          : choice.label && typeof choice.label === 'object'
            ? (choice.label.English || Object.values(choice.label)[0] || choice.name)
            : (choice.label || choice.name);
        return {
          value: choice.name,
          label: String(label),
          province: choice.province,
          district: choice.district,
          sector: choice.sector,
        };
      });
  });

  cachedOptions = formOptions;
  cachedOptionsAt = Date.now();
  return formOptions;
}

function escapeXml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function xmlNode(name, value) {
  return `<${name}>${escapeXml(value)}</${name}>`;
}

function isBlank(value) {
  return value == null || String(value).trim() === '';
}

function requireFields(body, names) {
  return names.filter((name) => isBlank(body[name]));
}

function validFile(file, acceptedType) {
  if (!file) return false;
  if (acceptedType === 'pdf') return file.buffer.subarray(0, 5).toString() === '%PDF-';
  if (acceptedType === 'image') {
    const jpeg = file.buffer[0] === 0xff && file.buffer[1] === 0xd8 && file.buffer[2] === 0xff;
    const png = file.buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
    return jpeg || png;
  }
  return true;
}

function validateSubmission(body, files, options) {
  const errors = [];
  const required = [
    'names', 'nid', 'province', 'district', 'sector', 'cell', 'village', 'gender', 'age', 'phone',
    'momo_phone', 'email', 'education', 'marital', 'business_type', 'business_name', 'source_type',
    'platform', 'tin', 'criminal', 'consent', 'consent1',
  ];
  errors.push(...requireFields(body, required).map((field) => `${field} is required.`));

  if (body.nid && !/^\d{16}$/.test(body.nid)) errors.push('National ID must contain 16 digits.');
  ['phone', 'momo_phone', 'tin', 'emergency_phone', 'spouse_phone'].forEach((field) => {
    if (body[field] && !/^\d{8,16}$/.test(body[field].replace(/[\s+()-]/g, ''))) {
      errors.push(`${field} must contain digits only.`);
    }
  });
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Enter a valid email address.');

  if (['single', 'separate', 'widowed'].includes(body.marital)) {
    errors.push(...requireFields(body, ['emergency_name', 'emergency_phone']).map((field) => `${field} is required.`));
  }
  if (body.marital === 'married') {
    errors.push(...requireFields(body, ['spouse_name', 'spouse_phone']).map((field) => `${field} is required.`));
  }
  if (body.business_type === 'other3' && isBlank(body.ubundi)) errors.push('Please describe the other business type.');
  if (body.source_type === 'champion' && isBlank(body.digital_champion_name)) errors.push('Please select the digital champion who referred you.');
  if (body.source_type === 'staff' && isBlank(body.ddin_staff)) errors.push('Please select the DDIN staff member who referred you.');
  if (body.source_type === 'territory' && isBlank(body.coordinator_name)) errors.push('Please select your territory coordinator.');
  if (body.criminal === 'no' && isBlank(body.criminal_ref)) errors.push('Please provide the requested reference for this declaration.');

  Object.entries(listFields).forEach(([field, listName]) => {
    if (isBlank(body[field])) return;
    const allowed = options[field] || [];
    if (!allowed.some((choice) => choice.value === body[field])) errors.push(`Choose a valid ${field.replace(/_/g, ' ')}.`);
  });

  const province = (options.province || []).find((choice) => choice.value === body.province);
  const district = (options.district || []).find((choice) => choice.value === body.district);
  const sector = (options.sector || []).find((choice) => choice.value === body.sector);
  const cell = (options.cell || []).find((choice) => choice.value === body.cell);
  if (district && district.province && district.province !== body.province) errors.push('Select a district in the chosen province.');
  if (sector && sector.district && sector.district !== body.district) errors.push('Select a sector in the chosen district.');
  if (cell && cell.sector && cell.sector !== body.sector) errors.push('Select a cell in the chosen sector.');
  if (!province && body.province) errors.push('Choose a valid province.');
  if (body.consent !== 'yes' || body.consent1 !== 'yes1') errors.push('Both consent checkboxes must be accepted to submit.');

  const requiredFiles = ['id_copy', 'rdb', 'photo'];
  requiredFiles.forEach((field) => {
    if (!files[field] || !validFile(files[field][0], field === 'photo' ? 'image' : 'pdf')) {
      errors.push(`${field === 'id_copy' ? 'National ID copy' : field === 'rdb' ? 'Business registration certificate' : 'Profile photo'} is required in a supported format.`);
    }
  });
  ['criminal_cert', 'imico'].forEach((field) => {
    if (files[field] && !validFile(files[field][0], '')) errors.push(`${field.replace(/_/g, ' ')} could not be read.`);
  });
  return errors;
}

function buildOpenRosaXml(body, files) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const attachmentNames = {};
  Object.entries(files).forEach(([field, list]) => {
    if (!list || !list[0]) return;
    const file = list[0];
    const extension = path.extname(file.originalname).toLowerCase() || (field === 'photo' ? '.jpg' : '.pdf');
    attachmentNames[field] = `${field}_${crypto.randomUUID()}${extension}`;
  });
  const nodes = [
    xmlNode('start', now.toISOString()),
    xmlNode('end', now.toISOString()),
    xmlNode('today', today),
    `<formhub>${xmlNode('uuid', process.env.KOBO_FORM_UUID)}</formhub>`,
  ];
  fields.forEach((field) => nodes.push(xmlNode(field, body[field] || '')));
  fileFields.forEach((field) => nodes.push(xmlNode(field, attachmentNames[field] || '')));
  nodes.push(`<meta>${xmlNode('instanceID', `uuid:${crypto.randomUUID()}`)}</meta>`);
  return {
    xml: `<?xml version="1.0" encoding="UTF-8"?><${process.env.KOBO_ASSET_UID} id="${escapeXml(process.env.KOBO_FORM_ID)}">${nodes.join('')}</${process.env.KOBO_ASSET_UID}>`,
    attachmentNames,
  };
}

app.get('/api/health', (_req, res) => res.json({ ready: configIsReady() }));

app.get('/api/agent-registration/options', async (_req, res) => {
  if (!configIsReady()) return res.status(503).json({ message: 'Registration is temporarily unavailable.' });
  try {
    const options = await getAssetOptions();
    return res.json(options);
  } catch (_error) {
    return res.status(502).json({ message: 'Registration details could not be loaded. Please try again later.' });
  }
});

app.post('/api/agent-registration', upload.fields(fileFields.map((name) => ({ name, maxCount: 1 }))), async (req, res) => {
  if (!configIsReady()) return res.status(503).json({ message: 'Registration is temporarily unavailable.' });
  const files = req.files || {};
  try {
    const options = await getAssetOptions();
    const body = { ...(req.body || {}) };
    ['phone', 'momo_phone', 'emergency_phone', 'spouse_phone', 'tin'].forEach((field) => {
      if (body[field]) body[field] = body[field].replace(/[\s+()-]/g, '');
    });
    const errors = validateSubmission(body, files, options);
    if (errors.length) return res.status(400).json({ message: 'Please review the highlighted information.', errors });

    const submission = buildOpenRosaXml(body, files);
    const formData = new FormData();
    formData.append('xml_submission_file', new Blob([submission.xml], { type: 'text/xml' }), 'submission.xml');
    Object.entries(files).forEach(([field, fileList]) => {
      if (!fileList || !fileList[0]) return;
      const file = fileList[0];
      const name = submission.attachmentNames[field];
      formData.append(name, new Blob([file.buffer], { type: file.mimetype }), name);
    });

    const koboResponse = await fetch(`${koboBaseUrl}/${encodeURIComponent(process.env.KOBO_USERNAME)}/submission?format=json`, {
      method: 'POST',
      headers: { Authorization: `Token ${process.env.KOBO_API_TOKEN}` },
      body: formData,
    });
    if (!koboResponse.ok) {
      console.error('Kobo submission rejected with status', koboResponse.status);
      return res.status(502).json({ message: 'We could not complete your registration right now. Please try again later.' });
    }
    return res.status(201).json({ message: 'Your agent application has been received.' });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: 'One or more uploaded files are too large or could not be processed.' });
    }
    console.error('Agent registration could not be submitted.');
    return res.status(502).json({ message: 'We could not complete your registration right now. Please try again later.' });
  }
});

const buildPath = path.resolve(__dirname, '../build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => res.sendFile(path.join(buildPath, 'index.html')));
}

app.listen(port, () => console.log(`DDIN website server listening on port ${port}`));
