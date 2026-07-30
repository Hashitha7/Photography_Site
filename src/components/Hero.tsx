'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal');
    els?.forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 160));
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid-bg" />

      {/* 3D floating badge */}
      <div className="hero-3d-badge">
        <div className="badge-card">
          <div className="badge-num">5★</div>
          <div className="badge-lbl">Rating</div>
        </div>
      </div>

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 5 }}>
        <div className="hero-content" ref={ref}>
          <div className="hero-tag reveal">
            <span className="hero-tag-dot" />
            <span className="hero-tag-text">Available for Bookings — 2025</span>
          </div>

          <h1 className="hero-title reveal">
            Capturing Your
            <em>Perfect Moments</em>
          </h1>

          <p className="hero-sub reveal">
            Every frame tells a story. We craft timeless imagery that preserves
            the emotions, beauty, and authenticity of life&apos;s most treasured moments.
          </p>

          <div className="hero-btns reveal">
            <a href="#gallery" className="btn-p" onClick={(e) => go(e, '#gallery')}>
              ✦ View Portfolio
            </a>
            <a href="#contact" className="btn-s" onClick={(e) => go(e, '#contact')}>
              Book a Session →
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
