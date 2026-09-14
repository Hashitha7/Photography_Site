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

          </div>


          {/* Content */}
          <div className="about-content">
            <div className="reveal">
              <div className="label">About Me</div>
              <h2 className="heading">The Artist Behind<br />the <em>Lens</em></h2>
            </div>
            <p className="about-bio reveal d1">
              Hello, I&apos;m <strong>Tharusha</strong>, a passionate photographer from Sri Lanka with a love
              for capturing authentic moments and timeless stories. My photography is more than
              just taking pictures  it&apos;s about preserving emotions, connections, and memories
              that can be cherished for years to come.
            </p>
            <p className="about-bio reveal d2">
              From weddings and portraits to lifestyle and special occasions, I focus on creating
              images that feel natural, elegant, and genuinely you. Every session is approached
              with creativity, attention to detail, and a commitment to finding the perfect
              light and perspective.
            </p>
            <p className="about-bio reveal d2">
              My goal is simple: to turn your moments into photographs that tell a story.
            </p>
            <div className="about-stats reveal d2">
              {[['100+', 'Sessions'], ['4+', 'Years']].map(([n, l]) => (
                <div key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
