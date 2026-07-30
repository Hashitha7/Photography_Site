'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    // After 4.2s start fade-out, done at 5s
    const fadeTimer = setTimeout(() => setPhase('fading'), 4200);
    const doneTimer = setTimeout(() => setPhase('done'), 5000);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#f5f0e8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        transition: 'opacity 0.8s ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      {/* Logo image */}
      <div
        style={{
          animation: 'splashLogoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          opacity: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about/logo.jpg"
          alt="The Vow's by Tharusha Dilshan"
          style={{
            width: 'min(380px, 70vw)',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Animated gold progress bar */}
      <div
        style={{
          width: 'min(300px, 60vw)',
          height: '1px',
          background: 'rgba(160, 120, 64, 0.2)',
          borderRadius: '1px',
          overflow: 'hidden',
          animation: 'splashBarIn 0.6s ease 0.5s forwards',
          opacity: 0,
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #a07840, #c9a96e, #a07840)',
            borderRadius: '1px',
            animation: 'splashProgress 4s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards',
            width: '0%',
          }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(.8rem, 2vw, 1rem)',
          color: '#6a5a40',
          letterSpacing: '0.15em',
          opacity: 0,
          animation: 'splashBarIn 0.6s ease 1s forwards',
        }}
      >
        Capturing Life&apos;s Most Beautiful Moments
      </p>

      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashBarIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes splashProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
