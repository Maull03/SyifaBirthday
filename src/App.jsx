import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PetalsBackground from './components/PetalsBackground';
import PinCard from './components/PinCard';
import FloralFrame from './components/FloralFrame';
import Opening from './pages/Opening';
import MakeAWish from './pages/MakeAWish';
import MemoryJourney from './pages/MemoryJourney';

export default function App() {
  // 'landing' | 'transitioning' | 'wish' | 'story'
  const [phase, setPhase] = useState('landing');
  const [petalSpeed, setPetalSpeed] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSuccess = () => {
    // 1. Speed up the flower petals activity
    setPetalSpeed(3.0);
    
    // 2. Start the light/blur transition overlay
    setShowOverlay(true);
    setPhase('transitioning');

    // 3. Middle of transition (screen fully white/blurred), change views
    setTimeout(() => {
      setPhase('wish');
      
      // 4. Fade out the light/blur overlay
      setTimeout(() => {
        setShowOverlay(false);
      }, 100);
    }, 1300); // 1.3 seconds matches the peak blur
  };

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1.5rem',
        backgroundColor: 'var(--bg-color)',
        overflow: 'hidden',
      }}
    >
      {/* Animated Petals and Particles Background */}
      <PetalsBackground speedMultiplier={petalSpeed} />

      {/* Botanical Floral Frame — full viewport border */}
      <FloralFrame active={phase !== 'landing'} />

      {/* Screen Blur/Light Transition Overlay */}
      <div 
        className={`transition-overlay ${showOverlay ? 'active' : ''}`} 
        style={{
          backgroundColor: 'rgba(255, 253, 250, 0.92)',
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 'landing' || phase === 'transitioning' ? (
          <Opening
            key="opening"
            onSuccess={handleSuccess}
            isTransitioning={phase === 'transitioning'}
          />
        ) : phase === 'wish' ? (
          <MakeAWish
            key="wish"
            onNextPage={() => setPhase('story')}
          />
        ) : (
          <MemoryJourney
            key="story"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
