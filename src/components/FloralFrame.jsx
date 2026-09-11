import React from 'react';
import FlowerBloom from './FlowerBloom';

/* Color palettes based on the romantic blush cream reference theme */
const THEMES = {
  blush: {
    petalColor: '#e8bdb8',   // soft pink
    petalMid: '#f0cdc9',     // pale blush
    petalInner: '#fcf0ee',   // very light cream pink
    centerColor: '#f5e2cc',  // warm soft gold center
  },
  rose: {
    petalColor: '#c9827a',   // warm rose
    petalMid: '#dba9a3',     // medium rose
    petalInner: '#f0d9d6',   // soft rose-tinted cream
    centerColor: '#ebd0ab',
  },
  cream: {
    petalColor: '#ebdcd8',   // elegant off-white
    petalMid: '#f5eae6',     // soft cream
    petalInner: '#faf5f2',   // pure light cream
    centerColor: '#ebd1a0',
  },
  yellow: {
    petalColor: '#e8c4a2',   // soft peach/yellow
    petalMid: '#f2dbbe',     // cream yellow
    petalInner: '#faebd7',   // antique white
    centerColor: '#c49a60',
  }
};

/* List of 34 flowers with their organic properties, sizes, and staggered timings */
const FLOWERS_CONFIG = [
  // ── Top Left Corner Cluster ──
  { size: 'large',  position: { top: '-20px', left: '-20px' }, delay: 0.1, rotation: 15,  theme: 'blush' },
  { size: 'medium', position: { top: '5px',   left: '48px'  }, delay: 0.4, rotation: -10, theme: 'rose'  },
  { size: 'small',  position: { top: '52px',  left: '10px'  }, delay: 0.7, rotation: 45,  theme: 'cream' },
  { size: 'small',  position: { top: '-5px',  left: '98px'  }, delay: 1.0, rotation: -30, theme: 'yellow' },
  { size: 'medium', position: { top: '38px',  left: '42px'  }, delay: 1.3, rotation: 20,  theme: 'cream' },

  // ── Top Right Corner Cluster ──
  { size: 'large',  position: { top: '-20px', right: '-20px' }, delay: 0.2, rotation: -15, theme: 'rose'  },
  { size: 'medium', position: { top: '5px',   right: '48px'  }, delay: 0.5, rotation: 10,  theme: 'blush' },
  { size: 'small',  position: { top: '52px',  right: '10px'  }, delay: 0.8, rotation: -45, theme: 'yellow' },
  { size: 'small',  position: { top: '-5px',  right: '98px'  }, delay: 1.1, rotation: 30,  theme: 'cream' },
  { size: 'medium', position: { top: '38px',  right: '42px'  }, delay: 1.4, rotation: -20, theme: 'blush' },

  // ── Top Center-ish framing ──
  { size: 'small',  position: { top: '-12px', left: '142px' }, delay: 1.6, rotation: 12,  theme: 'blush' },
  { size: 'small',  position: { top: '-12px', right: '142px' }, delay: 1.8, rotation: -12, theme: 'yellow' },

  // ── Left Edge vertical strip ──
  { size: 'medium', position: { top: '22%',   left: '-20px' }, delay: 0.3, rotation: -8,  theme: 'blush' },
  { size: 'small',  position: { top: '31%',   left: '-8px'  }, delay: 0.6, rotation: 22,  theme: 'cream' },
  { size: 'medium', position: { top: '41%',   left: '-24px' }, delay: 0.9, rotation: -18, theme: 'yellow' },
  { size: 'small',  position: { top: '51%',   left: '-10px' }, delay: 1.2, rotation: 35,  theme: 'rose'  },
  { size: 'large',  position: { top: '62%',   left: '-28px' }, delay: 1.5, rotation: -25, theme: 'blush' },
  { size: 'medium', position: { top: '72%',   left: '-18px' }, delay: 1.8, rotation: 18,  theme: 'cream' },

  // ── Right Edge vertical strip ──
  { size: 'medium', position: { top: '25%',   right: '-20px' }, delay: 0.5, rotation: 12,  theme: 'yellow' },
  { size: 'small',  position: { top: '35%',   right: '-8px'  }, delay: 0.8, rotation: -22, theme: 'rose'  },
  { size: 'large',  position: { top: '47%',   right: '-28px' }, delay: 1.1, rotation: 15,  theme: 'cream' },
  { size: 'small',  position: { top: '57%',   right: '-10px' }, delay: 1.4, rotation: -30, theme: 'blush' },
  { size: 'medium', position: { top: '67%',   right: '-24px' }, delay: 1.7, rotation: 25,  theme: 'rose'  },
  { size: 'small',  position: { top: '77%',   right: '-12px' }, delay: 2.0, rotation: -12, theme: 'cream' },

  // ── Bottom Left Corner Cluster ──
  { size: 'large',  position: { bottom: '-20px', left: '-20px' }, delay: 0.3, rotation: 10,  theme: 'rose'  },
  { size: 'medium', position: { bottom: '5px',   left: '48px'  }, delay: 0.6, rotation: -25, theme: 'yellow' },
  { size: 'small',  position: { bottom: '52px',  left: '10px'  }, delay: 0.9, rotation: 35,  theme: 'blush' },
  { size: 'small',  position: { bottom: '-5px',  left: '98px'  }, delay: 1.2, rotation: -10, theme: 'cream' },
  { size: 'medium', position: { bottom: '38px',  left: '42px'  }, delay: 1.5, rotation: 15,  theme: 'rose'  },

  // ── Bottom Right Corner Cluster ──
  { size: 'large',  position: { bottom: '-20px', right: '-20px' }, delay: 0.4, rotation: -10, theme: 'blush' },
  { size: 'medium', position: { bottom: '5px',   right: '48px'  }, delay: 0.7, rotation: 25,  theme: 'rose'  },
  { size: 'small',  position: { bottom: '52px',  right: '10px'  }, delay: 1.0, rotation: -35, theme: 'cream' },
  { size: 'small',  position: { bottom: '-5px',  right: '98px'  }, delay: 1.3, rotation: 10,  theme: 'yellow' },
  { size: 'medium', position: { bottom: '38px',  right: '42px'  }, delay: 1.6, rotation: -15, theme: 'blush' },

  // ── Bottom Center-ish framing ──
  { size: 'small',  position: { bottom: '-12px', left: '142px' }, delay: 1.5, rotation: 8,   theme: 'blush' },
  { size: 'small',  position: { bottom: '-12px', right: '142px' }, delay: 1.7, rotation: -8,  theme: 'yellow' }
];

export default function FloralFrame({ active }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 4, // positioned in foreground relative to petals, but under PIN card & text (which are zIndex 5+)
      }}
    >
      {FLOWERS_CONFIG.map((cfg, idx) => {
        const themeProps = THEMES[cfg.theme] || THEMES.blush;
        return (
          <FlowerBloom
            key={idx}
            size={cfg.size}
            delay={cfg.delay}
            position={cfg.position}
            rotation={cfg.rotation}
            active={active}
            {...themeProps}
          />
        );
      })}
    </div>
  );
}
