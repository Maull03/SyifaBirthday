import React from 'react';
import { motion } from 'framer-motion';

export default function Smoke({ trigger }) {
  if (!trigger) return null;

  // Configuration for three rising smoke particles (scaled down)
  const particles = [
    { id: 1, delay: 0.0, x: -6, y: -30, scale: 1.8, duration: 1.4 },
    { id: 2, delay: 0.2, x: 8, y: -50, scale: 2.6, duration: 1.6 },
    { id: 3, delay: 0.4, x: -4, y: -70, scale: 3.5, duration: 1.8 },
  ];

  return (
    <div style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.4, 0.2, 0],
            scale: [0.4, p.scale, p.scale * 1.3],
            x: [0, p.x * 0.4, p.x],
            y: [0, p.y * 0.5, p.y],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
          style={{
            position: 'absolute',
            left: '-3px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(188, 170, 160, 0.45) 0%, rgba(188, 170, 160, 0) 70%)',
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Rising wavy path representing the core thread of smoke */}
      <motion.svg
        width="20"
        height="60"
        viewBox="0 0 20 60"
        overflow="visible"
        style={{ position: 'absolute', bottom: 0, left: '-10px' }}
      >
        <motion.path
          d="M 10,60 C 7,48 13,36 10,24 C 7,12 13,3 10,0"
          fill="none"
          stroke="rgba(188, 170, 160, 0.25)"
          strokeWidth="1.0"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, y: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.3, 0],
            y: -10,
          }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
