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
        gap: 'clamp(1.4rem, 3.8vh, 2.4rem)',
        transition: 'opacity 0.8s ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
        overflow: 'hidden',
        background: '#0a0810',
        padding: 'clamp(1rem, 4vw, 2.5rem)',
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
            linear-gradient(rgba(225,184,84,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225,184,84,0.2) 1px, transparent 1px)
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
        width: 'min(560px, 90vw)',
        height: 'min(560px, 90vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(225,184,84,0.18) 0%, rgba(179,133,27,0.06) 45%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'glowPulse 3s ease-in-out infinite',
        pointerEvents: 'none',
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
          background: 'radial-gradient(circle, #fce8a1, #e1b854)',
          opacity: p.opacity,
          animation: `floatParticle ${p.dur} ease-in-out ${p.delay} infinite`,
          filter: 'blur(1px)',
          boxShadow: `0 0 ${p.size * 3}px rgba(225,184,84,0.6)`,
        }} />
      ))}

      {/* ── CORNER DECORATIVE LINES ── */}
      {[
        { top: 'clamp(1rem, 3.5vw, 2.5rem)', left: 'clamp(1rem, 3.5vw, 2.5rem)', borderTop: '1px solid', borderLeft: '1px solid' },
        { top: 'clamp(1rem, 3.5vw, 2.5rem)', right: 'clamp(1rem, 3.5vw, 2.5rem)', borderTop: '1px solid', borderRight: '1px solid' },
        { bottom: 'clamp(1rem, 3.5vw, 2.5rem)', left: 'clamp(1rem, 3.5vw, 2.5rem)', borderBottom: '1px solid', borderLeft: '1px solid' },
        { bottom: 'clamp(1rem, 3.5vw, 2.5rem)', right: 'clamp(1rem, 3.5vw, 2.5rem)', borderBottom: '1px solid', borderRight: '1px solid' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 'clamp(1.5rem, 4.5vw, 3rem)',
          height: 'clamp(1.5rem, 4.5vw, 3rem)',
          borderColor: 'rgba(225,184,84,0.35)',
          borderStyle: 'solid',
          borderWidth: 0,
          ...s,
          animation: `cornerFade 1s ease ${i * 0.15}s forwards`,
          opacity: 0,
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── LOGO CARD (cream bg — real logo colors) ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        animation: 'splashLogoIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        opacity: 0,
        width: 'min(360px, 86vw)',
      }}>
        {/* 3D floating card effect */}
        <div style={{
          background: 'linear-gradient(135deg, #f7f2ea 0%, #ede5d5 100%)',
          borderRadius: '16px',
          padding: 'clamp(1.25rem, 4vw, 2rem) clamp(1.4rem, 4.8vw, 2.6rem)',
          border: '1px solid rgba(225,184,84,0.65)',
          boxShadow: `
            0 0 0 1px rgba(225,184,84,0.15),
            0 20px 50px rgba(0,0,0,0.6),
            0 8px 24px rgba(225,184,84,0.22),
            inset 0 1px 0 rgba(255,255,255,0.85)
          `,
          animation: 'cardFloat 4s ease-in-out infinite',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)',
            animation: 'shimmer 3s ease-in-out 1s infinite',
            borderRadius: '16px',
            pointerEvents: 'none',
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about/logo_clean.png"
            alt="Tharusha Dilshan Photography Logo"
            style={{
              width: '100%',
              maxWidth: '300px',
              height: 'auto',
              display: 'block',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.08))',
            }}
          />
        </div>
      </div>

      {/* ── GOLD PROGRESS BAR ── */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: 'min(220px, 58vw)',
        animation: 'splashBarIn 0.5s ease 0.8s forwards',
        opacity: 0,
      }}>
        <div style={{
          height: '1.5px',
          background: 'rgba(225,184,84,0.18)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(to right, #b3851b, #e1b854, #fce8a1, #e1b854, #b3851b)',
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
        fontSize: 'clamp(.68rem, 2.3vw, .92rem)',
        color: 'rgba(252,232,161,0.85)',
        letterSpacing: 'clamp(0.12em, 0.4vw, 0.22em)',
        opacity: 0,
        animation: 'splashBarIn 0.5s ease 1.2s forwards',
        textTransform: 'uppercase',
        textAlign: 'center',
        margin: 0,
        padding: '0 1rem',
        maxWidth: '92vw',
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
