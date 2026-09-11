import React, { useState } from 'react';
import MemoryRevealCard from './MemoryRevealCard';

export default function MemoryCollage({ onAllRevealed }) {
  const [revealedStates, setRevealedStates] = useState({
    memory01: false,
    memory02: false,
    memory03: false,
    memory04: false,
  });

  const images = [
    '/images/main 1.jpeg',
    '/images/main 2.jpeg',
    '/images/main 3.jpeg',
    '/images/main 4.jpeg',
  ];

  const handleReveal = (index) => {
    const key = `memory0${index + 1}`;
    const nextStates = { ...revealedStates, [key]: true };
    setRevealedStates(nextStates);

    // Check if all four are revealed
    if (Object.values(nextStates).every((state) => state === true)) {
      if (onAllRevealed) {
        // Debounce slightly for a premium, non-abrupt feel
        setTimeout(() => {
          onAllRevealed();
        }, 1200);
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '340px',
        height: '495px',
        margin: '0 auto 2.5rem auto',
      }}
    >
      {/* Photo 1: Upper-left, slightly rotated counter-clockwise */}
      <div
        style={{
          position: 'absolute',
          left: '12px',
          top: '10px',
          width: '130px',
          height: '165px',
          transform: 'rotate(-7deg)',
          zIndex: 2,
        }}
      >
        <MemoryRevealCard
          imageSrc={images[0]}
          index={0}
          onReveal={() => handleReveal(0)}
        />
      </div>

      {/* Photo 2: Upper-right, close to Main 1, slightly rotated clockwise */}
      <div
        style={{
          position: 'absolute',
          right: '12px',
          top: '18px',
          width: '130px',
          height: '165px',
          transform: 'rotate(6deg)',
          zIndex: 3,
        }}
      >
        <MemoryRevealCard
          imageSrc={images[1]}
          index={1}
          onReveal={() => handleReveal(1)}
        />
      </div>

      {/* Photo 3: Centered below Main 1 and Main 2, overlapping their lower area */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '166px',
          width: '125px',
          height: '160px',
          transform: 'translateX(-50%) rotate(-2deg)',
          zIndex: 4,
        }}
      >
        <MemoryRevealCard
          imageSrc={images[2]}
          index={2}
          onReveal={() => handleReveal(2)}
        />
      </div>

      {/* Photo 4: Sits below and slightly to the right of Main 3 */}
      <div
        style={{
          position: 'absolute',
          right: '16px',
          top: '312px',
          width: '130px',
          height: '165px',
          transform: 'rotate(5deg)',
          zIndex: 5,
        }}
      >
        <MemoryRevealCard
          imageSrc={images[3]}
          index={3}
          onReveal={() => handleReveal(3)}
        />
      </div>
    </div>
  );
}
