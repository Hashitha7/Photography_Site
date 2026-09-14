'use client';

import { useEffect, useRef } from 'react';

interface Service {
  id: string;
  cat: string;
  title: string;
  badge?: string;
  features: string[];
  price: string;
  images: string[];
  btnText?: string;
  imgPos?: string;
}

const ENGAGEMENT_PACKAGES: Service[] = [
  {
    id: 'eng-lite',
    cat: 'Engagement',
    title: 'Lite',
    features: [
      'Main photo session at a Preferred location',
      'Engagement Ceremony & Reception',
      '6 Hours Coverage',
      '12 × 18 Framed Enlargement',
      'All unedited Images on Digital Media',
    ],
    price: 'LKR 25,000',
    images: ['/images/engagement/e1_1.jpg'],
  },
  {
    id: 'eng-classic',
    cat: 'Engagement',
    title: 'Classic',
    features: [
      'Main photo session at a Preferred location',
      'Engagement Ceremony & Reception',
      '6 Hours Coverage',
      '10 × 20 Fine Art Album — 20 Pages',
      '16 × 24 Framed Enlargement',
      'All unedited Images on Digital Media',
    ],
    price: 'LKR 50,000',
    images: ['/images/engagement/e1_2.jpg'],
  },
];

const WEDDING_PACKAGES: Service[] = [
  {
    id: 'wed-basic',
    cat: 'Wedding',
    title: 'Basic Package',
    features: [
      "Bride's whilst getting ready at the hotel",
      "Groom's whilst getting ready at the hotel",
      'Main photo session at a Preferred location',
      'Wedding Ceremony & Reception',
      '16 × 24 Two Framed Enlargement',
      '100 Thank You Cards or 8 × 24 Fine Art Album',
      'Couple Main Photo Sessions',
      'Exclusive full event coverage',
    ],
    price: 'LKR 75,000',
    images: ['/images/wedding/w1_1.jpg'],
  },
  {
    id: 'wed-standard',
    cat: 'Wedding',
    title: 'Standard Package',
    features: [
      "Bride's whilst getting ready at the hotel",
      "Groom's whilst getting ready at the hotel",
      'Main photo session at a Preferred location',
      'Wedding Ceremony & Reception',
      '8 × 24 or 12 × 18 Fine Art Story Album — 40 Pages (20 Spreads)',
      '16 × 24 Two Framed Enlargement',
      '100 Thank You Cards',
      'Couple Main Photo Sessions',
      'Exclusive full event coverage',
    ],
    price: 'LKR 90,000',
    images: ['/images/wedding/w1_2.jpg'],
  },
  {
    id: 'wed-essential',
    cat: 'Wedding',
    title: 'The Essential',
    badge: 'Popular',
    features: [
      'A casual photo session at a Preferred location',
      'Professionally retouched high resolution images on USB',
      'Preshoot slideshow for wedding day',
      "Bride's whilst getting ready at the hotel",
      "Groom's whilst getting ready at the hotel",
      'Main photo session at a Preferred location',
      'Wedding Ceremony & Reception',
      'Casual photo session (2 Dress & 2 Location)',
      '16 × 24 or 12 × 30 Fine Art Story Album — 50 Pages (25 Spreads)',
      '16 × 24 Two Framed Enlargement',
      '12 × 18 Two Framed Enlargement',
      '100 Thank You Cards',
      'Couple Main Photo Sessions',
      'Exclusive full event coverage',
    ],
    price: 'LKR 125,000',
    images: ['/images/wedding/w2_1.jpg'],
  },
  {
    id: 'wed-essential2',
    cat: 'Wedding',
    title: 'The Essential 2',
    features: [
      'Wedding & Home Coming',
      "Bride's whilst getting ready at the hotel",
      "Groom's whilst getting ready at the hotel",
      'Main photo session at a Preferred location',
      'Wedding Ceremony & Reception',
      '16 × 24 or 12 × 30 Fine Art Story Album — 60 Pages (30 Spreads)',
      '16 × 24 Two Framed Enlargement',
      '12 × 18 Two Framed Enlargement',
      '150 Thank You Cards',
      'Couple Main Photo Sessions — Wedding & Home Coming',
      'Exclusive full event coverage — Wedding & Home Coming',
    ],
    price: 'LKR 125,000',
    images: ['/images/wedding/w3_1.jpg'],
  },
  {
    id: 'wed-premium',
    cat: 'Wedding',
    title: 'Premium Package',
    badge: 'Best Value',
    features: [
      'A casual photo session at a Preferred location',
      'Professionally retouched high resolution images on USB',
      'Preshoot slideshow for wedding day',
      "Bride's whilst getting ready at the hotel",
      "Groom's whilst getting ready at the hotel",
      'Main photo session at a Preferred location',
      'Wedding Ceremony & Reception',
      'Casual photo session (2 Dress & 2 Location)',
      '16 × 24 or 12 × 30 Fine Art Story Album — 50 Pages (25 Spreads)',
      '8 × 24 or 12 × 16 Preshoot or Family Album — 30 Pages (15 Spreads)',
      '16 × 24 Two Framed Enlargement',
      '12 × 18 Two Framed Enlargement',
      '150 Thank You Cards',
      'Couple Main Photo Sessions',
      'Exclusive full event coverage',
    ],
    price: 'LKR 145,000',
    images: ['/images/wedding/w2_2.jpg'],
  },
];

