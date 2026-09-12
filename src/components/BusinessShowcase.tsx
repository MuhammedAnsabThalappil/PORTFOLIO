import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, ExternalLink, Building2, ShoppingBag, Globe } from 'lucide-react';
import { BUSINESSES } from '../data/portfolioData';
import { Business } from '../types';

interface BusinessShowcaseProps {
  onOpenBusinessModal: (biz: Business) => void;
}

const BIZ_ICONS: Record<string, React.ReactNode> = {
  motherbits: <Building2 size={20} style={{ color: 'var(--primary-cyan)' }} />,
  kingday:    <ShoppingBag size={20} style={{ color: 'var(--accent-amber)' }} />,
  zoltiq:     <Globe size={20} style={{ color: 'var(--accent-emerald)' }} />,
};

const BIZ_ACCENT: Record<string, string> = {
  motherbits: 'var(--primary-cyan)',
  kingday:    'var(--accent-amber)',
  zoltiq:     'var(--accent-emerald)',
};

export const BusinessShowcase: React.FC<BusinessShowcaseProps> = ({ onOpenBusinessModal }) => {
  return (
    <section className="section" id="entrepreneurship">
      <div className="container">
        <div className="section-eyebrow">
          <Briefcase size={16} />
          <span>04 — ENTREPRENEURSHIP</span>
        </div>
        <h2 className="section-title">
          BUILDING <span className="gradient-text">BEYOND CODE.</span>
        </h2>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '680px', marginBottom: '2.5rem' }}
        >
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
            Beyond academics and software development, I am actively involved in founding and scaling businesses across technology products, kids e-commerce, and international trade.
          </p>
        </motion.div>

        {/* Business Cards — one row desktop, stacked mobile */}
        <div className="biz-cards-row">
          {BUSINESSES.map((biz, idx) => {
            const accent = BIZ_ACCENT[biz.id] ?? 'var(--primary-cyan)';
            return (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.48, delay: idx * 0.1 }}
                className="glass-card biz-card"
                style={{ borderColor: 'rgba(255,255,255,0.08)', padding: '1.6rem' }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.15rem' }}>
                  {/* Logo / Icon */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: `1px solid rgba(255,255,255,0.1)`,
                      background: 'rgba(255,255,255,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={biz.image}
                      alt={biz.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        inset: 0,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {BIZ_ICONS[biz.id]}
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Role pill */}
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: accent,
                        background: `rgba(0,240,255,0.07)`,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        marginBottom: '0.3rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {biz.role}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={biz.name}
                    >
                      {biz.name}
                    </h3>
                  </div>
                </div>

                {/* Category */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                    marginBottom: '0.85rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  {biz.category}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.4rem' }}>
                  {biz.tags.map((t, tIdx) => (
                    <span key={tIdx} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onOpenBusinessModal(biz)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <span>EXPLORE</span>
                    <ArrowRight size={13} />
                  </button>
                  {biz.website && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.6rem 0.7rem', borderRadius: '10px' }}
                      aria-label="Website"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tagline Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card"
          style={{
            marginTop: '2rem',
            padding: '1.4rem 2rem',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.04), rgba(139, 92, 246, 0.04))',
            borderColor: 'rgba(0, 240, 255, 0.18)',
            textAlign: 'center',
          }}
        >
          <blockquote
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
              fontWeight: 800,
            }}
          >
            "Technology is what I learn. Building is what I do."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
