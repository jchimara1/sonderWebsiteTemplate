import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { MenuItem } from '@mui/material';
import axiosInstance from "../utils/AxiosInstance.ts";
import NavBar from "./NavBar.tsx";

// ─── Yup Schema ────────────────────────────────────────────────────────────────
const contactFormSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?\d{7,15}$/, 'Phone is not valid'),
  message: Yup.string().max(1000).required(),
  serviceType: Yup.string().required('Service type is required'),
  address: Yup.string().required('Address is required'),
  preferredContact: Yup.mixed<'email' | 'phone'>()
      .oneOf(['email', 'phone'])
      .required('Preferred contact is required'),
});

// ─── API Config ────────────────────────────────────────────────────────────────
const customersURI = `${import.meta.env.VITE_API_URL}api/customers`;
const url = `${import.meta.env.VITE_API_URL}api/emails`;

type EmailPayload = { email: string; name?: string };

const sendEmail = async (payload: EmailPayload) =>
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

// ─── Types ─────────────────────────────────────────────────────────────────────
export type ContactFormFields = {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  serviceType: string;
  address: string;
  preferredContact: 'email' | 'phone';
};

// ─── Static Data ───────────────────────────────────────────────────────────────
const SERVICE_AREAS: string[] = [
  'Austin', 'Cedar Park', 'Round Rock', 'Pflugerville',
  'Georgetown', 'Bee Cave', 'Lakeway', 'Buda',
];

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .cf-page { font-family: 'DM Sans', sans-serif; color: #ffffff; background: #0a0a0a; min-height: 100vh; }

  .cf-header { background: #000000; border-bottom: 0.5px solid #2a2a2a; color: #ffffff; padding: 1.25rem 2rem; }
  .cf-header h1 { font-family: 'DM Serif Display', serif; font-size: 26px; font-weight: 400; margin: 0 0 2px; }
  .cf-header p  { font-size: 13px; margin: 0; opacity: 0.5; font-weight: 300; }

  .cf-body { max-width: 980px; margin: 0 auto; padding: 3rem 1.5rem; }

  .cf-hero { text-align: center; margin-bottom: 3rem; }
  .cf-hero h2 { font-family: 'DM Serif Display', serif; font-size: 42px; font-weight: 400; color: #ffffff; margin: 0 0 0.5rem; letter-spacing: -0.5px; }
  .cf-hero p  { font-size: 16px; color: #888888; margin: 0; font-weight: 300; }

  .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

  .cf-card { background: #141414; border: 0.5px solid #2a2a2a; border-radius: 16px; padding: 2rem; }
  .cf-card-title { font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 400; color: #ffffff; margin: 0 0 1.5rem; }

  .cf-row { display: flex; gap: 12px; margin-bottom: 1rem; }
  .cf-row .cf-field { flex: 1; margin-bottom: 0; }

  .cf-field { margin-bottom: 1rem; }
  .cf-field label {
    display: block; font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #888888; margin-bottom: 5px;
  }
  .cf-field input,
  .cf-field textarea,
  .cf-field select {
    width: 100%; box-sizing: border-box;
    background: #1e1e1e; border: 0.5px solid #333333;
    border-radius: 8px; padding: 10px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #ffffff;
    outline: none; transition: border-color 0.15s;
    appearance: none;
  }
  .cf-field input::placeholder,
  .cf-field textarea::placeholder { color: #555555; }
  .cf-field input:focus,
  .cf-field textarea:focus,
  .cf-field select:focus { border-color: #666666; }
  .cf-field select option { background: #1e1e1e; color: #ffffff; }
  .cf-field textarea { resize: vertical; min-height: 110px; }
  .cf-error { font-size: 11px; color: #ff6b6b; margin: 4px 0 0; }

  .cf-btn {
    width: 100%; background: #ffffff; color: #000000; border: none;
    border-radius: 8px; padding: 13px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    letter-spacing: 0.04em; cursor: pointer; margin-top: 0.5rem;
    transition: background 0.15s;
  }
  .cf-btn:hover { background: #e0e0e0; }
  .cf-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .cf-success { text-align: center; padding: 2.5rem 1rem; }
  .cf-success .title { font-family: 'DM Serif Display', serif; font-size: 22px; margin: 12px 0 6px; color: #ffffff; }
  .cf-success .sub   { font-size: 14px; color: #888888; margin: 0; }

  .cf-info-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1.5rem; }
  .cf-icon {
    width: 38px; height: 38px; border-radius: 50%;
    background: #2a2a2a; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0;
  }
  .cf-info-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #888888; margin: 0 0 3px; }
  .cf-info-value { font-size: 14px; color: #ffffff; margin: 0; line-height: 1.6; }

  .cf-divider { border-top: 0.5px solid #2a2a2a; padding-top: 1.25rem; margin-top: 0.5rem; }

  .cf-areas { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 0.75rem; }
  .cf-area-tag { background: #2a2a2a; border-radius: 20px; padding: 4px 12px; font-size: 12px; color: #cccccc; }

  .cf-map { margin-top: 1.5rem; border-radius: 12px; overflow: hidden; border: 0.5px solid #2a2a2a; height: 175px; }

  .cf-footer { background: #000000; border-top: 0.5px solid #2a2a2a; text-align: center; padding: 1.25rem; font-size: 13px; color: #555555; margin-top: 4rem; }

  @media (max-width: 680px) {
    .cf-grid { grid-template-columns: 1fr; }
    .cf-hero h2 { font-size: 32px; }
    .cf-row { flex-direction: column; }
  }
`;

// ─── Component ─────────────────────────────────────────────────────────────────
const ContactPage = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormFields>({
    defaultValues: {
      firstName: '',
      email: '',
      phone: '',
      message: '',
      serviceType: '',
      address: '',
      preferredContact: 'phone',
    },
    resolver: yupResolver(contactFormSchema),
  });

  const postEvent = async (event: ContactFormFields): Promise<ContactFormFields> => {
    const apiResponse = await axiosInstance.post(customersURI, event);
    return apiResponse.data;
  };

  const onSubmit = async (data: ContactFormFields) => {
    try {
      const res = await sendEmail({ email: getValues('email'), name: getValues('firstName') });
      const text = await res.text();
      console.log('status', res.status, 'body', text);
    } catch (e) {
      console.error('fetch failed', e);
    }

    // Reset all fields
    setValue('firstName', '');
    setValue('email', '');
    setValue('message', '');
    setValue('phone', '');
    setValue('address', '');
    setValue('serviceType', '');
    setValue('preferredContact', 'email');

    await postEvent(data);
  };

  return (
      <>
        <style>{styles}</style>
        <NavBar />

        <div className="cf-page">
          {/* Header */}
          <div className="cf-header">
            <h1>TerraFormATX</h1>
            <p>Landscape Design &amp; Outdoor Living · Austin, TX</p>
          </div>

          <div className="cf-body">
            {/* Hero */}
            <div className="cf-hero">
              <h2>Get in Touch</h2>
              <p>Ready to transform your outdoor space? We'd love to hear from you.</p>
            </div>

            <div className="cf-grid">
              {/* ── Contact Form ── */}
              <div className="cf-card">
                <p className="cf-card-title">Get a Free Quote</p>

                {isSubmitSuccessful ? (
                    <div className="cf-success">
                      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <circle cx="26" cy="26" r="26" fill="#2a2a2a" />
                        <path d="M15 26l8 8 14-16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="title">Message sent!</p>
                      <p className="sub">We'll be in touch within 1 business day.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      {/* Name + Email */}
                      <div className="cf-row">
                        <div className="cf-field">
                          <label htmlFor="firstName">Name</label>
                          <input id="firstName" {...register('firstName')} placeholder="Jane Smith" />
                          {errors.firstName && <p className="cf-error">{errors.firstName.message}</p>}
                        </div>
                        <div className="cf-field">
                          <label htmlFor="email">Email</label>
                          <input id="email" type="email" {...register('email')} placeholder="jane@email.com" />
                          {errors.email && <p className="cf-error">{errors.email.message}</p>}
                        </div>
                      </div>

                      {/* Phone + Address */}
                      <div className="cf-row">
                        <div className="cf-field">
                          <label htmlFor="phone">Phone</label>
                          <input id="phone" {...register('phone')} placeholder="(512) 555-0100" />
                          {errors.phone && <p className="cf-error">{errors.phone.message}</p>}
                        </div>
                        <div className="cf-field">
                          <label htmlFor="address">Address</label>
                          <input id="address" {...register('address')} placeholder="123 Main St, Austin TX" />
                          {errors.address && <p className="cf-error">{errors.address.message}</p>}
                        </div>
                      </div>

                      {/* Service Type */}
                      <div className="cf-field">
                        <label htmlFor="serviceType">Service Type</label>
                        <select id="serviceType" {...register('serviceType')} defaultValue="">
                          <option value="" disabled>Select a service...</option>
                          <option value="landscape_design">Landscape Design</option>
                          <option value="lawn_maintenance">Lawn Care &amp; Maintenance</option>
                          <option value="hardscaping">Hardscaping</option>
                          <option value="irrigation">Irrigation Systems</option>
                          <option value="tree_shrub">Tree &amp; Shrub Care</option>
                          <option value="not_sure">Need an Estimate</option>
                        </select>
                        {errors.serviceType && <p className="cf-error">{errors.serviceType.message}</p>}
                      </div>

                      {/* Message */}
                      <div className="cf-field">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" {...register('message')} placeholder="Tell us about your project..." />
                        {errors.message && <p className="cf-error">{errors.message.message}</p>}
                      </div>

                      {/* Preferred Contact — Controller preserved from original */}
                      <div className="cf-field">
                        <label htmlFor="preferredContact">Preferred Contact</label>
                        <Controller
                            name="preferredContact"
                            control={control}
                            render={({ field }) => (
                                <select id="preferredContact" {...field}>
                                  <MenuItem component="option" value="email">Email</MenuItem>
                                  <MenuItem component="option" value="phone">Phone</MenuItem>
                                </select>
                            )}
                        />
                        {errors.preferredContact && <p className="cf-error">{errors.preferredContact.message}</p>}
                      </div>

                      <button type="submit" className="cf-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                )}
              </div>

              {/* ── Info Panel ── */}
              <div className="cf-card">
                <p className="cf-card-title">Contact Info</p>

                <div className="cf-info-item">
                  <div className="cf-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.99 1.18 2 2 0 012.98 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="cf-info-label">Phone</p>
                    <p className="cf-info-value">(512) 555-1234</p>
                  </div>
                </div>

                <div className="cf-info-item">
                  <div className="cf-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <p className="cf-info-label">Email</p>
                    <p className="cf-info-value">hello@terraformatx.com</p>
                  </div>
                </div>

                <div className="cf-info-item">
                  <div className="cf-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="cf-info-label">Hours</p>
                    <p className="cf-info-value">Mon–Fri: 7am – 6pm<br />Sat: 8am – 4pm<br />Sun: Closed</p>
                  </div>
                </div>

                <div className="cf-divider">
                  <p className="cf-info-label">Service Areas</p>
                  <div className="cf-areas">
                    {SERVICE_AREAS.map((area) => (
                        <span key={area} className="cf-area-tag">{area}</span>
                    ))}
                  </div>
                </div>

                {/* Google Maps embed — replace src with your own embed URL */}
                <div className="cf-map">
                  <iframe
                      title="TerraFormATX service area"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220756.4!2d-97.7430608!3d30.2671530!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b592e8ee2b5d%3A0x55e53259c73bf2c5!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="cf-footer">
            © 2026 TerraFormATX. All rights reserved.
          </div>
        </div>
      </>
  );
};

export default ContactPage;