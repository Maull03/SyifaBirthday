import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cake from '../components/Cake';
import Candle from '../components/Candle';
import Flame from '../components/Flame';
import Smoke from '../components/Smoke';

export default function MakeAWish({ onNextPage }) {
  // 'initial' | 'blowing' | 'out' | 'story-ready'
  const [wishState, setWishState] = useState('initial');

  const handleMakeWish = () => {
    if (wishState !== 'initial') return;

    setWishState('blowing');

    // Extinguishing animation runs for 1.0 second
    setTimeout(() => {
      setWishState('out');

      // Short delay after the flame is out before introducing the story navigation hint
      setTimeout(() => {
        setWishState('story-ready');
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div
      key="wish-content"
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1.5rem',
        zIndex: 5,
      }}
    >
      {/* Top small decorative text */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          letterSpacing: '0.2px',
        }}
      >
        Before we look back at our story...
      </motion.p>

      {/* Birthday Cake Centerpiece */}
      <div style={{ margin: '1.5rem 0' }}>
        <Cake>
          {/* Left Candle (shorter, placed slightly back) */}
          <div style={{ position: 'absolute', left: '-26px', bottom: '2px', transform: 'translateX(-50%)', zIndex: 9 }}>
            <Candle height={38} width={7}>
              <Flame 
                scale={1.0}
                isExtinguishing={wishState === 'blowing'} 
                isOut={wishState === 'out' || wishState === 'story-ready'} 
              />
              <Smoke 
                trigger={wishState === 'out' || wishState === 'story-ready'} 
              />
            </Candle>
          </div>

          {/* Center Candle (Tallest, placed at center) */}
          <div style={{ position: 'absolute', left: '0px', bottom: '0px', transform: 'translateX(-50%)', zIndex: 10 }}>
            <Candle height={48} width={8}>
              <Flame 
                scale={1.25}
                isExtinguishing={wishState === 'blowing'} 
                isOut={wishState === 'out' || wishState === 'story-ready'} 
              />
              <Smoke 
                trigger={wishState === 'out' || wishState === 'story-ready'} 
              />
            </Candle>
          </div>

          {/* Right Candle (shorter, placed slightly forward) */}
          <div style={{ position: 'absolute', left: '26px', bottom: '-2px', transform: 'translateX(-50%)', zIndex: 11 }}>
            <Candle height={38} width={7}>
              <Flame 
                scale={1.0}
                isExtinguishing={wishState === 'blowing'} 
                isOut={wishState === 'out' || wishState === 'story-ready'} 
              />
              <Smoke 
                trigger={wishState === 'out' || wishState === 'story-ready'} 
              />
            </Candle>
          </div>
        </Cake>
      </div>

      {/* Below Interaction States */}
      <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '1.5rem' }}>
        <AnimatePresence mode="wait">
          {wishState === 'initial' && (
            <motion.div
              key="initial-interaction"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                Make a Wish
              </h2>
              
              <button
                onClick={handleMakeWish}
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: '44px',
                  borderRadius: '22px',
                  border: 'none',
                  backgroundColor: 'var(--accent-pink)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: '0 4px 12px rgba(217, 147, 139, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-pink-hover)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(217, 147, 139, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-pink)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 147, 139, 0.15)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(1px)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
              >
                Make a Wish ♡
              </button>
            </motion.div>
          )}

          {wishState === 'blowing' && (
            <motion.div
              key="blowing-interaction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  marginTop: '1.5rem',
                }}
              >
                Blowing out the candle...
              </motion.p>
            </motion.div>
          )}

          {wishState === 'out' && (
            <motion.div
              key="out-interaction"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--accent-pink)',
                  marginTop: '1rem',
                  letterSpacing: '0.5px',
                }}
              >
                I hope it comes true. ♡
              </h2>
            </motion.div>
          )}

          {wishState === 'story-ready' && (
            <motion.div
              key="story-ready-interaction"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--accent-pink)',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                I hope it comes true. ♡
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.75rem',
                  fontStyle: 'italic',
                }}
              >
                Now, let's look back at our story...
              </p>
              
              <button
                onClick={onNextPage}
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: '44px',
                  borderRadius: '22px',
                  border: '1px solid var(--accent-pink)',
                  backgroundColor: 'transparent',
                  color: 'var(--accent-pink)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                  fontFamily: 'var(--font-sans)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-pink)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(217, 147, 139, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--accent-pink)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(1px)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
              >
                Our Story →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
