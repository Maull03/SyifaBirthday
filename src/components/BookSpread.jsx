import React from 'react';
import './BookSpread.css';

/* ── Single Scrapbook Page (Left or Right) ────────────────────────────────── */
export function BookPage({
  imageSrc,
  side = 'left',
  isClosing = false,
  caption,
  metaText,
  dateText = '15 · 02 · 2023',
}) {
  const isRight = side === 'right';
  const defaultCaption = isRight ? 'With love.' : 'Our happy moments.';
  const displayCaption = caption !== undefined ? caption : defaultCaption;

  if (isClosing) {
    return (
      <div className={`book-page book-page--${side}`}>
        <div className="closing-page">
          <span className="closing-ornament" aria-hidden="true">🍂</span>
          <p className="closing-eyebrow">And somehow...</p>
          <p className="closing-quote">
            every little moment became part of our story.
          </p>
          <span className="closing-heart" aria-hidden="true">♡</span>
          {dateText && <span className="closing-date">{dateText}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`book-page book-page--${side}`}>
      {/* Top Page Metadata / Editorial Label */}
      <div className={`page-meta ${isRight ? 'page-meta--right' : ''}`}>
        {!isRight ? (
          <span>{metaText || 'MEMORY'}</span>
        ) : (
          <span>{dateText}</span>
        )}
      </div>

      {/* Printed Photograph Container with Natural Scrapbook Asymmetry */}
      <div className={`photo-print photo-print--${side}`}>
        {/* Subtle translucent washi adhesive tape */}
        <div
          className={`scrapbook-tape ${
            isRight ? 'scrapbook-tape--top-right' : 'scrapbook-tape--top-left'
          }`}
          aria-hidden="true"
        />

        {/* Inner Photo Frame */}
        <div className="photo-frame">
          <img
            src={imageSrc}
            alt={isRight ? 'Memory photograph right' : 'Memory photograph left'}
            className="photo-image"
            loading="eager"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="photo-fallback" aria-hidden="true">
            <span className="photo-fallback-icon">{isRight ? '✨' : '📸'}</span>
          </div>
        </div>

        {/* Classic Polaroid White Bottom Margin Caption */}
        <div className="photo-caption">
          {displayCaption}
        </div>
      </div>

      {/* Bottom Page Spacer */}
      <div style={{ height: '6px', flexShrink: 0 }} />
    </div>
  );
}

/* ── Physical Spine & Gutter Seam ────────────────────────────────────────── */
export function BookGutter({ className = '' }) {
  return (
    <div className={`book-gutter-seam ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="book-gutter-stitch" />
      ))}
    </div>
  );
}

/* ── Full Two-Page Book Spread ────────────────────────────────────────────── */
export default function BookSpread({
  leftImage,
  rightImage,
  isClosingPage = false,
  leftCaption,
  rightCaption,
  pageNumber,
  dateText,
  showGutter = true,
  bare = false,          // suppress outer shadow/radius/overflow when embedded in 3D context
}) {
  return (
    <div className={bare ? 'book-spread book-spread--bare' : 'book-spread'}>
      {/* LEFT PAGE */}
      <BookPage
        side="left"
        imageSrc={leftImage}
        caption={leftCaption}
        metaText={pageNumber ? `MOMENT ${String(pageNumber).padStart(2, '0')}` : undefined}
      />

      {/* CENTRAL SPINE / GUTTER */}
      {showGutter && <BookGutter />}

      {/* RIGHT PAGE */}
      <BookPage
        side="right"
        imageSrc={rightImage}
        isClosing={isClosingPage}
        caption={rightCaption}
        dateText={dateText}
      />
    </div>
  );
}
