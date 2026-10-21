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
        padding: '3rem 0',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
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
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* marquee-track class handles pause-on-hover via CSS */}
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '1rem',
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
                gap: '0.65rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(25, 26, 44, 0.04)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                cursor: 'default',
                flexShrink: 0,
              }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>⚡</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
