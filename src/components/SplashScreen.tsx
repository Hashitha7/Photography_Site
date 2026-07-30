'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        transition: 'opacity 0.8s ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
        overflow: 'hidden',
        background: '#0a0810',
      }}
    >
      {/* ── 3D PERSPECTIVE GRID ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        perspective: '600px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'rotateX(55deg) translateZ(-80px)',
          transformOrigin: 'center center',
          animation: 'gridMove 4s linear infinite',
        }} />
      </div>

      {/* ── RADIAL GLOW BEHIND LOGO ── */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, rgba(160,100,60,0.06) 40%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'glowPulse 3s ease-in-out infinite',
      }} />

      {/* ── FLOATING ORB PARTICLES ── */}
      {[
        { size: 8,  x: '15%', y: '20%', delay: '0s',   dur: '4s',   opacity: 0.5  },
        { size: 5,  x: '85%', y: '15%', delay: '0.8s', dur: '5s',   opacity: 0.4  },
        { size: 12, x: '75%', y: '70%', delay: '1.2s', dur: '3.5s', opacity: 0.35 },
        { size: 6,  x: '20%', y: '75%', delay: '0.4s', dur: '4.5s', opacity: 0.45 },
        { size: 4,  x: '50%', y: '10%', delay: '1.6s', dur: '6s',   opacity: 0.3  },
        { size: 9,  x: '90%', y: '45%', delay: '2s',   dur: '3.8s', opacity: 0.4  },
        { size: 7,  x: '10%', y: '50%', delay: '0.6s', dur: '5.5s', opacity: 0.35 },
        { size: 5,  x: '60%', y: '85%', delay: '1s',   dur: '4.2s', opacity: 0.3  },
      ].map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #c9a96e, #9a6830)',
          opacity: p.opacity,
          animation: `floatParticle ${p.dur} ease-in-out ${p.delay} infinite`,
          filter: 'blur(1px)',
          boxShadow: `0 0 ${p.size * 3}px rgba(201,169,110,0.6)`,
        }} />
      ))}

      {/* ── CORNER DECORATIVE LINES ── */}
      {[
        { top: '2.5rem', left: '2.5rem', borderTop: '1px solid', borderLeft: '1px solid' },
        { top: '2.5rem', right: '2.5rem', borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: '2.5rem', left: '2.5rem', borderBottom: '1px solid', borderLeft: '1px solid' },
        { bottom: '2.5rem', right: '2.5rem', borderBottom: '1px solid', borderRight: '1px solid' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '3rem',
          height: '3rem',
          borderColor: 'rgba(201,169,110,0.35)',
          borderStyle: 'solid',
          borderWidth: 0,
          ...s,
          animation: `cornerFade 1s ease ${i * 0.15}s forwards`,
          opacity: 0,
        }} />
      ))}

      {/* ── LOGO CARD (cream bg — real logo colors) ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        animation: 'splashLogoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        opacity: 0,
      }}>
        {/* 3D floating card effect */}
        <div style={{
          background: 'linear-gradient(135deg, #f7f2ea 0%, #ede5d5 100%)',
          borderRadius: '16px',
          padding: '2.5rem 3.5rem',
          border: '1px solid rgba(201,169,110,0.6)',
          boxShadow: `
            0 0 0 1px rgba(201,169,110,0.1),
            0 20px 60px rgba(0,0,0,0.6),
            0 8px 25px rgba(201,169,110,0.2),
            inset 0 1px 0 rgba(255,255,255,0.8)
          `,
          animation: 'cardFloat 4s ease-in-out infinite',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            animation: 'shimmer 3s ease-in-out 1s infinite',
            borderRadius: '16px',
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/logo.jpg"
            alt="The Vow's by Tharusha Dilshan"
            style={{
              width: 'min(340px, 60vw)',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* ── GOLD PROGRESS BAR ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: 'min(280px, 55vw)',
        animation: 'splashBarIn 0.5s ease 0.8s forwards',
        opacity: 0,
      }}>
        <div style={{
          height: '1.5px',
          background: 'rgba(201,169,110,0.15)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(to right, #8a5c20, #c9a96e, #e8cfa0, #c9a96e, #8a5c20)',
            backgroundSize: '200% 100%',
            borderRadius: '2px',
            animation: 'splashProgress 4s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards, goldSheen 2s linear 1s infinite',
            width: '0%',
          }} />
        </div>
      </div>

      {/* ── TAGLINE ── */}
      <p style={{
        position: 'relative',
        zIndex: 10,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontStyle: 'italic',
        fontSize: 'clamp(.78rem, 2vw, .95rem)',
        color: 'rgba(232,207,160,0.75)',
        letterSpacing: '0.22em',
        opacity: 0,
        animation: 'splashBarIn 0.5s ease 1.2s forwards',
        textTransform: 'uppercase',
      }}>
        Capturing Life&apos;s Most Beautiful Moments
      </p>

      <style>{`
        @keyframes gridMove {
          0%   { transform: rotateX(55deg) translateY(0) translateZ(-80px); }
          100% { transform: rotateX(55deg) translateY(60px) translateZ(-80px); }
        }
        @keyframes glowPulse {
          0%,100% { transform: scale(1); opacity:0.8; }
          50%      { transform: scale(1.15); opacity:1; }
        }
        @keyframes floatParticle {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-22px) scale(1.2); }
        }
        @keyframes cornerFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.88) translateY(18px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cardFloat {
          0%,100% { transform: translateY(0) rotateX(1deg); }
          50%      { transform: translateY(-10px) rotateX(-1deg); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes splashBarIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes splashProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes goldSheen {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
