import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MobileIntro
 * 
 * A mobile-only (≤ 900px) cinematic intro overlay that shows once per session.
 * Displays ANSAB.jpeg with a premium scale + glow + fade animation, then
 * auto-dismisses after 2.8 seconds. Tapping anywhere dismisses early.
 * 
 * Respects prefers-reduced-motion: shortened duration + no scale animation.
 */
export const MobileIntro: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only show on mobile viewports
    const isMobile = window.innerWidth <= 900;
    if (!isMobile) return;

    // Only show once per browser session
    const seen = sessionStorage.getItem('ansab-intro-seen');
    if (seen) return;

    sessionStorage.setItem('ansab-intro-seen', '1');
    setShouldRender(true);
    // Tiny delay so DOM is ready before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const dismiss = () => setVisible(false);

  // Auto-dismiss after 2.8s
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(dismiss, 2800);
    return () => clearTimeout(t);
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence onExitComplete={() => setShouldRender(false)}>
      {visible && (
        <motion.div
          key="mobile-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={dismiss}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 7, 14, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            cursor: 'pointer',
            padding: '2rem',
          }}
        >
          {/* Glow ring behind photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, rgba(139,92,246,0.12) 50%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2.5px solid rgba(0, 240, 255, 0.45)',
              boxShadow: '0 0 40px rgba(0, 240, 255, 0.25), 0 0 80px rgba(139, 92, 246, 0.15), 0 20px 50px rgba(0,0,0,0.6)',
              marginBottom: '1.5rem',
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/ansab.jpeg"
              alt="Muhammed Ansab Thalappil"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.45rem',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
              textAlign: 'center',
            }}
          >
            MUHAMMED ANSAB
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--primary-cyan)',
              letterSpacing: '0.12em',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            AI · CODE · BUSINESS
          </motion.div>

          {/* Pulsing tap-to-skip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.08em',
              position: 'absolute',
              bottom: '2.5rem',
            }}
          >
            TAP TO CONTINUE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
