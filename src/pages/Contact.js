import React, { useState } from 'react';

const contactInfo = [
  {
    icon: "fa-solid fa-phone",
    href: "tel:+250783038641",
    label: "Call Us",
    value: "+250 783 038 641",
  },
  {
    icon: "fa-solid fa-envelope-circle-check",
    href: "mailto:contacts@ddin.rw",
    label: "Drop Us Mail",
    value: "contacts@ddin.rw",
  },
  {
    icon: "fa-solid fa-location-pin",
    href: "#",
    label: "Reach Us",
    value: "KN 78 ST, NORRSKEN HOUSE KIGALI",
  },
];

const featureCards = [
  {
    icon: "fa-regular fa-clock",
    title: "Time Saving",
    text: "Our efficient agent network streamlines transactions, saving you valuable time and making it easier.",
  },
  {
    icon: "fa-solid fa-shield-heart",
    title: "Secure Payment",
    text: "With our robust agent network, your transactions are handled securely and reliably, ensuring peace of mind.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "24x7 Support",
    text: "Our dedicated agent network provides round-the-clock support, ensuring you can get help whenever you need it.",
  },
];

const initialForm = { names: '', email: '', phone: '', subject: '', messages: '', agree: false };
const initialErrors = { names: '', email: '', phone: '', subject: '', messages: '' };

function Contact() {
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState(initialErrors);
  const [status, setStatus]   = useState(null); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = { ...initialErrors };
    if (!form.names.trim())                        e.names    = 'Name is required.';
    if (!form.email.trim())                        e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email))    e.email    = 'Enter a valid email.';
    if (!form.phone.trim())                        e.phone    = 'Phone is required.';
    if (!form.subject.trim())                      e.subject  = 'Subject is required.';
    if (!form.messages.trim())                     e.messages = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          names:    form.names,
          email:    form.email,
          phone:    form.phone,
          subject:  form.subject,
          messages: form.messages,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ============================ Breadcrumbs =========================== */}
      <section
        className="bg-cover"
        style={{ background: 'url(assets/img/banner.jpg) no-repeat' }}
        data-overlay="4"
      >
        <div className="ht-80"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 col-12">
              <h1 className="text-light mb-4">
                We're delighted that<br />you want to connect with us.
              </h1>
              <p className="fs-5 fw-light text-light mb-4">
                Whether you have questions, feedback, or inquiries, this is the place to reach out.
                Our team is here and eager to assist you.
              </p>
              <a href="#estimate" className="btn btn-primary px-5">Let's Talk</a>
            </div>
          </div>
        </div>
        <div className="ht-80"></div>
      </section>
      {/* ============================ Breadcrumbs End ======================= */}

      {/* ============================ Contact Form Start ================================== */}
      <section id="estimate">
        <div className="container">
          <div className="row align-items-center justify-content-between">

            {/* Form */}
            <div className="col-xl-6 col-lg-6 col-md-11 mb-3">
              <h2 className="fs-1 fw-bold mb-4">Lets Talk<span className="text-danger">.</span></h2>
              <p>Let's create something extraordinary together</p>

              {status === 'success' && (
                <div className="alert alert-success">Your message has been sent successfully!</div>
              )}
              {status === 'error' && (
                <div className="alert alert-danger">Something went wrong. Please try again.</div>
              )}

              <div className="row g-4" id="contact-form">
                <div className="col-sm-6">
                  <div className="form-floating mb-1">
                    <input
                      className={`form-control ${errors.names ? 'is-invalid' : ''}`}
                      type="text"
                      name="names"
                      placeholder="Your name"
                      value={form.names}
                      onChange={handleChange}
                    />
                    <label>Name</label>
                    {errors.names && <span className="text-danger">{errors.names}</span>}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating mb-1">
                    <input
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    <label>Email</label>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating mb-1">
                    <input
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      type="text"
                      name="phone"
                      placeholder="Your Phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    <label>Phone</label>
                    {errors.phone && <span className="text-danger">{errors.phone}</span>}
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-floating mb-1">
                    <input
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                    />
                    <label>Subject</label>
                    {errors.subject && <span className="text-danger">{errors.subject}</span>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating mb-1">
                    <textarea
                      className={`form-control ht-150 ${errors.messages ? 'is-invalid' : ''}`}
                      name="messages"
                      placeholder="Type your comment here..."
                      value={form.messages}
                      onChange={handleChange}
                    />
                    <label>Comment</label>
                    {errors.messages && <span className="text-danger">{errors.messages}</span>}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      name="agree"
                      type="checkbox"
                      checked={form.agree}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      I agree to the{' '}
                      <a className="nav-link d-inline fs-normal text-decoration-underline p-0" href="#">
                        Terms &amp; Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary px-lg-4"
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !form.agree}
                  >
                    {loading ? 'Sending...' : 'Send your Message'}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-xl-5 col-lg-5 col-md-5">
              <h2 className="fw-bold mb-4">Reach Us<span className="text-danger">.</span></h2>
              <p>
                At DDIN, we value your feedback, inquiries, and ideas. Our team is here to assist
                you and provide the support you need. Whether you have a question, a suggestion,
                or just want to say hello, there are multiple ways to reach us.
              </p>
              <ul className="p-0 m-0 mt-4" style={{ listStyle: 'none' }}>
                {contactInfo.map(({ icon, href, label, value }) => (
                  <li className="d-flex mb-3" key={label}>
                    <i className={`${icon} text-primary fs-5 me-3`}></i>
                    <a className="text-dark" href={href}>
                      {label}<br />
                      <span className="text-muted fw-semibold">{value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      {/* ============================ Contact Form End ================================== */}

      {/* ============================ Features Strip Start ================================== */}
      <section className="bg-seegreen pt-4 pb-4">
        <div className="container">
          <div className="row g-4">
            {featureCards.map(({ icon, title, text }) => (
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12" key={title}>
                <div className="d-flex align-items-center">
                  <div className="exljk-icon text-warning fs-2">
                    <i className={icon}></i>
                  </div>
                  <div className="exljk-caps ps-3">
                    <h5 className="text-light fw-semibold">{title}</h5>
                    <p className="m-0 text-light lh-base opacity-75">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="clearfix"></div>
      {/* ============================ Features Strip End ================================== */}
    </div>
  );
}

export default Contact;