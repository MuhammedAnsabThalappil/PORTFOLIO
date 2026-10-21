import React from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

export const TimelineSection: React.FC = () => {
  const { timeline: TIMELINE } = usePortfolio();

  return (
    <section className="section" id="journey">
      <div className="container">
        {/* Section Header */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <Compass size={15} />
            <span>CHRONOLOGY &amp; TRAJECTORY</span>
          </div>
          <h2 className="section-title">
            The Journey <span className="gradient-text">So Far.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From early foundations and national government awards to commercial venture building and AI innovation.
          </p>
        </motion.div>

        {/* Responsive Timeline Grid (Never overflows 320px) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {TIMELINE.map((item, index) => {
            const isHighlight = index === 2 || index === 4 || index === 5;
            return (
              <motion.div
                key={item.step}
                custom={index}
                variants={REVEAL_SCALE}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderColor: isHighlight ? 'var(--color-primary-border)' : 'var(--border-color)',
                  background: isHighlight ? 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-surface-subtle) 100%)' : '#FFFFFF',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--color-primary)',
                        background: 'var(--color-primary-subtle)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-primary-border)',
                      }}
                    >
                      STEP {item.step}
                    </span>

                    <span
                      className="tag-pill"
                      style={{
                        borderColor: isHighlight ? 'var(--color-primary-border)' : 'var(--border-color)',
                        color: isHighlight ? 'var(--color-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      marginBottom: '0.35rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      color: 'var(--color-teal)',
                      fontWeight: 700,
                      marginBottom: '0.85rem',
                    }}
                  >
                    {item.subtitle}
                  </div>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    marginTop: '1.25rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  <CheckCircle2 size={14} style={{ color: 'var(--color-teal)' }} />
                  <span>Verified Milestone</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
