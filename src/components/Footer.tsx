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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about/logo.jpg"
              alt="The Vow's by Tharusha Dilshan"
              style={{ height:'44px', width:'auto', filter:'invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(1.4)', marginBottom:'.4rem' }}
            />
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
