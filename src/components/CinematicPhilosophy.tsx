import React from 'react';
import { motion } from 'framer-motion';

export const CinematicPhilosophy: React.FC = () => {
  return (
    <section
      style={{
        padding: '8rem 0',
        position: 'relative',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 9vw, 6.5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              marginBottom: '1.75rem',
            }}
          >
            SKILLS<br />CREATE<br />OPPORTUNITIES.
          </div>

          <p
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              maxWidth: '640px',
              margin: '0 auto',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            “I believe consistency, curiosity and practical skills matter more than labels.”
          </p>
        </motion.div>
      </div>
    </section>
  );
};
