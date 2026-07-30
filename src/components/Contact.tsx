'use client';

import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', date:'', message:'' });
  const ch = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const sub = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

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
                { icon:'📍', label:'Location',     value:'Colombo, Sri Lanka (Available Islandwide)' },
                { icon:'📞', label:'Phone',        value:'+94 77 000 0000' },
                { icon:'✉️', label:'Email',        value:'hello@tharuphotography.lk' },
                { icon:'⏰', label:'Availability', value:'Mon – Sun, 6am – 8pm' },
              ].map(d => (
                <div className="c-detail" key={d.label}>
                  <div className="c-icon">{d.icon}</div>
                  <div><div className="c-lbl">{d.label}</div><div className="c-val">{d.value}</div></div>
                </div>
              ))}
            </div>
            <div className="c-socials">
              {[
                {icon:'📷',label:'Instagram',href:'#'},
                {icon:'👤',label:'Facebook', href:'#'},
                {icon:'▶️',label:'YouTube',  href:'#'},
                {icon:'🐦',label:'Twitter',  href:'#'},
              ].map(s => (
                <a key={s.label} href={s.href} className="c-soc" aria-label={s.label}
                  id={`social-${s.label.toLowerCase()}`}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="c-form">
            {sent ? (
              <div className="f-success show">
                <div style={{fontSize:'3rem',marginBottom:'1rem'}}>✦</div>
                <p>Thank you! I&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={sub} noValidate>
                <div className="f-row">
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-name">Full Name</label>
                    <input id="c-name" type="text" name="name" className="f-input"
                      placeholder="Your name" value={form.name} onChange={ch} required />
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" name="email" className="f-input"
                      placeholder="your@email.com" value={form.email} onChange={ch} required />
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-phone">Phone</label>
                    <input id="c-phone" type="tel" name="phone" className="f-input"
                      placeholder="+94 77 000 0000" value={form.phone} onChange={ch} />
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="c-service">Service</label>
                    <select id="c-service" name="service" className="f-select"
                      value={form.service} onChange={ch} required>
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="engagement">Engagement Session</option>
                      <option value="portrait">Portrait Session</option>
                      <option value="graduation">Graduation</option>
                      <option value="birthday">Birthday & Events</option>
                      <option value="kids">Kids & Family</option>
                    </select>
                  </div>
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="c-date">Preferred Date</label>
                  <input id="c-date" type="date" name="date" className="f-input"
                    value={form.date} onChange={ch} style={{colorScheme:'dark'}} />
                </div>
                <div className="f-group">
                  <label className="f-label" htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" name="message" className="f-textarea"
                    placeholder="Tell me about your vision, location, special requirements..."
                    value={form.message} onChange={ch} />
                </div>
                <button type="submit" className="f-submit" id="contact-submit-btn">
                  Send Inquiry ✦
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
