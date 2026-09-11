import React from 'react';
import { motion } from 'framer-motion';
import PinCard from '../components/PinCard';

export default function Opening({ onSuccess, isTransitioning }) {
  return (
    <motion.div
      key="landing-content"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
      transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 5,
      }}
    >
      {/* Elegant Main Header */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
          fontWeight: 300,
          lineHeight: 1.25,
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: '0.75rem',
          letterSpacing: '-0.5px',
        }}
      >
        <span style={{ fontStyle: 'italic' }}>A little place</span>
        <br />
        <span style={{ fontWeight: 400 }}>made just for you.</span>
      </motion.h1>

      {/* Romantic Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}
      >
        Happy Birthday, Syifa
      </motion.p>

      {/* Keepsake Pin Card */}
      <PinCard onSuccess={onSuccess} isSuccess={isTransitioning} />
    </motion.div>
  );
}