const EVENTS_PORTRAIT_PACKAGES: Service[] = [
  {
    id: 'events-pkg',
    cat: 'Events',
    title: 'Events Photography',
    badge: 'Customizable',
    features: [
      'Birthday parties, anniversaries & celebrations',
      'Graduation & convocation ceremony coverage',
      'Corporate functions, launches & private events',
      'Full coverage with candid guest moments & group captures',
      'High-resolution professionally retouched digital images',
      'Flexible coverage duration tailored to your schedule',
    ],
    price: 'Discuss with Photographer',
    images: ['/images/graduation/g_2.jpg'],
    imgPos: 'center 18%',
    btnText: 'Inquire Now',
  },
  {
    id: 'portrait-pkg',
    cat: 'Portraits',
    title: 'Portrait & Lifestyle',
    badge: 'Customizable',
    features: [
      'Individual portraits, creative & professional headshots',
      'Couples, romance & lifestyle photoshoots',
      'Kids, toddlers & heartwarming family sessions',
      'Scenic outdoor or preferred locations',
      'High-resolution professionally retouched photos',
      'Personalized concepts, styling & creative direction',
    ],
    price: 'Discuss with Photographer',
    images: ['/images/portraits/p_2.jpg'],
    imgPos: 'center 15%',
    btnText: 'Inquire Now',
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(en => { if (en.isIntersecting) en.target.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderPackageCard = (pkg: Service, i: number) => {
    const isCustomPrice = !pkg.price.startsWith('LKR');
    return (
      <div
        key={pkg.id}
        className={`pkg-card reveal d${Math.min(i + 1, 4)}${pkg.badge ? ' pkg-featured' : ''}`}
        id={`svc-${pkg.id}`}
      >
        {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}

        {/* Image header */}
        <div className="pkg-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pkg.images[0]}
            alt={pkg.title}
            loading="lazy"
            style={pkg.imgPos ? { objectPosition: pkg.imgPos } : undefined}
          />
          <div className="pkg-img-overlay" />
        </div>

        {/* Body */}
        <div className="pkg-body">
          <div className="pkg-cat">{pkg.cat}</div>
          <h3 className="pkg-title">{pkg.title}</h3>

          <div className="pkg-divider" />

          <ul className="pkg-features">
            {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
          </ul>
        </div>

        {/* Footer */}
        <div className="pkg-footer">
          <div className="pkg-price-row">
            <span className="pkg-price-label">Investment</span>
            <span className={`pkg-price${isCustomPrice ? ' pkg-price-discuss' : ''}`}>
              {isCustomPrice ? pkg.price : `${pkg.price}/=`}
            </span>
          </div>
          <button className="pkg-book-btn" onClick={scrollToContact}>
            {pkg.btnText || 'Book Now'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        {/* Intro */}
        <div className="services-intro reveal">
          <div className="label">What I Offer</div>
          <h2 className="heading" style={{ textAlign: 'center' }}>Photography <em>Services</em></h2>
          <p>Tailored packages for every occasion — choose the perfect package for your special day.</p>
        </div>

        {/* ── ENGAGEMENT PACKAGES ── */}
        <div className="pkg-section reveal">
          <div className="pkg-section-header">
            <div className="pkg-section-line" />
            <h3 className="pkg-section-title">Engagement Packages</h3>
            <div className="pkg-section-line" />
          </div>
          <div className="pkg-grid pkg-grid-2">
            {ENGAGEMENT_PACKAGES.map((pkg, i) => renderPackageCard(pkg, i))}
          </div>
        </div>

        {/* ── WEDDING PACKAGES ── */}
        <div className="pkg-section reveal">
          <div className="pkg-section-header">
            <div className="pkg-section-line" />
            <h3 className="pkg-section-title">Wedding Packages</h3>
            <div className="pkg-section-line" />
          </div>
          <div className="pkg-grid pkg-grid-3">
            {WEDDING_PACKAGES.map((pkg, i) => renderPackageCard(pkg, i))}
          </div>
        </div>

        {/* ── EVENTS & PORTRAIT PACKAGES ── */}
        <div className="pkg-section reveal">
          <div className="pkg-section-header">
            <div className="pkg-section-line" />
            <h3 className="pkg-section-title">Events &amp; Portrait Packages</h3>
            <div className="pkg-section-line" />
          </div>
          <p className="pkg-section-desc">
            Customizable packages for birthdays, graduations, special events, and portrait sessions. Pricing can be discussed directly with the photographer.
          </p>
          <div className="pkg-grid pkg-grid-2">
            {EVENTS_PORTRAIT_PACKAGES.map((pkg, i) => renderPackageCard(pkg, i))}
          </div>
        </div>
      </div>
    </section>
  );
}

