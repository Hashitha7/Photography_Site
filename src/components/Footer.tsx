'use client';

export default function Footer() {
  const go = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Pre-footer Luxury CTA Banner */}
        <div className="footer-cta-banner">
          <div className="footer-cta-left">
            <span className="footer-cta-badge">✦ RESERVE YOUR DATE</span>
            <h3 className="footer-cta-title">
              Let&apos;s Create Timeless <em>Memories</em> Together
            </h3>
            <p className="footer-cta-desc">
              Now accepting bookings for weddings, engagements, and special celebrations across Sri Lanka &amp; worldwide.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="footer-cta-btn"
          >
            <span>Book a Session</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Main Footer Columns */}
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col footer-col-brand">
            <a
              href="#hero"
              onClick={(e) => go(e, '#hero')}
              className="f-brand-lockup"
            >
              <div className="f-logo-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/T FINAL 4.4.png"
                  alt="Tharusha Dilshan Photography Logo"
                />
              </div>
              <div className="f-brand-text">
                <span className="f-brand-title">THE VOW&apos;S</span>
                <span className="f-brand-sub">BY THARUSHA DILSHAN</span>
              </div>
            </a>

            <p className="f-bio">
              Fine art wedding, engagement &amp; lifestyle photography capturing authentic love stories, eternal connections, and unscripted emotions across Sri Lanka.
            </p>

            <div className="f-socials">
              <a
                href="https://www.facebook.com/share/1Df694DTKg/"
                className="f-soc"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://wa.me/94775242150"
                className="f-soc"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <div className="f-col-header">
              <span className="f-col-title">Navigation</span>
              <span className="f-col-bar" />
            </div>
            <ul className="f-col-links">
              {[
                ['Home', '#hero'],
                ['About Tharusha', '#about'],
                ['Portfolio Gallery', '#gallery'],
                ['Pricing & Packages', '#services'],
                ['Client Reviews', '#testimonials'],
                ['Get in Touch', '#contact'],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} onClick={(e) => go(e, h)}>
                    <span className="f-link-arrow">›</span>
                    <span>{l}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div className="footer-col">
            <div className="f-col-header">
              <span className="f-col-title">Specialties</span>
              <span className="f-col-bar" />
            </div>
            <ul className="f-col-links">
              {[
                ['Wedding Photography', '#services'],
                ['Engagement & Pre-Shoots', '#services'],
                ['Events & Graduation', '#services'],
                ['Portrait & Editorial', '#services'],
                ['Kids & Family Sessions', '#services'],
                ['Custom Photography', '#contact'],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} onClick={(e) => go(e, h)}>
                    <span className="f-link-arrow">›</span>
                    <span>{l}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Sub-footer */}
        <div className="footer-b">
          <p className="f-copy">
            &copy; {new Date().getFullYear()}&nbsp;The Vow&apos;s Photography by Tharusha Dilshan. All rights reserved.
          </p>

          <button
            type="button"
            className="f-back-top"
            onClick={(e) => go(e, '#hero')}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="f-top-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
