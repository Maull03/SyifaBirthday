import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

export default function MemoryRevealCard({ imageSrc, index, onReveal }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Map drag distance to rotation, scale, and shadow intensity
  const rotate = useTransform(x, [-150, 150], [-10, 10]);
  const scale = useTransform(x, [-150, 0, 150], [1.04, 1, 1.04]);
  const shadow = useTransform(
    x,
    [-150, 0, 150],
    [
      '0 18px 32px rgba(188, 170, 160, 0.22)',
      '0 4px 12px rgba(188, 170, 160, 0.08)',
      '0 18px 32px rgba(188, 170, 160, 0.22)'
    ]
  );

  const handleDragEnd = async (event, info) => {
    const threshold = 100; // Swipe threshold in pixels
    const velocityThreshold = 300; // Swipe velocity threshold

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swipe Right
      await controls.start({
        x: 400,
        rotate: 20,
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
      });
      setIsRevealed(true);
      onReveal();
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swipe Left
      await controls.start({
        x: -400,
        rotate: -20,
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
      });
      setIsRevealed(true);
      onReveal();
    } else {
      // Snap back to center
      controls.start({
        x: 0,
        rotate: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      });
    }
  };

  // Rotation styling for the photo container to give scrapbook feel
  const rotations = [-4, 3, 4, -3];
  const defaultRotation = rotations[index % rotations.length];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: isRevealed ? 1 : 2,
      }}
    >
      {/* Photo Underneath */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '8px 8px 16px 8px',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid var(--border-color)',
          pointerEvents: isRevealed ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '72%',
            backgroundColor: 'var(--accent-pink-light)',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* Polaroid image */}
          <img
            src={imageSrc}
            alt={`Memory ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            loading="lazy"
            onError={(e) => {
              // Beautiful fallback if image fails to load
              e.target.style.display = 'none';
              const fallback = e.target.nextSibling;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Falling back styling */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fbf8f5',
              backgroundImage: 'radial-gradient(#d9938b 0.5px, transparent 0.5px), radial-gradient(#d9938b 0.5px, #fbf8f5 0.5px)',
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 5px 5px',
              opacity: 0.8,
              padding: '0.5rem',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>🌸</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.6rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Memory {index + 1}
            </span>
          </div>
        </div>

        {/* Small scrapbook note caption */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginTop: '4px',
          }}
        >
          {index === 0 && 'The first chapter...'}
          {index === 1 && 'Little moments.'}
          {index === 2 && 'Every day with you.'}
          {index === 3 && 'My favorite view.'}
        </div>
      </div>

      {/* Draggable Scrapbook Cover */}
      {!isRevealed && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{
            position: 'absolute',
            inset: 0,
            x,
            rotate,
            scale,
            boxShadow: shadow,
            backgroundColor: '#fbf9f6',
            borderRadius: '8px',
            border: '1.5px dashed var(--accent-pink)',
            cursor: 'grab',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            zIndex: 10,
            userSelect: 'none',
            touchAction: 'pan-y', // allows vertical scroll on the card!
            backgroundImage: 'radial-gradient(rgba(217, 147, 139, 0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '15px 15px',
          }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {/* Scrapbook style tape / sticker decorative detail */}
          <div
            style={{
              position: 'absolute',
              top: '-7px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-3deg)',
              width: '50px',
              height: '16px',
              backgroundColor: 'rgba(217, 147, 139, 0.25)',
              backdropFilter: 'blur(2px)',
              border: '1px dashed rgba(217, 147, 139, 0.5)',
            }}
          />

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
              letterSpacing: '0.5px',
              textAlign: 'center',
            }}
          >
            A Little Memory
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.52rem',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--accent-pink)',
              fontWeight: 600,
            }}
          >
            Swipe →
          </p>
        </motion.div>
      )}
    </div>
  );
}
