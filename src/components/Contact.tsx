'use client';

import { useState, useRef, useEffect } from 'react';

const SERVICE_GROUPS = [
  {
    group: 'Engagement',
    options: [
      { value: 'eng-lite', label: 'Engagement — Lite' },
      { value: 'eng-classic', label: 'Engagement — Classic' },
    ],
  },
  {
    group: 'Wedding',
    options: [
      { value: 'wed-basic', label: 'Wedding — Basic' },
      { value: 'wed-standard', label: 'Wedding — Standard' },
      { value: 'wed-essential', label: 'Wedding — The Essential' },
      { value: 'wed-essential2', label: 'Wedding — The Essential 2' },
      { value: 'wed-premium', label: 'Wedding — Premium' },
    ],
  },
  {
    group: 'Events & Portraits',
    options: [
      { value: 'events-pkg', label: 'Events Photography (Discuss with Photographer)' },
      { value: 'portrait-pkg', label: 'Portrait & Lifestyle (Discuss with Photographer)' },
    ],
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allServiceOptions = SERVICE_GROUPS.flatMap(g => g.options);
  const selectedService = allServiceOptions.find(o => o.value === form.service);
  const serviceLabel = selectedService ? selectedService.label : 'Select a package';

  const validate = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (value.replace(/[^0-9]/g, '').length < 7) return 'Please enter a valid phone number';
        return '';
      case 'service':
        if (!value) return 'Please select a photography package';
        return '';
      case 'date':
        if (!value) return 'Please select your preferred date';
        return '';
      case 'message':
        if (!value.trim()) return 'Please enter your message or requirements';
        return '';
      default:
        return '';
    }
  };

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const sub = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {
      name: validate('name', form.name),
      email: validate('email', form.email),
      phone: validate('phone', form.phone),
      service: validate('service', form.service),
      date: validate('date', form.date),
      message: validate('message', form.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      date: true,
      message: true,
    });

    const hasErrors = Object.values(newErrors).some(err => err !== '');
    if (!hasErrors) {
      setSent(true);
    } else {
      if (newErrors.name) document.getElementById('c-name')?.focus();
      else if (newErrors.email) document.getElementById('c-email')?.focus();
      else if (newErrors.phone) document.getElementById('c-phone')?.focus();
      else if (newErrors.service) {
        document.getElementById('c-service')?.focus();
        setDropdownOpen(true);
      }
      else if (newErrors.date) document.getElementById('c-date')?.focus();
      else if (newErrors.message) document.getElementById('c-msg')?.focus();
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div>
            <div className="label">Get in Touch</div>
            <h2 className="contact-title">
              Let&apos;s Create Something <em>Beautiful</em> Together
            </h2>
            <p className="contact-txt">
              Ready to book a session? I&apos;d love to hear from you.
              Fill out the form and I&apos;ll get back within 24 hours.
            </p>
            <div className="contact-details">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: 'Location',
                  value: 'Matara, Sri Lanka (Available Islandwide)',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  label: 'Phone',
                  value: '94 77 524 2150',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'tharushadilshan@gmail.com',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  label: 'Availability',
                  value: 'Mon – Sun, 6am – 8pm',
                },
              ].map(d => (
                <div className="c-detail" key={d.label}>
                  <div className="c-icon">{d.icon}</div>
                  <div><div className="c-lbl">{d.label}</div><div className="c-val">{d.value}</div></div>
                </div>
              ))}
            </div>
            {/* <div className="c-socials">
              {[
                { icon: '📷', label: 'Instagram', href: '#' },
                { icon: '👤', label: 'Facebook', href: '#' },
                { icon: '▶️', label: 'YouTube', href: '#' },
                { icon: '🐦', label: 'Twitter', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} className="c-soc" aria-label={s.label}
                  id={`social-${s.label.toLowerCase()}`}>{s.icon}</a>
              ))}
            </div> */}
          </div>

          {/* Form */}
          <div className="c-form">
            {sent ? (
              <div className="f-success show">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
                <p>Thank you! I&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={sub} noValidate>
                <div className="f-row">
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-name">Full Name</label>
                    <input
                      id="c-name"
                      type="text"
                      name="name"
                      className={`f-input ${errors.name ? 'has-error' : ''}`}
                      placeholder="Your name"
                      value={form.name}
                      onChange={ch}
                      onBlur={handleBlur}
                    />
                    {errors.name && (
                      <span className="f-error">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-email">Email</label>
                    <input
                      id="c-email"
                      type="email"
                      name="email"
                      className={`f-input ${errors.email ? 'has-error' : ''}`}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={ch}
                      onBlur={handleBlur}
                    />
                    {errors.email && (
                      <span className="f-error">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-phone">Phone</label>
                    <input
                      id="c-phone"
                      type="tel"
                      name="phone"
                      className={`f-input ${errors.phone ? 'has-error' : ''}`}
                      placeholder="94 77 524 2150"
                      value={form.phone}
                      onChange={ch}
                      onBlur={handleBlur}
                    />
                    {errors.phone && (
                      <span className="f-error">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-service">Service</label>
                    <div className="custom-select-wrap" ref={dropdownRef}>
                      <input type="hidden" name="service" value={form.service} />
                      <button
                        type="button"
                        id="c-service"
                        className={`custom-select-trigger ${dropdownOpen ? 'active' : ''} ${form.service ? 'has-value' : ''} ${errors.service ? 'has-error' : ''}`}
                        onClick={() => {
                          setDropdownOpen(o => !o);
                          if (!touched.service) {
                            setTouched(prev => ({ ...prev, service: true }));
                          }
                        }}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                      >
                        <span className="custom-select-value">{serviceLabel}</span>
                        <svg
                          className={`select-chevron ${dropdownOpen ? 'open' : ''}`}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {dropdownOpen && (
                        <div className="custom-select-dropdown" role="listbox">
                          {SERVICE_GROUPS.map((grp) => (
                            <div key={grp.group} className="select-optgroup">
                              <div className="select-optgroup-title">{grp.group}</div>
                              {grp.options.map((opt) => {
                                const isSelected = form.service === opt.value;
                                return (
                                  <div
                                    key={opt.value}
                                    className={`select-option ${isSelected ? 'selected' : ''}`}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                      setForm(f => ({ ...f, service: opt.value }));
                                      setTouched(prev => ({ ...prev, service: true }));
                                      setErrors(prev => ({ ...prev, service: '' }));
                                      setDropdownOpen(false);
                                    }}
                                  >
                                    <span className="select-option-text">{opt.label}</span>
                                    {isSelected && (
                                      <svg
                                        className="select-check"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.service && (
                      <span className="f-error">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {errors.service}
                      </span>
                    )}
                  </div>
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="c-date">Preferred Date</label>
                  <input
                    id="c-date"
                    type="date"
                    name="date"
                    className={`f-input ${errors.date ? 'has-error' : ''}`}
                    value={form.date}
                    onChange={ch}
                    onBlur={handleBlur}
                    style={{ colorScheme: 'dark' }}
                  />
                  {errors.date && (
                    <span className="f-error">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {errors.date}
                    </span>
                  )}
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="c-msg">Message</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    className={`f-textarea ${errors.message ? 'has-error' : ''}`}
                    placeholder="Tell me about your vision, location, special requirements..."
                    value={form.message}
                    onChange={ch}
                    onBlur={handleBlur}
                  />
                  {errors.message && (
                    <span className="f-error">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {errors.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="f-submit" id="contact-submit-btn">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
