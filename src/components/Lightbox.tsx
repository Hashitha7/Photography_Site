'use client';

import { useEffect } from 'react';

interface LightboxProps {
  item: {
    title: string;
    category: string;
    emoji: string;
    bgClass: string;
    imagePath?: string;
  };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="lightbox-backdrop open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${item.title}`}
    >
      {/* Close button */}
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
        id="lightbox-close-btn"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        id="lightbox-prev-btn"
      >
        ‹
      </button>

      {/* Content */}
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        {item.imagePath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="lightbox-img" src={item.imagePath} alt={item.title} />
        ) : (
          <div
            className={`lightbox-placeholder gallery-item ${item.bgClass}`}
            style={{ fontSize: '12rem' }}
            aria-hidden="true"
          >
            {item.emoji}
          </div>
        )}
      </div>

      {/* Next */}
      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        id="lightbox-next-btn"
      >
        ›
      </button>

      {/* Caption */}
      <div className="lightbox-caption" aria-live="polite">
        <div className="lightbox-caption-title">{item.title}</div>
        <div className="lightbox-caption-cat">{item.category}</div>
      </div>
    </div>
  );
}
