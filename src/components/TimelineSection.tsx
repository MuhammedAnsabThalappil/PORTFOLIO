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
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <Compass size={16} />
            <span>CHRONOLOGY &amp; TRAJECTORY</span>
          </div>
          <h2 className="section-title">
            THE JOURNEY <span className="gradient-text">SO FAR.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From early foundations and national government awards to commercial venture building and AI innovation.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                whileHover={{ y: -6, borderColor: 'rgba(220, 248, 54, 0.35)' }}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2rem',
                  borderColor: isHighlight ? 'rgba(220, 248, 54, 0.28)' : 'var(--border-color)',
                  background: isHighlight
                    ? 'linear-gradient(135deg, rgba(14, 18, 30, 0.95), rgba(220, 248, 54, 0.04))'
                    : 'var(--bg-card)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--accent-aura)',
                        background: 'rgba(220, 248, 54, 0.1)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(220, 248, 54, 0.25)',
                      }}
                    >
                      STEP {item.step}
                    </span>

                    <span
                      className="tag-pill"
                      style={{
                        borderColor: isHighlight ? 'var(--accent-aura)' : 'var(--border-color)',
                        color: isHighlight ? 'var(--accent-aura)' : 'var(--text-muted)',
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      marginBottom: '0.35rem',
                      color: '#ffffff',
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: '#3b82f6',
                      marginBottom: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.subtitle}
                  </div>

                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.68,
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: isHighlight ? 'var(--accent-aura)' : 'var(--text-dim)',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <CheckCircle2 size={14} />
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
