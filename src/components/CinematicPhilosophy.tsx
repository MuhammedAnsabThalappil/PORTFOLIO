import React from 'react';
import { motion } from 'framer-motion';
import { REVEAL, VIEWPORT } from '../hooks/useReveal';

export const CinematicPhilosophy: React.FC = () => {
  const lines = ['SKILLS', 'CREATE', 'OPPORTUNITIES.'];

  const lineVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 40, skewY: 3 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        duration: 0.65,
        delay: i * 0.18,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      style={{
        padding: '8rem 0',
        position: 'relative',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        overflow: 'hidden',
      }}
    >
      {/* Background glow pulse */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Line-by-line stagger reveal */}
        <div style={{ marginBottom: '1.75rem', lineHeight: 0.95 }}>
          {lines.map((line, i) => (
            <div key={line} style={{ overflow: 'hidden', padding: '0.05em 0' }}>
              <motion.div
                custom={i}
                variants={lineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(3rem, 9vw, 6.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  display: 'block',
                }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.p
          custom={3}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            maxWidth: '640px',
            margin: '0 auto',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          "I believe consistency, curiosity and practical skills matter more than labels."
        </motion.p>
      </div>
    </section>
  );
};
