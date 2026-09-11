import React from 'react';
import { motion } from 'framer-motion';

export default function Flame({ isExtinguishing, isOut, scale = 1 }) {
  if (isOut) return null;

  // Custom keyframes for natural flickering and extinguishing movements
  const flickerAnimate = {
    scaleY: isExtinguishing 
      ? [1.0, 1.2, 0.5, 0.1, 0.0] // flickers and shrinks to nothing
      : [1.0, 1.04, 0.96, 1.05, 0.98, 1.0], // very subtle vertical stretch
    scaleX: isExtinguishing
      ? [1.0, 0.6, 1.1, 0.3, 0.0]
      : [1.0, 0.97, 1.03, 0.96, 1.02, 1.0], // very subtle horizontal compress
    skewX: isExtinguishing
      ? [0, -12, -20, -26, -30] // leans heavily as if blown
      : [0, 0.8, -0.8, 1.0, -0.6, 0], // very subtle swaying
    y: isExtinguishing
      ? [0, -1, 1, 2, 3]
      : [0, -0.2, 0.2, -0.3, 0.1, 0], // extremely subtle vertical shift, keeping it attached to the wick
    opacity: isExtinguishing
      ? [1.0, 0.8, 0.5, 0.2, 0.0]
      : [0.93, 1.0, 0.95, 0.98, 1.0, 0.93]
  };

  const flickerTransition = {
    duration: isExtinguishing ? 1.0 : 1.8,
    repeat: isExtinguishing ? 0 : Infinity, // do not repeat extinguishing animation
    ease: isExtinguishing ? "easeOut" : "easeInOut"
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: `translate(-50%, 0) scale(${scale})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={flickerAnimate}
        transition={flickerTransition}
        style={{
          transformOrigin: 'bottom center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Outer Flame Radial Glow (delicate and narrow) */}
        <div
          style={{
            position: 'absolute',
            width: '16px',
            height: '24px',
            borderRadius: '50% 50% 35% 35%',
            background: 'radial-gradient(circle, rgba(253, 198, 185, 0.45) 0%, rgba(217, 147, 139, 0) 70%)',
            filter: 'blur(2px)',
            bottom: '1px',
          }}
        />

        {/* Flame SVG Layers (exact natural flame shape) */}
        <svg width="12" height="26" viewBox="0 0 12 26" overflow="visible">
          <defs>
            {/* Flame Color Gradients */}
            <linearGradient id="flameOuterGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d9938b" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#f5c475" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#faf5f2" stopOpacity="0" />
            </linearGradient>
            
            <linearGradient id="flameInnerGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#c4821a" />
              <stop offset="60%" stopColor="#ebd1a0" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Outer Warm Peach Flame */}
          <path
            d="M 6,25 
               C 4.5,25 1,20 1,14 
               C 1,7 6,1 6,1 
               C 6,1 11,7 11,14 
               C 11,20 7.5,25 6,25 Z"
            fill="url(#flameOuterGrad)"
          />

          {/* Inner Gold Flame Core */}
          <path
            d="M 6,23 
               C 5,23 3.5,20 3.5,16 
               C 3.5,12 6,9 6,9 
               C 6,9 8.5,12 8.5,16 
               C 8.5,20 7,23 6,23 Z"
            fill="url(#flameInnerGrad)"
            opacity="0.9"
          />

          {/* Delicate Blue Hot Point at base */}
          <ellipse cx="6" cy="22" rx="1.5" ry="2.0" fill="#9dbbd9" opacity="0.65" />
        </svg>
      </motion.div>
    </div>
  );
}
