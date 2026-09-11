import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, animate } from 'framer-motion';
import BookSpread, { BookPage, BookGutter } from './BookSpread';

/* ── Single scrapbook half-page ─────────────────────────────────────────── */
function PageHalf({ imageSrc, side, isClosing, pageNumber }) {
  return (
    <BookPage
      imageSrc={imageSrc}
      side={side}
      isClosing={isClosing}
      metaText={pageNumber ? `MOMENT ${String(pageNumber).padStart(2, '0')}` : undefined}
    />
  );
}

/* ── Full spread (both pages) ───────────────────────────────────────────── */
function FullSpread({ spread, pageNumber }) {
  return (
    <BookSpread
      leftImage={spread.left}
      rightImage={spread.right}
      isClosingPage={spread.isClosing}
      pageNumber={pageNumber}
      showGutter={false}
      bare={true}
    />
  );
}

/* ── Spine decoration ───────────────────────────────────────────────────── */
function Spine() {
  return <BookGutter />;
}

/* ── Cover face (used in closed state and opening animation) ────────────── */
function CoverFace() {
  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: '#fbf9f6',
      backgroundImage: 'radial-gradient(rgba(217,147,139,0.07) 1.5px,transparent 1.5px)',
      backgroundSize: '14px 14px',
      borderRadius: '0 8px 8px 0',
      border: '1px solid var(--border-color)',
      borderLeft: '4px solid #bcaaa0',
      boxShadow: '0 8px 28px rgba(188,170,160,0.22)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '3px', color: 'var(--text-secondary)', margin: '0 0 2px' }}>OUR</p>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--text-primary)', margin: '2px 0 2px' }}>Little</h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '3px', color: 'var(--text-secondary)', margin: '0 0 16px' }}>BOOK</p>
      <span style={{ fontSize: '1.4rem', color: 'var(--accent-pink)' }}>♡</span>
    </div>
  );
}

