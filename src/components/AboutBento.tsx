import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, Code2, Rocket, Target, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

export const AboutBento: React.FC = () => {
  const { profile: PROFILE } = usePortfolio();

  const getIcon = (num: string) => {
    switch (num) {
      case '01': return <Brain size={24} style={{ color: 'var(--primary-cyan)' }} />;
      case '02': return <Code2 size={24} style={{ color: 'var(--secondary-violet)' }} />;
      case '03': return <Rocket size={24} style={{ color: 'var(--accent-amber)' }} />;
      default:   return <Target size={24} />;
    }
  };

  return (
    <section className="section" id="about">
      <div className="container">
        {/* Section header */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="section-eyebrow">
            <User size={16} />
            <span>01 — ABOUT ME</span>
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
          FROM PROJECTS <span className="gradient-text">TO BUSINESSES.</span>
        </motion.h2>

        {/* Story & Mission Bento Row */}
        <div className="bento-grid" style={{ marginBottom: '1.5rem' }}>
          {/* Main Story Card */}
          <motion.div
            custom={0}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-7"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {PROFILE.aboutStory.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: index === 0 ? '1.15rem' : '0.98rem',
                  fontWeight: index === 0 ? 600 : 400,
                  color: index === 0 ? '#ffffff' : 'var(--text-muted)',
                  lineHeight: 1.75,
                  marginBottom: index < PROFILE.aboutStory.length - 1 ? '1rem' : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Mission Card */}
          <motion.div
            custom={1}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-5"
            style={{
              background: 'linear-gradient(135deg, rgba(13, 17, 32, 0.95), rgba(28, 20, 48, 0.95))',
              borderColor: 'rgba(139, 92, 246, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--secondary-violet)',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                <Target size={16} />
                <span>PERSONAL MISSION</span>
              </div>
              <blockquote
                style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#ffffff',
                  marginBottom: '1.75rem',
                }}
              >
                "{PROFILE.mission}"
              </blockquote>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                width: 'fit-content',
              }}
            >
              <MapPin size={16} style={{ color: 'var(--primary-cyan)' }} />
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {PROFILE.location}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 Identity Cards */}
        <div className="bento-grid">
          {PROFILE.identityCards.map((card, idx) => (
            <motion.div
              key={card.number}
              custom={idx}
              variants={REVEAL_SCALE}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="glass-card col-span-4"
              whileHover={{ y: -6, borderColor: 'rgba(0, 240, 255, 0.3)' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--primary-cyan)',
                    }}
                  >
                    {card.number}
                  </span>
                  {getIcon(card.number)}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '0.75rem',
                    color: '#ffffff',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem',
                  }}
                >
                  {card.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {card.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
