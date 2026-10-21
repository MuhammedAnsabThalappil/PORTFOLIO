import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Brain, Code2, Rocket, Target, User, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

export const AboutBento: React.FC = () => {
  const { profile: PROFILE } = usePortfolio();

  const getIcon = (num: string) => {
    switch (num) {
      case '01': return <Brain size={22} style={{ color: 'var(--color-primary)' }} />;
      case '02': return <Code2 size={22} style={{ color: 'var(--color-teal)' }} />;
      case '03': return <Rocket size={22} style={{ color: 'var(--color-coral)' }} />;
      default:   return <Target size={22} />;
    }
  };

  return (
    <section className="section" id="about">
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
            <User size={15} />
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
          From First Code <span className="gradient-text">To Founding Ventures.</span>
        </motion.h2>

        {/* Narrative & Visual Bento Row */}
        <div className="bento-grid" style={{ marginBottom: '2rem' }}>
          {/* Main Story Narrative Card */}
          <motion.div
            custom={0}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-7"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.78rem',
                color: 'var(--color-primary)',
                fontWeight: 800,
                letterSpacing: '0.06em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
              }}
            >
              Narrative Archive
            </div>

            {PROFILE.aboutStory.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: index === 0 ? '1.08rem' : '0.98rem',
                  fontWeight: index === 0 ? 600 : 400,
                  color: index === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                  lineHeight: 1.75,
                  marginBottom: index < PROFILE.aboutStory.length - 1 ? '1rem' : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Mission & Real Campus Photo Visual Card */}
          <motion.div
            custom={1}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-5"
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
                  gap: '0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.78rem',
                  color: 'var(--color-primary)',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                <Target size={15} />
                <span>Personal Mission</span>
              </div>
              <blockquote
                style={{
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  borderLeft: '3px solid var(--color-primary)',
                  paddingLeft: '1rem',
                }}
              >
                "{PROFILE.mission}"
              </blockquote>
            </div>

            {/* Real Campus Picture (KMCT Engineering College) */}
            <div
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 9',
                border: '1px solid var(--border-color)',
                marginBottom: '1.25rem',
                background: '#EEECF9',
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
                  background: 'linear-gradient(to top, rgba(25, 26, 44, 0.75) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.75rem 1rem',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                KMCT ENGINEERING COLLEGE · AI &amp; DATA SCIENCE
              </div>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-color)',
                width: 'fit-content',
              }}
            >
              <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-secondary)' }}>
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
              whileHover={{ y: -4 }}
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
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    PILLAR {card.number}
                  </span>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'var(--bg-surface-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {getIcon(card.number)}
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '0.65rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
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
