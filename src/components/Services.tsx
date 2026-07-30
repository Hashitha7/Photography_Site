'use client';

import { useEffect, useRef, useState } from 'react';


type Cat = 'All' | 'Wedding' | 'Engagement' | 'Portraits' | 'Events';

interface Service {
  id: string;
  cat: Exclude<Cat, 'All'>;
  title: string;
  desc: string;
  features: string[];
  price: string;
  unit: string;
  images: string[];   // cycle through on hover
}

const SERVICES: Service[] = [
  {
    id: 'wedding',
    cat: 'Wedding',
    title: 'Wedding Photography',
    desc: "Your wedding day deserves more than photos — it deserves art. We capture every tear, every laugh, and every loving glance with cinematic precision.",
    features: ['Full-day coverage', 'Edited hi-res gallery', 'Album design included', 'Engagement shoot'],
    price: 'LKR 85,000',
    unit: '/ day',
    images: [
      '/images/wedding/w1_1.jpg',
      '/images/wedding/w1_2.jpg',
      '/images/wedding/w2_1.jpg',
      '/images/wedding/w3_1.jpg',
    ],
  },
  {
    id: 'engagement',
    cat: 'Engagement',
    title: 'Engagement Sessions',
    desc: 'Celebrate your love story before the big day. Romantic, natural, and beautifully lit sessions that capture the magic of your relationship.',
    features: ['2-hour session', '80+ edited images', 'Outdoor / indoor', 'Same-day previews'],
    price: 'LKR 35,000',
    unit: '/ session',
    images: [
      '/images/engagement/e1_1.jpg',
      '/images/engagement/e1_2.jpg',
      '/images/engagement/e2_1.jpg',
    ],
  },
  {
    id: 'portraits',
    cat: 'Portraits',
    title: 'Portrait Sessions',
    desc: 'Professional portraits that reveal your true character — personal branding, family memories, or artistic expression. We make you look extraordinary.',
    features: ['2-hour session', '50+ edited images', 'Multiple outfits', 'Studio or outdoor'],
    price: 'LKR 25,000',
    unit: '/ session',
    images: [
      '/images/portraits/p_1.jpg',
      '/images/portraits/p_2.jpg',
      '/images/portraits/p_3.jpg',
    ],
  },
  {
    id: 'graduation',
    cat: 'Events',
    title: 'Graduation Photography',
    desc: 'Your proudest milestone, immortalised forever. We capture the joy, pride, and achievement of your graduation day in stunning detail.',
    features: ['Full ceremony coverage', 'Family portraits', '100+ edited images', 'Rapid delivery'],
    price: 'LKR 30,000',
    unit: '/ day',
    images: [
      '/images/graduation/g_1.jpg',
      '/images/graduation/g_2.jpg',
      '/images/graduation/g_3.jpg',
    ],
  },
  {
    id: 'birthday',
    cat: 'Events',
    title: 'Birthday & Celebrations',
    desc: 'From intimate gatherings to grand parties — every smile, every cake-cut, every candid moment captured beautifully to relive the celebration.',
    features: ['Event coverage', '60+ edited images', 'Candid & posed shots', 'Online gallery'],
    price: 'LKR 20,000',
    unit: '/ event',
    images: [
      '/images/birthday/b_1.jpg',
      '/images/birthday/b_2.jpg',
      '/images/birthday/b_3.jpg',
    ],
  },
  {
    id: 'kids',
    cat: 'Portraits',
    title: 'Kids & Family',
    desc: 'Children grow so fast. Freeze those fleeting moments forever with playful, natural, and heartwarming family and kids photography sessions.',
    features: ['Fun relaxed sessions', '50+ edited images', 'Outdoor locations', 'Quick turnaround'],
    price: 'LKR 22,000',
    unit: '/ session',
    images: [
      '/images/kids/k_1.jpg',
      '/images/kids/k_2.jpg',
      '/images/kids/k_3.jpg',
    ],
  },
];

const CATS: Cat[] = ['All', 'Wedding', 'Engagement', 'Portraits', 'Events'];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [activeCat, setActiveCat] = useState<Cat>('All');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(en => { if (en.isIntersecting) en.target.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const visible = activeCat === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.cat === activeCat);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        {/* Intro */}
        <div className="services-intro reveal">
          <div className="label">What I Offer</div>
          <h2 className="heading" style={{ textAlign:'center' }}>Photography <em>Services</em></h2>
          <p>Tailored packages for every occasion — hover the cards to see full details.</p>
        </div>

        {/* Category tabs */}
        <div className="svc-tabs reveal d1">
          {CATS.map(c => (
            <button
              key={c}
              className={`svc-tab${activeCat === c ? ' active' : ''}`}
              onClick={() => setActiveCat(c)}
              id={`svc-tab-${c.toLowerCase()}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 3D Flip Grid */}
        <div className="svc-grid">
          {visible.map((svc, i) => (
            <div
              key={svc.id}
              className={`flip-card reveal d${Math.min(i + 1, 4)}`}
              id={`svc-${svc.id}`}
            >
              <div className="flip-inner">
                {/* ── FRONT ── */}
                <div className="flip-front">
                  <div style={{ width:'100%', height:'75%', background:'#090910', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={svc.images[0]}
                      alt={svc.title}
                      loading="lazy"
                      style={{ width:'100%', height:'100%', objectFit:'contain', transition:'transform .5s ease' }}
                    />
                  </div>
                  <div className="flip-front-body">
                    <div className="flip-front-cat">{svc.cat}</div>
                    <div className="flip-front-title">{svc.title}</div>
                    <div className="flip-front-hint">Hover to see details</div>
                  </div>
                </div>


                {/* ── BACK ── */}
                <div className="flip-back">
                  <div>
                    <div className="flip-back-label">{svc.cat}</div>
                    <div className="flip-back-title">{svc.title}</div>
                    <div className="flip-back-desc">{svc.desc}</div>
                    <ul className="flip-back-features">
                      {svc.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="flip-back-footer">
                    <div>
                      <div className="flip-back-price">{svc.price}</div>
                      <div className="flip-back-unit">{svc.unit}</div>
                    </div>
                    <button className="flip-book-btn" onClick={scrollToContact}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
