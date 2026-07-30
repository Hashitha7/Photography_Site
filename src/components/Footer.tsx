'use client';

export default function Footer() {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-i">
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f5f0e8 0%, #ede6d6 100%)',
              borderRadius: '8px',
              padding: '6px 14px',
              border: '1px solid rgba(201,169,110,0.4)',
              boxShadow: '0 4px 15px rgba(201,169,110,0.15)',
              marginBottom: '1rem'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about/logo.jpg"
                alt="The Vow's by Tharusha Dilshan"
                style={{ height:'36px', width:'auto' }}
              />
            </span>
            <div className="f-tag">Capturing Life&apos;s Most Beautiful Moments</div>
          </div>

          <ul className="f-links">
            {[['Home','#hero'],['About','#about'],['Portfolio','#gallery'],['Services','#services'],['Contact','#contact']].map(([l,h]) => (
              <li key={h}><a href={h} onClick={e => go(e as React.MouseEvent<HTMLAnchorElement>, h)}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-b">
          <p className="f-copy">&copy; 2025 Tharu Photography. All rights reserved.</p>
          <p className="f-made">Made with <span>♥</span> in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
