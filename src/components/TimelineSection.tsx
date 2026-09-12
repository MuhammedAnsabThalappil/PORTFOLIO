import React from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { TIMELINE } from '../data/portfolioData';

export const TimelineSection: React.FC = () => {
  return (
    <section className="section" id="journey">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <Compass size={16} />
            <span>VISUAL ROADMAP</span>
          </div>
          <h2 className="section-title">
            THE JOURNEY <span className="gradient-text">SO FAR</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From early foundations and national awards to venture building and AI engineering ambitions.
          </p>
        </div>

        {/* Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {TIMELINE.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: index === 2 || index === 5 ? 'rgba(0, 240, 255, 0.3)' : 'var(--border-color)',
                background: index === 2 ? 'linear-gradient(135deg, rgba(12, 16, 29, 0.9), rgba(0, 240, 255, 0.06))' : 'var(--bg-card)',
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
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--primary-cyan)',
                      background: 'rgba(0, 240, 255, 0.1)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                    }}
                  >
                    STEP {item.step}
                  </span>

                  <span
                    className="tag-pill"
                    style={{
                      borderColor: index === 2 ? 'var(--primary-cyan)' : 'var(--border-color)',
                      color: index === 2 ? 'var(--primary-cyan)' : 'var(--text-muted)',
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
                    fontSize: '0.85rem',
                    color: 'var(--secondary-violet)',
                    marginBottom: '1rem',
                    fontWeight: 500,
                  }}
                >
                  {item.subtitle}
                </div>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-dim)',
                }}
              >
                <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)' }} />
                <span>MILESTONE VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
