import React from 'react';
import { motion } from 'framer-motion';

const E1 = [0.16, 1, 0.3, 1];
const E2 = [0.34, 1.56, 0.64, 1];

/* Petal paths — same SVG command count so Framer Motion can morph cleanly */
const BUD = "M 0,0 C -2,-4 -2,-9 0,-13 C 2,-9 2,-4 0,0 Z";
const PO  = "M 0,0 C -11,-8 -10,-28 0,-42 C 10,-28 11,-8 0,0 Z";
const PM  = "M 0,0 C -8,-6 -7,-20 0,-30 C 7,-20 8,-6 0,0 Z";
const PI  = "M 0,0 C -5,-4 -4,-13 0,-19 C 4,-13 5,-4 0,0 Z";

/* Size presets → pixel width of the component */
const SIZE_MAP = { large: 88, medium: 58, small: 34 };

/* Position presets → fixed CSS values (flowers hug viewport edges) */
const POS_MAP = {
  'top-left'    : { position: 'fixed', top:  -16, left:  -16 },
  'top-right'   : { position: 'fixed', top:  -16, right: -16 },
  'bottom-left' : { position: 'fixed', bottom: -16, left:  -16 },
  'bottom-right': { position: 'fixed', bottom: -16, right: -16 },
  'left'        : { position: 'fixed', top: '40%', left: -20 },
  'right'       : { position: 'fixed', top: '40%', right: -20 },
};

export default function FlowerBloom({
  size        = 'large',        // 'large' | 'medium' | 'small' | number (px)
  delay       = 0,
  position    = null,           // key from POS_MAP, style object, or null
  rotation    = 0,              // static rotation offset in degrees
  petalColor  = '#e8a8a2',
  petalMid    = '#f2c4be',
  petalInner  = '#f8d8d5',
  centerColor = '#f5c475',
  active      = false,
  className   = '',
}) {
  const px   = typeof size === 'number' ? size : (SIZE_MAP[size] ?? 88);
  const scale = px / 100;       // viewBox is 100×100
  const cx = 50, cy = 50;

  /* Individual petal ring renderer */
  const Ring = ({ angles, from, to, fill, base, gap = 0.1 }) =>
    angles.map((a, i) => (
      <motion.path
        key={a}
        transform={`translate(${cx},${cy}) rotate(${a})`}
        fill={fill}
        initial={{ d: from, opacity: 0 }}
        animate={{ d: to,   opacity: 0.88 }}
        transition={{
          d:       { duration: 1.1, ease: E2, delay: base + i * gap },
          opacity: { duration: 0.5,           delay: base + i * gap },
        }}
      />
    ));

  const swayClass = rotation < 0 ? 'bloom-sway-left' : 'bloom-sway-right';

  const flower = (
    <div
      className={swayClass}
      style={{ 
        transformOrigin: 'center bottom', 
        width: px, 
        height: px, 
        pointerEvents: 'none',
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 100 100" width={px} height={px} overflow="visible">

        {/* BUD — small oval visible before petals open */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: E2, delay: delay + 0.2 }}
          style={{ transformOrigin: `${cx}px ${cy + 6}px` }}
        >
          {/* Sepal hints */}
          <ellipse cx={cx - 4} cy={cy + 8} rx={2.5} ry={7} fill="#9aad88" opacity={0.55}
            transform={`rotate(-18,${cx - 4},${cy + 8})`} />
          <ellipse cx={cx + 4} cy={cy + 8} rx={2.5} ry={7} fill="#9aad88" opacity={0.55}
            transform={`rotate(18,${cx + 4},${cy + 8})`} />
          {/* Bud oval */}
          <ellipse cx={cx} cy={cy + 2} rx={7} ry={10} fill={petalColor} opacity={0.88} />
        </motion.g>

        {/* OUTER PETALS — 5 at 0°, 72°, 144°, 216°, 288° */}
        <Ring
          angles={[0, 72, 144, 216, 288]}
          from={BUD} to={PO} fill={petalColor}
          base={delay + 0.8} gap={0.11}
        />

        {/* MIDDLE PETALS — 5 offset 36° */}
        <Ring
          angles={[36, 108, 180, 252, 324]}
          from={BUD} to={PM} fill={petalMid}
          base={delay + 1.05} gap={0.09}
        />

        {/* INNER PETALS — 5 offset 18° */}
        <Ring
          angles={[18, 90, 162, 234, 306]}
          from={BUD} to={PI} fill={petalInner}
          base={delay + 1.3} gap={0.08}
        />

        {/* CENTER DISC */}
        <motion.circle
          cx={cx} cy={cy} r={9}
          fill={centerColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: E2, delay: delay + 1.9 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* STAMEN DOTS */}
        {[0, 51, 102, 153, 204, 255, 306].map((a, i) => {
          const r = 5, rad = (a - 90) * Math.PI / 180;
          const dx = cx + Math.cos(rad) * r;
          const dy = cy + Math.sin(rad) * r;
          return (
            <motion.circle key={i} cx={dx} cy={dy} r={1.5}
              fill="#c4821a" opacity={0.75}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: E2, delay: delay + 2.0 + i * 0.04 }}
              style={{ transformOrigin: `${dx}px ${dy}px` }}
            />
          );
        })}
      </svg>
    </div>
  );

  /* If position prop supplied, wrap in a fixed-position container */
  if (position) {
    const positionStyle = typeof position === 'string' ? (POS_MAP[position] || {}) : position;
    return (
      <div className={className} style={{ position: 'fixed', ...positionStyle, zIndex: 4, pointerEvents: 'none' }}>
        {flower}
      </div>
    );
  }

  return flower;
}
