import React, { useMemo } from 'react';

// Three distinct SVG petal shapes for organic variation
const PETAL_SHAPES = [
  // Shape 1: Classic rounded soft cherry petal
  <path d="M15,0 C22,5 30,15 28,25 C26,35 15,40 15,40 C15,40 4,35 2,25 C0,15 8,5 15,0 Z" fill="currentColor" />,
  // Shape 2: Slightly elongated, curved rose petal
  <path d="M15,2 C25,2 30,10 28,20 C26,30 20,38 15,38 C10,38 4,30 2,20 C0,10 5,2 15,2 Z" fill="currentColor" />,
  // Shape 3: Organic teardrop petal
  <path d="M10,0 C18,0 20,12 18,22 C16,32 10,35 10,35 C10,35 4,32 2,22 C0,12 2,0 10,0 Z" fill="currentColor" />
];

export default function PetalsBackground({ speedMultiplier = 1 }) {
  // Generate random stable properties for petals and particles (optimized for mobile 60fps)
  const config = useMemo(() => {
    const petals = Array.from({ length: 12 }).map((_, i) => {
      const size = Math.random() * 14 + 10; // 10px to 24px
      const shapeIdx = Math.floor(Math.random() * PETAL_SHAPES.length);
      const duration = (Math.random() * 12 + 15) / speedMultiplier; // 15s to 27s
      const delay = Math.random() * -20; // negative delay to have petals already in motion on load
      const left = Math.random() * 100; // 0% to 100% of viewport width
      const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
      const rotate = Math.random() * 360;
      
      // Customize floating behavior
      const drift = Math.random() * 120 - 60; // horizontal movement offset
      
      return {
        id: `petal-${i}`,
        size,
        shapeIdx,
        left,
        style: {
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity,
          color: i % 2 === 0 ? '#f6d7d2' : '#f0c2bc', // variations of soft pink
          transform: `rotate(${rotate}deg)`,
          animation: `float-petal ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          '--drift': `${drift}px` // read by advanced css if needed, or fallback inline
        }
      };
    });

    const particles = Array.from({ length: 8 }).map((_, i) => {
      const size = Math.random() * 4 + 2; // 2px to 6px
      const duration = Math.random() * 8 + 8; // 8s to 16s
      const delay = Math.random() * -10;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      return {
        id: `particle-${i}`,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `float-particle ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }
      };
    });

    return { petals, particles };
  }, [speedMultiplier]);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* Glow Particles */}
      {config.particles.map((p) => (
        <div key={p.id} className="particle" style={p.style} />
      ))}

      {/* Floating Petals */}
      {config.petals.map((p) => (
        <svg 
          key={p.id} 
          className="petal"
          viewBox="0 0 30 40"
          style={p.style}
        >
          {PETAL_SHAPES[p.shapeIdx]}
        </svg>
      ))}

      {/* Subtle Corner/Edge Branch Decorations */}
      <div 
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          width: '200px',
          height: '200px',
          opacity: 0.15,
          color: '#d9938b',
          transform: 'rotate(-10deg)',
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
          {/* Top-Left Leaf decoration */}
          <path d="M0,0 Q30,10 40,40 Q45,25 35,5 C35,5 60,15 70,35 Q60,35 45,20 C45,20 70,40 75,65 Q50,55 30,30 C30,30 20,60 10,75 Q15,45 10,25" />
        </svg>
      </div>

      <div 
        style={{
          position: 'absolute',
          bottom: '-30px',
          right: '-30px',
          width: '240px',
          height: '240px',
          opacity: 0.12,
          color: '#d9938b',
          transform: 'rotate(170deg)',
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
          {/* Bottom-Right Leaf decoration */}
          <path d="M0,0 Q30,10 40,40 Q45,25 35,5 C35,5 60,15 70,35 Q60,35 45,20 C45,20 70,40 75,65 Q50,55 30,30 C30,30 20,60 10,75 Q15,45 10,25" />
        </svg>
      </div>
    </div>
  );
}
