import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicOpeningProps {
  onComplete?: () => void;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    // Only show once per session
    const seen = sessionStorage.getItem('ansab_editorial_intro_seen');
    if (seen) {
      if (onComplete) onComplete();
      return;
    }

    sessionStorage.setItem('ansab_editorial_intro_seen', 'true');
    setVisible(true);

    // Fast, smooth counter animation
    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setVisible(false);
          if (onComplete) onComplete();
        }, 350);
      }
    };

    requestAnimationFrame(animateProgress);
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    if (onComplete) onComplete();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0e1022',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(1.5rem, 4vw, 3.5rem)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(91, 75, 255, 0.18) 0%, rgba(0, 191, 166, 0.08) 50%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(60px)',
            }}
          />

          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00BFA6',
                  boxShadow: '0 0 10px #00BFA6',
                }}
              />
              <span>11.0510° N, 76.0711° E · MALAPPURAM, IN</span>
            </div>

            <button
              onClick={handleSkip}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '9999px',
                padding: '0.45rem 1rem',
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '44px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <span>SKIP INTRO</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Center Stage: Portrait + Typography */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              textAlign: 'center',
              margin: 'auto 0',
            }}
          >
            {/* Real Portrait Reveal */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: 'clamp(140px, 22vw, 190px)',
                height: 'clamp(140px, 22vw, 190px)',
                borderRadius: '50%',
                padding: '4px',
                background: 'linear-gradient(135deg, #5B4BFF, #00BFA6)',
                boxShadow: '0 0 50px rgba(91, 75, 255, 0.35), 0 20px 40px rgba(0, 0, 0, 0.7)',
                marginBottom: '1.75rem',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#0d1017',
                  position: 'relative',
                }}
              >
                <img
                  src="/assets/ansab.jpeg"
                  alt="Muhammed Ansab"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                  }}
                />
              </div>

              {/* Status pill on photo */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#0e1022',
                  border: '1px solid #5B4BFF',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#00BFA6',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                }}
              >
                FOUNDER &amp; BUILDER
              </div>
            </motion.div>

            {/* Monospaced Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: '#00BFA6',
                letterSpacing: '0.12em',
                marginBottom: '0.75rem',
              }}
            >
              <Sparkles size={14} />
              <span>OFFICIAL ARCHIVE // VOL. 2026</span>
            </motion.div>

            {/* Bold Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 0.5rem',
                color: '#ffffff',
              }}
            >
              MUHAMMED ANSAB
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
              }}
            >
              BUILDING IDEAS INTO REALITY.
            </motion.div>
          </div>

          {/* Bottom Bar: Loading Meter */}
          <div style={{ zIndex: 2 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                INITIALIZING PORTFOLIO ENGINE...
              </div>

              <div
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: '#00BFA6',
                  lineHeight: 1,
                }}
              >
                {progress.toString().padStart(2, '0')}%
              </div>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #5B4BFF, #00BFA6)',
                  boxShadow: '0 0 15px rgba(91, 75, 255, 0.5)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
