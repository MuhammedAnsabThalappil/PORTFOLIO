import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, ExternalLink, Building2, ShoppingBag, Globe, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Business } from '../types';
import { ShareButton } from './ShareButton';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

interface BusinessShowcaseProps {
  onOpenBusinessModal: (biz: Business) => void;
}

const BIZ_ICONS: Record<string, React.ReactNode> = {
  motherbits: <Building2 size={20} style={{ color: 'var(--color-primary)' }} />,
  kingday:    <ShoppingBag size={20} style={{ color: 'var(--color-amber)' }} />,
  zoltiq:     <Globe size={20} style={{ color: 'var(--color-teal)' }} />,
};

const BIZ_COLOR: Record<string, string> = {
  motherbits: 'var(--color-primary)',
  kingday:    '#B45309',
  zoltiq:     'var(--color-teal)',
};

export const BusinessShowcase: React.FC<BusinessShowcaseProps> = ({ onOpenBusinessModal }) => {
  const { businesses: BUSINESSES } = usePortfolio();

  return (
    <section className="section" id="entrepreneurship">
      <div className="container">
        {/* Section Header */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="section-eyebrow">
            <Briefcase size={15} />
            <span>04 — COMMERCIAL VENTURES</span>
          </div>
        </motion.div>

        <motion.h2
          custom={1}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="section-title"
        >
          Building <span className="gradient-text">Beyond Code.</span>
        </motion.h2>

        <motion.p
          custom={2}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="section-subtitle"
          style={{ marginBottom: '2.5rem' }}
        >
          Beyond academics and software development, I actively co-found and scale commercial enterprises across scalable software solutions, e-commerce, and international trade.
        </motion.p>

        {/* Business Cards Row */}
        <div className="biz-cards-row">
          {BUSINESSES.map((biz, idx) => {
            const brandColor = BIZ_COLOR[biz.id] ?? 'var(--color-primary)';
            return (
              <motion.div
                key={biz.id}
                id={`business-${biz.id}`}
                custom={idx}
                variants={REVEAL_SCALE}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                whileHover={{ y: -5 }}
                className="biz-card"
              >
                {/* Header with Logo/Icon & Number */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-surface-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={biz.image}
                          alt={biz.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div style={{ position: 'relative', zIndex: 1 }}>{BIZ_ICONS[biz.id]}</div>
                      </div>

                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: brandColor,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {biz.number}
                        </span>
                        <div
                          style={{
                            display: 'inline-block',
                            marginLeft: '0.5rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: 'var(--bg-surface-subtle)',
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {biz.role}
                        </div>
                      </div>
                    </div>

                    <ShareButton
                      title={`${biz.name} — ${biz.role}`}
                      text={biz.shortDesc}
                      url={`#business-${biz.id}`}
                      image={biz.image}
                      category={biz.name}
                      variant="pill"
                      label="Share"
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {biz.name}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                      marginBottom: '0.85rem',
                    }}
                  >
                    {biz.category}
                  </div>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {biz.shortDesc}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {biz.tags.map((t) => (
                      <span key={t} className="tag-pill" style={{ fontSize: '0.75rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <button
                      type="button"
                      onClick={() => onOpenBusinessModal(biz)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <span>Venture Overview</span>
                      <ArrowRight size={13} />
                    </button>

                    {biz.website && (
                      <a
                        href={biz.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.55rem', minWidth: '44px' }}
                        aria-label={`Visit ${biz.name} website`}
                      >
                        <Globe size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
