import React from 'react';
import { Sparkles } from 'lucide-react';
import { CURRENTLY_EXPLORING } from '../data/portfolioData';

export const ExploringMarquee: React.FC = () => {
  const doubleList = [...CURRENTLY_EXPLORING, ...CURRENTLY_EXPLORING];

  return (
    <section style={{ padding: '3.5rem 0', background: 'rgba(255, 255, 255, 0.015)', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: '1.25rem' }}>
        <div className="section-eyebrow">
          <Sparkles size={16} />
          <span>09 — CURRENTLY EXPLORING</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          userSelect: 'none',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            animation: 'marquee 35s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {doubleList.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                background: 'rgba(12, 16, 29, 0.8)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              <span style={{ color: 'var(--primary-cyan)' }}>⚡</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
