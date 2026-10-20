import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, Code2, Rocket, Target, User, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

export const AboutBento: React.FC = () => {
  const { profile: PROFILE } = usePortfolio();

  const getIcon = (num: string) => {
    switch (num) {
      case '01': return <Brain size={24} style={{ color: 'var(--accent-aura)' }} />;
      case '02': return <Code2 size={24} style={{ color: '#3b82f6' }} />;
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
            <span>01 — PHILOSOPHY &amp; BACKGROUND</span>
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
          FROM FIRST CODE <span className="gradient-text">TO FOUNDING VENTURES.</span>
        </motion.h2>

        {/* Narrative & Visual Editorial Bento Row */}
        <div className="bento-grid" style={{ marginBottom: '2rem' }}>
          {/* Main Story Narrative Card */}
          <motion.div
            custom={0}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-7"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--accent-aura)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}
            >
              NARRATIVE ARCHIVE
            </div>

            {PROFILE.aboutStory.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: index === 0 ? '1.18rem' : '1rem',
                  fontWeight: index === 0 ? 600 : 400,
                  color: index === 0 ? '#ffffff' : 'var(--text-muted)',
                  lineHeight: 1.8,
                  marginBottom: index < PROFILE.aboutStory.length - 1 ? '1.15rem' : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Mission & Real Photo Visual Card */}
          <motion.div
            custom={1}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-5"
            style={{
              background: 'linear-gradient(135deg, rgba(14, 18, 30, 0.98), rgba(20, 24, 42, 0.98))',
              borderColor: 'rgba(220, 248, 54, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2.25rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--accent-aura)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
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
                  borderLeft: '2px solid var(--accent-aura)',
                  paddingLeft: '1rem',
                }}
              >
                "{PROFILE.mission}"
              </blockquote>
            </div>

            {/* Real Campus Picture (KMCT / NIT Calicut) */}
            <div
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 9',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '1.25rem',
              }}
            >
              <img
                src="/assets/kmct.jpeg"
                alt="KMCT Engineering College Campus"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 8, 12, 0.85), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.75rem 1rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#ffffff',
                }}
              >
                KMCT ENGINEERING COLLEGE · AI &amp; DATA SCIENCE
              </div>
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
              <MapPin size={16} style={{ color: 'var(--accent-aura)' }} />
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {PROFILE.location}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 Identity Pillars */}
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
              whileHover={{ y: -6, borderColor: 'rgba(220, 248, 54, 0.35)' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
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
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: 'var(--accent-aura)',
                    }}
                  >
                    {card.number}
                  </span>
                  {getIcon(card.number)}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
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
                    lineHeight: 1.68,
                    marginBottom: '1.5rem',
                  }}
                >
                  {card.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
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
