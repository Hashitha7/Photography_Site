'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const TESTS = [
  { id:1, text:"Tharu captured our wedding day beyond our wildest dreams. Every photo tells our love story so beautifully. Five years later and we still cry looking at the album.", name:'Dilini & Kasun', event:'Wedding — Colombo, 2024', initials:'DK' },
  { id:2, text:"The portrait session was incredible. Tharu made me feel so comfortable and the results were absolutely stunning. My brand photos are jaw-dropping.", name:'Amaya Perera', event:'Portrait Session — Kandy', initials:'AP' },
  { id:3, text:"Our corporate gala was documented beautifully. Professional, unobtrusive, and delivered edited photos within 48 hours. Highly recommend!", name:'Shehan Fernando', event:'Corporate Event — Colombo', initials:'SF' },
  { id:4, text:"The nature shots from our Ella trip are gallery-worthy. Tharu has an eye for light that is truly unmatched. Every single frame is a masterpiece.", name:'Tharushi Wickramasinghe', event:'Nature Shoot — Ella', initials:'TW' },
  { id:5, text:"From first consultation to final delivery, everything was seamless. The photos of our family session are something we'll treasure for generations.", name:'Nuwan & Sanduni', event:'Family Portraits — Galle', initials:'NS' },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const max = TESTS.length - 3;
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const go = useCallback((i: number) => setCur(Math.max(0, Math.min(i, max))), [max]);

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCur(c => c >= max ? 0 : c + 1), 4200);
  };

  useEffect(() => {
    reset();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const child = trackRef.current.children[0] as HTMLElement | null;
    const w = child ? child.offsetWidth + 24 : 0;
    trackRef.current.style.transform = `translateX(-${cur * w}px)`;
  }, [cur]);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div style={{ textAlign:'center',marginBottom:'1rem' }}>
          <div className="label" style={{ justifyContent:'center' }}>Kind Words</div>
          <h2 className="heading" style={{ textAlign:'center' }}>What Clients <em>Say</em></h2>
        </div>
        <div className="test-track-wrap">
          <div className="test-track" ref={trackRef}>
            {TESTS.map(t => (
              <div key={t.id} className="test-card">
                <span className="test-quote" aria-hidden="true">&ldquo;</span>
                <div className="test-stars" aria-label="5 stars">★★★★★</div>
                <p className="test-text">&ldquo;{t.text}&rdquo;</p>
                <div className="test-author">
                  <div className="test-av">{t.initials}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-event">{t.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="test-controls">
          <button className="test-btn" onClick={() => { go(cur-1); reset(); }}>‹</button>
          {Array.from({length: max+1}).map((_,i) => (
            <button key={i} className={`test-dot${cur===i?' active':''}`}
              onClick={() => { go(i); reset(); }} aria-label={`Slide ${i+1}`} />
          ))}
          <button className="test-btn" onClick={() => { go(cur+1); reset(); }}>›</button>
        </div>
      </div>
    </section>
  );
}
