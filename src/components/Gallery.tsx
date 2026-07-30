'use client';

import { useState, useCallback, useEffect, useRef } from 'react';


type Cat = 'All' | 'Weddings' | 'Engagement' | 'Portraits' | 'Events';

interface Item {
  id: number;
  title: string;
  category: Exclude<Cat,'All'>;
  src: string;
}

const ITEMS: Item[] = [
  { id:1,  title:'Golden Vows',       category:'Weddings',   src:'/images/wedding/w1_1.jpg'    },
  { id:2,  title:'Sacred Moment',     category:'Weddings',   src:'/images/wedding/w1_2.jpg'    },
  { id:3,  title:'Timeless Bond',     category:'Weddings',   src:'/images/wedding/w2_1.jpg'    },
  { id:4,  title:'Love Story',        category:'Engagement', src:'/images/engagement/e1_1.jpg' },
  { id:5,  title:'Forever Begins',    category:'Engagement', src:'/images/engagement/e1_2.jpg' },
  { id:6,  title:'Radiant Portrait',  category:'Portraits',  src:'/images/portraits/p_1.jpg'   },
  { id:7,  title:'Natural Elegance',  category:'Portraits',  src:'/images/portraits/p_2.jpg'   },
  { id:8,  title:'Graduation Day',    category:'Events',     src:'/images/graduation/g_1.jpg'  },
  { id:9,  title:'Celebration',       category:'Events',     src:'/images/birthday/b_1.jpg'    },
];

const CATS: Cat[] = ['All','Weddings','Engagement','Portraits','Events'];

export default function Gallery() {
  const [active, setActive] = useState<Cat>('All');
  const [lbIdx, setLbIdx] = useState<number|null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach(en => { if (en.isIntersecting) en.target.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.category === active);
  const open = useCallback((i: number) => setLbIdx(i), []);
  const close = useCallback(() => setLbIdx(null), []);
  const prev = useCallback(() => setLbIdx(i => i === null ? null : (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setLbIdx(i => i === null ? null : (i + 1) % filtered.length), [filtered.length]);

  useEffect(() => {
    if (lbIdx === null) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [lbIdx, close, prev, next]);

  return (
    <section id="gallery" className="gallery" ref={ref}>
      <div className="container">
        <div className="gallery-head reveal">
          <div>
            <div className="label">Portfolio</div>
            <h2 className="heading">Selected <em>Works</em></h2>
          </div>
          <div className="gallery-filters">
            {CATS.map(c => (
              <button key={c} className={`g-filter${active===c?' active':''}`} onClick={() => setActive(c)}
                id={`gf-${c.toLowerCase()}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filtered.map((item, idx) => (
            <div key={item.id} className="g-item" onClick={() => open(idx)} tabIndex={0}
              onKeyDown={e => e.key==='Enter' && open(idx)} aria-label={item.title}>
              {/* Use width/height auto — image renders at natural size, zero cropping */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.title} loading="lazy" />
              <div className="g-overlay">
                <div className="g-title">{item.title}</div>
                <div className="g-cat">{item.category}</div>
              </div>
              <div className="g-icon">⤢</div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lbIdx !== null && (
        <div className="lbox open" onClick={close}>
          <button className="lbox-close" onClick={close} aria-label="Close">✕</button>
          <button className="lbox-nav lbox-prev" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Prev">‹</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:'90vw', maxHeight:'90vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filtered[lbIdx].src}
              alt={filtered[lbIdx].title}
              className="lbox-img"
            />
          </div>
          <button className="lbox-nav lbox-next" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
          <div className="lbox-cap">
            <div className="lbox-cap-title">{filtered[lbIdx].title}</div>
            <div className="lbox-cap-cat">{filtered[lbIdx].category}</div>
          </div>
        </div>
      )}
    </section>
  );
}
