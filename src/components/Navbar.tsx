'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' on' : ''}`}>
        <div className="container">
          <div className="nav-i">
            <a
              href="#hero"
              onClick={(e) => go(e, '#hero')}
              aria-label="Home"
              style={{ display: 'flex', textDecoration: 'none' }}
            >
              <div className="nav-logo-circle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/about/T FINAL 4.4.png" alt="Tharusha Dilshan Photography Logo" />
              </div>
            </a>


            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="nav-cta" onClick={(e) => go(e, '#contact')}>
              Book Session
            </a>
            <button className="nav-ham" onClick={() => setOpen(v => !v)} aria-label="Menu">
              <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            height: '100dvh',
            background: 'radial-gradient(ellipse at 50% 15%, rgba(225,184,84,0.07) 0%, rgba(8,8,12,0.98) 65%, #060608 100%)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            padding: '1.2rem 1.5rem 1.8rem',
            boxSizing: 'border-box',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Top Bar with Close Button */}
          <div style={{
            width: '100%',
            maxWidth: '380px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid rgba(225,184,84,0.35)',
                background: 'rgba(225,184,84,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </svg>
            </button>
          </div>

          {/* Center Section: Logo + Nav Links */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '300px',
            margin: 'auto 0',
          }}>
            {/* Logo card */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #fbf7f0 0%, #ede5d5 100%)',
              borderRadius: '12px',
              padding: '9px 20px',
              border: '1px solid rgba(225,184,84,0.55)',
              boxShadow: '0 6px 25px rgba(0,0,0,0.5), 0 0 20px rgba(225,184,84,0.15)',
              marginBottom: '1.25rem',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/logo_clean.png"
                alt="Tharusha Dilshan Photography Logo"
                style={{ height: '26px', width: 'auto', display: 'block' }}
              />
            </span>

            {/* Subtle decorative gold line */}
            <div style={{
              width: '36px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
              marginBottom: '1rem',
              opacity: 0.5,
            }} />

            {/* Nav links */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}>
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  style={{
                    fontFamily: 'var(--font-d)',
                    fontSize: 'clamp(1.25rem, 3.2vh, 1.45rem)',
                    color: 'var(--cream)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    padding: 'clamp(0.45rem, 1.6vh, 0.7rem) 0',
                    display: 'block',
                    textAlign: 'center',
                    width: '100%',
                    borderBottom: i < links.length - 1 ? '1px solid rgba(225,184,84,0.1)' : 'none',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Subtle decorative gold line */}
            <div style={{
              width: '36px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
              marginTop: '1rem',
              opacity: 0.4,
            }} />
          </div>

          {/* Bottom Section: CTA Button */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
            paddingTop: '0.5rem',
          }}>
            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-b)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#0a0810',
                background: 'linear-gradient(135deg, var(--gold-l) 0%, var(--gold) 50%, var(--gold-d) 100%)',
                padding: '0.8rem 2.4rem',
                borderRadius: '100px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(225,184,84,0.3), 0 2px 6px rgba(0,0,0,0.4)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              Book a Session
            </a>
          </div>
        </div>
      )}

    </>
  );
}
