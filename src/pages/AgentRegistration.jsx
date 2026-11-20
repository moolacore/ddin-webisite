import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './AgentRegistration.css';

const emptyForm = {
  names: '', nid: '', province: '', district: '', sector: '', cell: '', village: '',
  gender: '', age: '', phone: '', momo_phone: '', email: '', education: '', marital: '',
  emergency_name: '', emergency_phone: '', spouse_name: '', spouse_phone: '',
  business_type: '', ubundi: '', business_name: '', source_type: '', digital_champion_name: '',
  ddin_staff: '', coordinator_name: '', platform: '', tin: '', criminal: '', criminal_ref: '',
  other: '', gps_location: '',
};

const optionLabels = {
  province: 'Province', district: 'District', sector: 'Sector', cell: 'Cell',
  gender: 'Gender', age: 'Year of birth', education: 'Highest education level',
  marital: 'Marital status', business_type: 'Business type', source_type: 'How did you hear about DDIN?',
  digital_champion_name: 'Digital champion', ddin_staff: 'DDIN staff member',
  coordinator_name: 'Territory coordinator', platform: 'Which service do you want to be an agent for?', criminal: 'Do you have a criminal record certificate?',
};

function AgentRegistration() {
  const [options, setOptions] = useState(null);
  const [optionError, setOptionError] = useState('');
  const [values, setValues] = useState(emptyForm);
  const [consents, setConsents] = useState({ terms: false, accuracy: false });
  const [status, setStatus] = useState({ state: 'idle', message: '', errors: [] });

  useEffect(() => {
    let active = true;
    fetch('/api/agent-registration/options')
      .then(async (response) => {
        if (!response.ok) throw new Error('Registration options are temporarily unavailable.');
        return response.json();
      })
      .then((data) => { if (active) setOptions(data); })
      .catch(() => { if (active) setOptionError('We could not load the registration choices. Please try again in a moment.'); });
    return () => { active = false; };
  }, []);

  const filteredDistricts = useMemo(
    () => (options?.district || []).filter((choice) => !values.province || !choice.province || choice.province === values.province),
    [options, values.province],
  );
  const filteredSectors = useMemo(
    () => (options?.sector || []).filter((choice) => !values.district || !choice.district || choice.district === values.district),
    [options, values.district],
  );
  const filteredCells = useMemo(
    () => (options?.cell || []).filter((choice) => !values.sector || !choice.sector || choice.sector === values.sector),
    [options, values.sector],
  );

  const setValue = (name, value) => {
    setValues((current) => {
      const next = { ...current, [name]: value };
      if (name === 'province') Object.assign(next, { district: '', sector: '', cell: '' });
      if (name === 'district') Object.assign(next, { sector: '', cell: '' });
      if (name === 'sector') next.cell = '';
      return next;
    });
  };

  const input = (name, label, props = {}) => (
    <div className="ddin-field" key={name}>
      <label className="form-label" htmlFor={name}>{label}{props.required !== false && <span aria-hidden="true"> *</span>}</label>
      <input className="form-control" id={name} name={name} value={values[name]} onChange={(event) => setValue(name, event.target.value)} {...props} required={props.required !== false} />
    </div>
  );

  const select = (name, label, choices, props = {}) => (
    <div className="ddin-field" key={name}>
      <label className="form-label" htmlFor={name}>{label}{props.required !== false && <span aria-hidden="true"> *</span>}</label>
      <select className="form-select" id={name} name={name} value={values[name]} onChange={(event) => setValue(name, event.target.value)} {...props} required={props.required !== false}>
        <option value="">Choose {label.toLowerCase()}</option>
        {(choices || []).map((choice) => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
      </select>
    </div>
  );

  const file = (name, label, accept, required = false) => (
    <div className="ddin-field" key={name}>
      <label className="form-label" htmlFor={name}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <input className="form-control" id={name} name={name} type="file" accept={accept} required={required} />
      <small className="text-muted">{accept.includes('pdf') ? 'PDF, up to 3 MB.' : 'JPG or PNG, up to 3 MB.'}</small>
    </div>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus({ state: 'submitting', message: 'Sending your application…', errors: [] });
    const form = new FormData(formElement);
    Object.entries(values).forEach(([name, value]) => form.set(name, value));
    form.set('consent', consents.terms ? 'yes' : '');
    form.set('consent1', consents.accuracy ? 'yes1' : '');
    try {
      const response = await fetch('/api/agent-registration', { method: 'POST', body: form });
      const result = await response.json();
      if (!response.ok) {
        setStatus({ state: 'error', message: result.message || 'Please review your application and try again.', errors: result.errors || [] });
        return;
      }
      setStatus({ state: 'success', message: result.message || 'Your application has been received.', errors: [] });
      formElement.reset();
      setValues(emptyForm);
      setConsents({ terms: false, accuracy: false });
    } catch (_error) {
      setStatus({ state: 'error', message: 'We could not send your application. Check your connection and try again.', errors: [] });
    }
  }

  const applicationReady = Boolean(options) && !optionError;

  return (
    <main className="ddin-registration-page">
      <section className="ddin-registration-heading">
        <div className="container">
          <span className="ddin-registration-kicker">DDIN Agent Network</span>
          <h1>Become a DDIN agent</h1>
          <p>Share your details below to apply. Keep your contact information and documents ready before you begin.</p>
          <Link to="/became-an-agent" className="ddin-back-link">Learn about the agent network <i className="fa-solid fa-arrow-right ms-2" /></Link>
        </div>
      </section>

      <section className="container ddin-registration-wrap">
        <div className="ddin-registration-card">
          <div className="ddin-registration-intro">
            <h2>Agent application</h2>
            <p>Fields marked with an asterisk are required. Your documents are sent securely with your application.</p>
          </div>

          {optionError && (
            <div className="alert alert-warning" role="alert">
              {optionError} You can also continue through the <a href="https://ee.kobotoolbox.org/x/a8ESAIFG" target="_blank" rel="noreferrer">DDIN agent application form</a>.
            </div>
          )}

          {status.message && <div className={`alert ${status.state === 'success' ? 'alert-success' : status.state === 'error' ? 'alert-danger' : 'alert-info'}`} role="status">{status.message}</div>}
          {status.errors.length > 0 && (
            <ul className="ddin-form-errors" aria-label="Application errors">
              {status.errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <fieldset disabled={!applicationReady || status.state === 'submitting' || status.state === 'success'}>
              <section className="ddin-form-section">
                <h3>Personal details</h3>
                <div className="ddin-form-grid">
                  {input('names', 'Full name', { autoComplete: 'name' })}
                  {input('nid', 'National ID number', { inputMode: 'numeric', pattern: '\\d{16}', maxLength: 16, title: 'Enter all 16 digits' })}
                  {select('gender', optionLabels.gender, options?.gender)}
                  {select('age', optionLabels.age, options?.age)}
                  {input('phone', 'Phone number', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
                  {input('momo_phone', 'Mobile money phone', { type: 'tel', inputMode: 'tel' })}
                  {input('email', 'Email address', { type: 'email', autoComplete: 'email' })}
                  {select('education', optionLabels.education, options?.education)}
                  {select('marital', optionLabels.marital, options?.marital)}
                  {['single', 'separate', 'widowed'].includes(values.marital) && <>
                    {input('emergency_name', 'Emergency contact name')}
                    {input('emergency_phone', 'Emergency contact phone', { type: 'tel', inputMode: 'tel' })}
                  </>}
                  {values.marital === 'married' && <>
                    {input('spouse_name', 'Spouse name')}
                    {input('spouse_phone', 'Spouse phone', { type: 'tel', inputMode: 'tel' })}
                  </>}
                </div>
              </section>

              <section className="ddin-form-section">
                <h3>Location</h3>
                <div className="ddin-form-grid">
                  {select('province', optionLabels.province, options?.province)}
                  {select('district', optionLabels.district, filteredDistricts, { disabled: !values.province })}
                  {select('sector', optionLabels.sector, filteredSectors, { disabled: !values.district })}
                  {select('cell', optionLabels.cell, filteredCells, { disabled: !values.sector })}
                  {input('village', 'Village')}
                </div>
              </section>

              <section className="ddin-form-section">
                <h3>Business information</h3>
                <div className="ddin-form-grid">
                  {select('business_type', optionLabels.business_type, options?.business_type)}
                  {values.business_type === 'other3' && input('ubundi', 'Describe your business type')}
                  {input('business_name', 'Business name')}
                  {input('tin', 'TIN', { inputMode: 'numeric' })}
                  {select('platform', optionLabels.platform, options?.platform)}
                  {select('criminal', optionLabels.criminal, options?.criminal)}
                  {values.criminal === 'no' && input('criminal_ref', 'Certificate application reference')}
                  {values.criminal === 'yes' && file('criminal_cert', 'Criminal record certificate (optional)', '.pdf', false)}
                </div>
              </section>

              <section className="ddin-form-section">
                <h3>Referral</h3>
                <div className="ddin-form-grid">
                  {select('source_type', optionLabels.source_type, options?.source_type)}
                  {values.source_type === 'champion' && select('digital_champion_name', optionLabels.digital_champion_name, options?.digital_champion_name)}
                  {values.source_type === 'staff' && select('ddin_staff', optionLabels.ddin_staff, options?.ddin_staff)}
                  {values.source_type === 'territory' && select('coordinator_name', optionLabels.coordinator_name, options?.coordinator_name)}
                  {input('other', 'Other referral details', { required: false })}
                </div>
              </section>

              <section className="ddin-form-section">
                <h3>Documents</h3>
                <p className="ddin-section-hint">Upload clear copies so the application team can review your details.</p>
                <div className="ddin-form-grid">
                  {file('id_copy', 'National ID copy (PDF)', '.pdf', true)}
                  {file('rdb', 'RDB certificate or trading license (PDF)', '.pdf', true)}
                  {file('photo', 'Recent profile photo (JPG or PNG)', 'image/jpeg,image/png', true)}
                  {file('imico', 'Conduct certificate (optional PDF)', '.pdf', false)}
                  {input('gps_location', 'GPS location (optional)', { required: false, placeholder: 'Latitude, longitude' })}
                </div>
              </section>

              <section className="ddin-form-section ddin-consent-section">
                <h3>Declaration and consent</h3>
                <label className="ddin-check-row">
                  <input type="checkbox" checked={consents.terms} required onChange={(event) => setConsents((current) => ({ ...current, terms: event.target.checked }))} />
                  <span>I have read and agree to the <a href="https://bit.ly/4biVKHj" target="_blank" rel="noreferrer">DDIN agent terms and conditions</a>.</span>
                </label>
                <label className="ddin-check-row">
                  <input type="checkbox" checked={consents.accuracy} required onChange={(event) => setConsents((current) => ({ ...current, accuracy: event.target.checked }))} />
                  <span>I confirm that the information and documents in this application are accurate.</span>
                </label>
              </section>

              <div className="ddin-form-actions">
                <button type="submit" className="btn btn-success btn-lg px-5" disabled={!applicationReady || status.state === 'submitting' || status.state === 'success'}>
                  {status.state === 'submitting' ? 'Submitting…' : status.state === 'success' ? 'Application received' : 'Submit application'}
                </button>
                <span>Applications are reviewed by the DDIN team.</span>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AgentRegistration;
