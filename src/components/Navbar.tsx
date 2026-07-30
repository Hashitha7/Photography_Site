'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Portfolio',    href: '#gallery' },
  { label: 'Services',     href: '#services' },
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
              aria-label="The Vow's by Tharusha Dilshan — Home"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/logo.jpg"
                alt="The Vow's by Tharusha Dilshan"
                style={{
                  height: '48px',
                  width: 'auto',
                  display: 'block',
                  filter: 'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.4)',
                  transition: 'filter 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </a>

            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a>
                </li>
              ))}
              <li>
                <a href="#contact" className="nav-cta" onClick={(e) => go(e, '#contact')}>
                  Book Session
                </a>
              </li>
            </ul>
            <button className="nav-ham" onClick={() => setOpen(v => !v)} aria-label="Menu">
              <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ position:'fixed',inset:0,background:'rgba(6,6,8,.98)',zIndex:999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2.5rem',backdropFilter:'blur(20px)' }}>
          {/* Logo in mobile menu */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/logo.jpg"
            alt="The Vow's by Tharusha Dilshan"
            style={{ height:'60px', width:'auto', filter:'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.4)', marginBottom:'1rem' }}
          />
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}
              style={{ fontFamily:'var(--font-d)',fontSize:'2.2rem',color:'var(--cream)',fontWeight:800 }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-p" onClick={(e) => go(e, '#contact')}>Book a Session</a>
        </div>
      )}

    </>
  );
}
