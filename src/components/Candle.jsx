import React from 'react';

export default function Candle({ height = 42, width = 8, children }) {
  return (
    <div
      style={{
        position: 'relative',
        width: `${width + 4}px`,
        height: `${height + 18}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* Candle Body */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: 'linear-gradient(to right, #fdf6f3, #e8bdb8, #c9827a)',
          borderRadius: '4px 4px 1px 1px',
          boxShadow: 'inset 1px 0 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(188, 170, 160, 0.2)',
          position: 'relative',
        }}
      >
        {/* Subtle Candle Stripes */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255, 255, 255, 0.4) 6px, rgba(255, 255, 255, 0.4) 12px)',
            borderRadius: '4px 4px 1px 1px',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Wick */}
      <div
        style={{
          width: '1px',
          height: '6px',
          backgroundColor: '#3d3431',
          borderRadius: '0.5px',
          position: 'absolute',
          bottom: `${height}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Wick tip anchor for flame/smoke */}
      <div
        style={{
          position: 'absolute',
          bottom: `${height + 5}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
