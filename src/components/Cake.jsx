import React from 'react';

export default function Cake({ children }) {
  return (
    <div style={{ position: 'relative', width: '220px', height: '240px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 200 220"
        width="100%"
        height="100%"
        overflow="visible"
        style={{ filter: 'drop-shadow(0 10px 24px rgba(188, 170, 160, 0.15))' }}
      >
        {/* Elegant Cake Stand / Plate */}
        {/* Base shadow */}
        <ellipse cx="100" cy="190" rx="75" ry="12" fill="rgba(188, 170, 160, 0.25)" />
        {/* Plate bottom rim */}
        <path d="M 45,190 Q 100,205 155,190 L 150,195 Q 100,210 50,195 Z" fill="#ebdcd8" />
        {/* Plate surface */}
        <ellipse cx="100" cy="188" rx="70" ry="10" fill="#fcf9f5" stroke="#ede2d5" strokeWidth="1" />

        {/* Cake Body (Single tall elegant tier) */}
        {/* Cake body shadow on plate */}
        <ellipse cx="100" cy="183" rx="52" ry="8" fill="rgba(188, 170, 160, 0.15)" />
        
        {/* Cake side cylinder */}
        <defs>
          <linearGradient id="cakeSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7eae6" />
            <stop offset="30%" stopColor="#fdf6f3" />
            <stop offset="70%" stopColor="#fcf0ee" />
            <stop offset="100%" stopColor="#f0cdc9" />
          </linearGradient>
          <linearGradient id="cakeTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcf5f2" />
            <stop offset="100%" stopColor="#f3e2de" />
          </linearGradient>
          <linearGradient id="dripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8bdb8" />
            <stop offset="100%" stopColor="#c9827a" />
          </linearGradient>
        </defs>

        {/* Cylinder Side */}
        <path
          d="M 50,110 L 50,180 A 50,8 0 0 0 150,180 L 150,110 A 50,8 0 0 0 50,110"
          fill="url(#cakeSideGrad)"
        />

        {/* Cylinder Top Surface */}
        <ellipse cx="100" cy="110" rx="50" ry="8" fill="url(#cakeTopGrad)" />

        {/* Cream Frosting Swirls & Drips at the edge */}
        <path
          d="M 50,110 
             c 5,3 8,6 12,6 
             c 4,0 7,-4 10,-5 
             c 3,-1 6,2 8,4 
             c 2,2 4,8 6,8 
             c 2,0 4,-5 6,-7 
             c 3,-3 6,-1 9,1 
             c 4,3 6,9 8,9 
             c 2,0 4,-6 6,-8 
             c 3,-3 6,-2 9,0 
             c 4,2 7,5 11,2
             c 3,-2 4,-8 5,-10
             A 50,8 0 0 1 50,110 Z"
          fill="url(#dripGrad)"
          opacity="0.85"
        />

        {/* Decorative Delicate Piping/Pearls on Top */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rx = 46;
          const ry = 7;
          const rad = (angle * Math.PI) / 180;
          const px = 100 + rx * Math.cos(rad);
          const py = 110 + ry * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r="2.5"
              fill="#faf5f2"
              stroke="#e8bdb8"
              strokeWidth="0.5"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))' }}
            />
          );
        })}

        {/* Tiny romantic details: leaves and rose buds on the cake top */}
        <g transform="translate(100, 110)">
          {/* A small rose bud on the top right */}
          <path d="M 25,-2 C 22,-5 20,-2 22,1 C 24,3 27,2 28,0 Z" fill="#c9827a" />
          <path d="M 21,0 C 19,-2 17,0 18,2 C 19,3 22,2 23,0 Z" fill="#e8bdb8" />
          <path d="M 26,2 C 29,4 32,2 30,-1 C 28,-2 25,-1 26,2 Z" fill="#9aad88" opacity="0.8" />
          
          {/* A small rose bud on the top left */}
          <path d="M -22,-3 C -25,-5 -27,-2 -25,1 C -23,3 -20,2 -19,0 Z" fill="#c9827a" />
          <path d="M -26,1 C -29,3 -31,1 -29,-2 C -27,-3 -24,-2 -26,1 Z" fill="#9aad88" opacity="0.8" />
        </g>
      </svg>

      {/* Mounting point for the candle - positioned relative to the cake top */}
      <div
        style={{
          position: 'absolute',
          top: '121px',
          left: '50%',
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}
