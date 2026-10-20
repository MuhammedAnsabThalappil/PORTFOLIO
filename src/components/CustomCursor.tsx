import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if user has touch or prefers reduced motion
    const touch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 1024;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      const customTag = target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (customTag) {
        setHovered(true);
        setCursorText(customTag);
      } else if (interactive) {
        setHovered(true);
        setCursorText(null);
      } else {
        setHovered(false);
        setCursorText(null);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  if (isTouchDevice || !visible) return null;

  return (
    <>
      {/* Center Precision Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-aura)',
          pointerEvents: 'none',
          zIndex: 999998,
          transition: 'opacity 0.2s',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Trailing Fluid Halo Ring */}
      <motion.div
        animate={{
          x: pos.x - (cursorText ? 36 : hovered ? 24 : 18),
          y: pos.y - (cursorText ? 36 : hovered ? 24 : 18),
          width: cursorText ? 72 : hovered ? 48 : 36,
          height: cursorText ? 72 : hovered ? 48 : 36,
          backgroundColor: cursorText
            ? 'rgba(220, 248, 54, 0.95)'
            : hovered
            ? 'rgba(220, 248, 54, 0.15)'
            : 'rgba(255, 255, 255, 0.04)',
          borderColor: cursorText
            ? 'var(--accent-aura)'
            : hovered
            ? 'var(--accent-aura)'
            : 'rgba(255, 255, 255, 0.2)',
          color: cursorText ? '#07080c' : '#ffffff',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.45,
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          borderWidth: '1px',
          borderStyle: 'solid',
          pointerEvents: 'none',
          zIndex: 999997,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.62rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        {cursorText}
      </motion.div>
    </>
  );
};