/* ── Main MemoryBook component ──────────────────────────────────────────── */
export default function MemoryBook({ onFinish }) {
  const [bookState, setBookState] = useState('closed'); // closed | opening | open
  const [currentIndex, setCurrentIndex] = useState(0);
  const [turning, setTurning] = useState(null); // { direction, fromIdx, toIdx }

  const coverControls = useAnimation();
  const pageControls = useAnimation();
  const shadowControls = useAnimation();
  // Opening-specific animation controls
  const openCoverControls = useAnimation();
  const openShadowControls = useAnimation();

  const pointerRef = useRef({ x: 0, y: 0, t: 0, active: false, moved: false, rect: null });
  const turningRef = useRef(false);

  const spreads = [
    { left: '/images/0.jpeg', right: '/images/1.jpeg' },
    { left: '/images/2.jpeg', right: '/images/3.jpeg' },
    { left: '/images/4.jpeg', right: '/images/5.jpeg' },
    { left: '/images/6.jpeg', right: '/images/7.jpeg' },
    { left: '/images/8.jpeg', right: '/images/9.jpeg' },
    { left: '/images/10.jpeg', right: '/images/11.jpeg' },
    { left: '/images/12.jpeg', right: '/images/13.jpeg' },
    { left: '/images/14.jpeg', right: 'closing', isClosing: true },
  ];
  const total = spreads.length;

  // Preload all scrapbook photos to ensure smooth rendering on Safari/iOS
  useEffect(() => {
    spreads.forEach((spread) => {
      if (spread.left && spread.left.startsWith('/')) {
        const img = new Image();
        img.src = spread.left;
      }
      if (spread.right && spread.right.startsWith('/')) {
        const img = new Image();
        img.src = spread.right;
      }
    });
  }, []);

  /* ── Open book — multi-phase physical animation ── */
  const openBook = async () => {
    if (bookState !== 'closed') return;
    setBookState('opening');

    // PHASE 1 — Initial lift (0–150ms)
    // The cover slightly rises, gaining depth before it rotates.
    await openCoverControls.start({
      z: 18,
      scale: 1.018,
      rotateY: -3,
      transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    });

    // Simultaneously animate shadow: becomes stronger as cover lifts
    openShadowControls.start({
      opacity: [0.18, 0.38, 0.22, 0.10],
      scaleX: [1, 0.82, 0.55, 0.3],
      transition: { duration: 1.1, times: [0, 0.12, 0.55, 1], ease: 'easeInOut' },
    });

    // PHASE 2–4 — Main cover opening (150–1000ms)
    // Starts slowly (natural acceleration), then decelerates toward end.
    // We overshoot slightly past -180 for a natural settle.
    await openCoverControls.start({
      rotateY: -187,
      z: 0,
      scale: 1,
      transition: {
        duration: 0.90,
        ease: [0.18, 0.0, 0.28, 1.0], // slow start → fast mid → decelerate
      },
    });

    // PHASE 5 — Natural settle (1000–1150ms)
    // Return from overshoot to final resting position.
    await openCoverControls.start({
      rotateY: -180,
      transition: { duration: 0.15, ease: [0.34, 1.56, 0.64, 1] },
    });

    setBookState('open');
  };

  /* ── Page turn ── */
  const doTurn = async (direction) => {
    if (turningRef.current || turning || bookState !== 'open') return;
    const fromIdx = currentIndex;
    const toIdx = direction === 'next' ? fromIdx + 1 : fromIdx - 1;
    if (toIdx < 0 || toIdx >= total) return;

    turningRef.current = true;
    setTurning({ direction, fromIdx, toIdx });

    try {
      // Wait TWO frames: one for React to commit the state, one for the
      // browser to paint the turning-page element into the DOM.
      // The motion.div uses initial={{ rotateY: 0 }} so no .set() needed here.
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      const toAngle = direction === 'next' ? -180 : 180;

      // Shadow peaks at mid-turn
      shadowControls.start({
        opacity: [0, 0.28, 0],
        transition: { duration: 0.75, times: [0, 0.45, 1], ease: 'easeInOut' },
      });

      await pageControls.start({
        rotateY: toAngle,
        boxShadow: [
          '0 4px 14px rgba(0,0,0,0.08)',
          '0 14px 30px rgba(0,0,0,0.30)',
          '0 2px 6px rgba(0,0,0,0.04)',
        ],
        transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
      });

      setCurrentIndex(toIdx);
      if (direction === 'next' && toIdx === total - 1 && onFinish) onFinish();
    } catch (err) {
      console.error('Page turn error:', err);
    } finally {
      turningRef.current = false;
      setTurning(null);
    }
  };

  /* ── Pointer events (mouse, touch, pen) ── */
  const onPointerDown = (e) => {
    if (turningRef.current || turning || bookState !== 'open') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    pointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      t: Date.now(),
      active: true,
      moved: false,
      rect: e.currentTarget.getBoundingClientRect(),
    };
  };

  const onPointerMove = (e) => {
    if (!pointerRef.current.active || turningRef.current || turning) return;
    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      pointerRef.current.moved = true;
    }
  };

  const onPointerUp = (e) => {
    if (!pointerRef.current.active || turningRef.current || turning) {
      pointerRef.current.active = false;
      return;
    }
    const { x, t, moved, rect } = pointerRef.current;
    pointerRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const dx = e.clientX - x;
    const dt = Date.now() - t;

    // 1. Horizontal swipe/drag
    if (Math.abs(dx) > 30 && dt < 600) {
      doTurn(dx < 0 ? 'next' : 'prev');
      return;
    }

    // 2. Tap / click: click right page -> next, click left page -> prev
    if (!moved && dt < 450 && rect) {
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width / 2) {
        doTurn('next');
      } else {
        doTurn('prev');
      }
    }
  };

  const onPointerCancel = (e) => {
    pointerRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const cur = spreads[currentIndex];
  const tgt = turning ? spreads[turning.toIdx] : null;
  const isNext = turning?.direction === 'next';

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0.5rem 0' }}>

      {/* ── Perspective + book wrapper ── */}
      <div
        onPointerDown={bookState === 'open' ? onPointerDown : undefined}
        onPointerMove={bookState === 'open' ? onPointerMove : undefined}
        onPointerUp={bookState === 'open' ? onPointerUp : undefined}
        onPointerCancel={bookState === 'open' ? onPointerCancel : undefined}
        style={{
          perspective: '1400px',
          WebkitPerspective: '1400px',
          width: '100%',
          maxWidth: '360px',
          height: '250px',
          position: 'relative',
          userSelect: 'none',
          touchAction: 'pan-y',
          cursor: bookState === 'open' ? 'pointer' : 'default',
        }}
      >

        {/* Stacked page edges (closed / opening state) */}
        {bookState !== 'open' && (
          <>
            <div style={{ position: 'absolute', left: 'calc(50% + 4px)', top: '3px', width: 'calc(50% - 6px)', height: 'calc(100% - 6px)', backgroundColor: '#f5f2ec', border: '1px solid var(--border-color)', borderRadius: '0 8px 8px 0', zIndex: 1 }} />
            <div style={{ position: 'absolute', left: 'calc(50% + 2px)', top: '1px', width: 'calc(50% - 3px)', height: 'calc(100% - 2px)', backgroundColor: '#f9f7f3', border: '1px solid var(--border-color)', borderRadius: '0 8px 8px 0', zIndex: 2 }} />
          </>
        )}

        {/* ── CLOSED STATE ── */}
        {bookState === 'closed' && (
          <div
            onClick={openBook}
            style={{ position: 'absolute', left: '50%', width: '50%', height: '100%', zIndex: 10, cursor: 'pointer', transformStyle: 'preserve-3d' }}
          >
            <CoverFace />
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: '0.7rem', fontStyle: 'italic', color: 'var(--accent-pink)', textAlign: 'center', marginTop: '6px' }}
            >
              tap to open ♡
            </motion.p>
          </div>
        )}

        {/* ── OPENING ANIMATION ── */}
        {bookState === 'opening' && (
          <>
            {/* ── Layer 0: Open spread already underneath (revealed by cover moving) ── */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3,
              display: 'flex', backgroundColor: '#fff',
              borderRadius: '12px', overflow: 'hidden',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <FullSpread spread={spreads[0]} pageNumber={1} />
              <Spine />
            </div>

            {/*
              ── Layer 0.5: Left-half paper mask ──────────────────────────────
              The 3D cover only sits on the RIGHT half (left: 50%).
              Without this mask, the left page (/images/0.jpeg) would be fully
              visible from frame 1 of the animation — before the cover has
              moved at all. This solid paper-coloured panel sits above the
              spread (zIndex 5) but below the shadow/cover (zIndex 9/10),
              visually matching the closed book's stacked page-edges on the
              left side. It is removed automatically when bookState becomes
              'open', which only happens after the full animation sequence
              finishes. No timeouts, no fades — pure state-driven rendering.
            */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0, left: 0,
              width: '50%',
              zIndex: 5,
              backgroundColor: '#f9f7f3',
              borderRadius: '12px 0 0 12px',
              borderRight: '1px solid var(--border-color)',
              pointerEvents: 'none',
            }} />

            {/* ── Layer 1: Dynamic shadow on the pages beneath the cover ── */}
            <motion.div
              initial={{ opacity: 0.18, scaleX: 1 }}
              animate={openShadowControls}
              style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: '50%', width: '50%',
                zIndex: 9,
                pointerEvents: 'none',
                transformOrigin: 'left center',
                background: 'linear-gradient(to right, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
              }}
            />

            {/* ── Layer 2: Animated 3D cover (front face + back face + edge thickness) ── */}
            <motion.div
              initial={{ rotateY: 0, z: 0, scale: 1 }}
              animate={openCoverControls}
              style={{
                position: 'absolute',
                left: '50%', width: '50%', height: '100%',
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                zIndex: 10,
                willChange: 'transform',
              }}
            >
              {/* Front face: the visible cover art */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}>
                <CoverFace />
              </div>

              {/* Cover edge — gives illusion of physical thickness */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, bottom: 0,
                width: '5px',
                background: 'linear-gradient(to right, #a09088, #c8bdb8)',
                transform: 'rotateY(-90deg) translateZ(0px)',
                transformOrigin: 'left center',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }} />

              {/* Back face: inside of the cover (visible when past 90deg) */}
              <div style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #f5f0eb 0%, #ede8e2 100%)',
                borderRadius: '0 6px 6px 0',
                boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.06)',
              }} />
            </motion.div>
          </>
        )}

        {/* ── OPEN STATE ── */}
        {bookState === 'open' && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}>

            {/* BASE: Current spread — ALWAYS rendered, never unmounts.
                Eliminates the mount/unmount flash at turn start and turn end. */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 1 }}>
              <FullSpread spread={cur} pageNumber={currentIndex + 1} />
            </div>

            {/* TURN LAYERS: Only present while a page turn is in progress */}
            {turning && (
              <>
                {/* Layer A: target spread — shows through turned page's back face */}
                <div className="is-turning" style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 2 }}>
                  <FullSpread spread={tgt} pageNumber={turning.toIdx + 1} />
                </div>

                {/* Layer B: static half — the half of the book that does NOT turn */}
                <div
                  className="is-turning"
                  style={{
                    position: 'absolute', zIndex: 5,
                    top: 0, bottom: 0,
                    left: isNext ? 0 : '50%',
                    width: '50%', height: '100%',
                  }}
                >
                  {isNext
                    ? <PageHalf imageSrc={cur.left} side="left" pageNumber={currentIndex + 1} />
                    : <PageHalf imageSrc={cur.isClosing ? null : cur.right} side="right" isClosing={cur.isClosing} />
                  }
                  {/* Shadow cast by the turning page onto the static half */}
                  <motion.div
                    animate={shadowControls}
                    initial={{ opacity: 0 }}
                    style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      background: isNext
                        ? 'linear-gradient(to left, rgba(0,0,0,0.18) 0%, transparent 70%)'
                        : 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 70%)',
                    }}
                  />
                </div>

                {/* Layer C: 3D turning page sheet — the ONLY element that rotates */}
                <motion.div
                  key={`turn-${turning.fromIdx}-${turning.direction}`}
                  initial={{ rotateY: 0 }}
                  animate={pageControls}
                  style={{
                    position: 'absolute', zIndex: 10,
                    top: 0, bottom: 0,
                    left: isNext ? '50%' : 0,
                    width: '50%', height: '100%',
                    transformOrigin: isNext ? 'left center' : 'right center',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',   /* Safari prefix */
                  }}
                >
                  {/* Front face — is-turning suppresses Safari mount transition */}
                  <div className="is-turning" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                    {isNext
                      ? <PageHalf imageSrc={cur.right} side="right" isClosing={cur.isClosing} />
                      : <PageHalf imageSrc={cur.left} side="left" pageNumber={currentIndex + 1} />
                    }
                  </div>
                  {/* Back face — is-turning suppresses Safari mount transition */}
                  <div className="is-turning" style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    {isNext
                      ? <PageHalf imageSrc={tgt.left} side="left" pageNumber={turning.toIdx + 1} />
                      : <PageHalf imageSrc={tgt.right} side="right" isClosing={tgt.isClosing} />
                    }
                  </div>
                </motion.div>
              </>
            )}

            <Spine />
          </div>
        )}


        {/* Page stack decorative borders (open state) */}
        {bookState === 'open' && (
          <>
            <div style={{ position: 'absolute', inset: '2px 4px', backgroundColor: '#f7f4ee', border: '1px solid var(--border-color)', borderRadius: '12px', transform: 'rotate(0.4deg)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '4px 2px', backgroundColor: '#fbf9f6', border: '1px solid var(--border-color)', borderRadius: '12px', transform: 'rotate(-0.4deg)', zIndex: 2, pointerEvents: 'none' }} />
          </>
        )}
      </div>

      {/* ── Page indicator (no buttons) ── */}
      {bookState === 'open' && (
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.72rem',
          letterSpacing: '2px', color: 'var(--text-secondary)',
          fontWeight: 500, opacity: 0.8, marginTop: '1.1rem',
          userSelect: 'none',
        }}>
          {currentIndex + 1} / {total}
        </p>
      )}

      <style>{`
        @keyframes heart-pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
