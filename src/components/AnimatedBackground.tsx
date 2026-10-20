import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground
 * 
 * Lightweight CSS-only animated background:
 * - Two large ambient orbs that drift slowly
 * - 16 tiny particle dots that rise gently
 * - A subtle dot-grid overlay
 * 
 * All motion is disabled via prefers-reduced-motion.
 * Zero JS animation loops — purely CSS keyframes.
 */
export const AnimatedBackground: React.FC = () => {
  const particles = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Dot-grid overlay */}
      <div className="bg-dot-grid" />

      {/* Ambient orb 1 — violet, top-left */}
      <div className="bg-orb bg-orb-1" />

      {/* Ambient orb 2 — cyan, bottom-right */}
      <div className="bg-orb bg-orb-2" />

      {/* Ambient orb 3 — subtle pink, mid-screen */}
      <div className="bg-orb bg-orb-3" />

      {/* Rising particles */}
      {particles.map((i) => (
        <div
          key={i}
          className="bg-particle"
          style={{
            left: `${5 + (i * 6.1) % 92}%`,
            animationDelay: `${(i * 1.3) % 12}s`,
            animationDuration: `${10 + (i * 2.7) % 14}s`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            opacity: 0.15 + (i % 5) * 0.05,
          }}
        />
      ))}
    </div>
  );
};
