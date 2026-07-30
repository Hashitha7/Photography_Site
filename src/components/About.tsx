'use client';

import { useEffect, useRef } from 'react';


export default function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach(en => { if (en.isIntersecting) en.target.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); }),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* 3D tilt image */}
          <div className="about-img-wrap reveal">
            <div className="about-img-frame" />
            <div className="about-img-tilt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/photographer.jpg"
                alt="Tharu — Professional Photographer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  minHeight: '520px',
                }}
              />
            </div>
            <div className="about-badge-3d">
              <div className="badge-3d-num">5★</div>
              <div className="badge-3d-txt">Rated</div>
            </div>
          </div>


          {/* Content */}
          <div className="about-content">
            <div className="reveal">
              <div className="label">About Me</div>
              <h2 className="heading">The Artist Behind<br />the <em>Lens</em></h2>
            </div>
            <p className="about-bio reveal d1">
              Hello! I&apos;m <strong>Tharu</strong>, a passionate photographer based in Sri Lanka with over
              8 years of experience capturing the raw beauty of life. From intimate
              wedding moments to breathtaking landscapes, every photograph should evoke genuine emotion.
            </p>
            <p className="about-bio reveal d2">
              My approach blends <strong>technical precision</strong> with an artistic eye —
              always chasing the perfect light, the unguarded smile, the fleeting
              moment that tells a thousand words.
            </p>
            <div className="about-stats reveal d2">
              {[['500+','Sessions'],['8+','Years'],['12','Awards']].map(([n,l]) => (
                <div key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
              ))}
            </div>
            <div className="about-sig reveal d3">Tharu</div>
          </div>
        </div>
      </div>
    </section>
  );
}
