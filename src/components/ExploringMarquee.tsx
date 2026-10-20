import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExploringMarquee: React.FC = () => {
  const { currentlyExploring: CURRENTLY_EXPLORING } = usePortfolio();
  const doubleList = [...CURRENTLY_EXPLORING, ...CURRENTLY_EXPLORING];


  return (
    <section
      style={{
        padding: '3.5rem 0',
        background: 'rgba(255, 255, 255, 0.015)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '1.25rem' }}
      >
        <div className="section-eyebrow">
          <Sparkles size={16} />
          <span>09 — CURRENTLY EXPLORING</span>
        </div>
      </motion.div>

      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          userSelect: 'none',
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        {/* marquee-track class handles pause-on-hover via CSS */}
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '1.25rem',
            whiteSpace: 'nowrap',
          }}
        >
          {doubleList.map((item, idx) => (
            <div
              key={idx}
              className="marquee-item"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                background: 'rgba(12, 16, 29, 0.85)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                cursor: 'default',
                flexShrink: 0,
              }}
            >
              <span style={{ color: 'var(--primary-cyan)' }}>⚡</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
