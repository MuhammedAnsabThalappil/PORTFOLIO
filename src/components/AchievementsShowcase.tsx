import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Maximize2, ChevronDown, Sparkles, Newspaper } from 'lucide-react';
import {
  HERO_ACHIEVEMENT,
  ACHIEVEMENT_STATS,
  SECONDARY_ACHIEVEMENTS,
  MEDIA_RECOGNITION,
  ACHIEVEMENT_FLOW_TIMELINE
} from '../data/portfolioData';

interface AchievementsShowcaseProps {
  onOpenLightbox: (imgSrc: string, caption: string) => void;
}

export const AchievementsShowcase: React.FC<AchievementsShowcaseProps> = ({ onOpenLightbox }) => {
  const [storyExpanded, setStoryExpanded] = useState(false);

  return (
    <section className="section" id="achievement">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <Trophy size={16} />
            <span>02 — ACHIEVEMENTS & RECOGNITION</span>
          </div>
          <h2 className="section-title">
            HONORS <span className="gradient-text">& AWARDS</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            “Learning, building, competing — and turning ideas into results.”
          </p>
        </div>

        {/* CONVERGE 2026 Hero Featured Achievement Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: '2rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(12, 16, 29, 0.95), rgba(18, 26, 48, 0.95))',
            borderColor: 'rgba(0, 240, 255, 0.35)',
            boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 240, 255, 0.15)',
            marginBottom: '2rem',
          }}
        >
          <div className="achiev-hero-grid">
            {/* Left Photo Holder */}
            <div
              className="col-span-6"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 10',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onClick={() =>
                onOpenLightbox(
                  HERO_ACHIEVEMENT.image,
                  'CONVERGE 2026 Reverse Pitch 1st Prize Winners — Abraham Jolly, Muhammed Ansab Thalappil, Muhammad Finan, Parvathi Sreejith'
                )
              }
            >
              <img
                src={HERO_ACHIEVEMENT.image}
                alt="CONVERGE 2026 Team Winner Photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1rem',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  gap: '0.4rem',
                }}
              >
                <Maximize2 size={14} style={{ color: 'var(--primary-cyan)' }} />
                <span>CLICK TO ENLARGE TEAM PHOTO</span>
              </div>
            </div>

            {/* Right Details Block */}
            <div className="col-span-6">
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#f59e0b',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.85rem',
                  width: 'fit-content',
                  maxWidth: '100%',
                }}
              >
                <Trophy size={16} />
                <span>{HERO_ACHIEVEMENT.badge}</span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span>{HERO_ACHIEVEMENT.prize}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
                  fontWeight: 900,
                  marginBottom: '0.25rem',
                  color: '#ffffff',
                  wordBreak: 'break-word',
                }}
              >
                {HERO_ACHIEVEMENT.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--primary-cyan)',
                  marginBottom: '1rem',
                  letterSpacing: '0.05em',
                }}
              >
                {HERO_ACHIEVEMENT.subtitle}
              </div>

              <blockquote
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                  marginBottom: '1.25rem',
                  lineHeight: 1.6,
                }}
              >
                “{HERO_ACHIEVEMENT.wording}”
              </blockquote>

              {/* Team Members Chips */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    marginBottom: '0.5rem',
                  }}
                >
                  TEAM MEMBERS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {HERO_ACHIEVEMENT.teamMembers.map((member, mIdx) => {
                    const isAnsab = member.includes('Ansab');
                    return (
                      <span
                        key={mIdx}
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '8px',
                          background: isAnsab ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: isAnsab ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: isAnsab ? 'var(--primary-cyan)' : 'var(--text-muted)',
                          fontWeight: isAnsab ? 700 : 500,
                          wordBreak: 'break-word',
                          maxWidth: '100%',
                        }}
                      >
                        {member}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Accordion Story Toggle */}
              <div>
                <button
                  onClick={() => setStoryExpanded(!storyExpanded)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>READ THE STORY</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: storyExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--primary-cyan)',
                    }}
                  />
                </button>

                <AnimatePresence>
                  {storyExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '1rem',
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: '12px',
                          marginTop: '0.5rem',
                          fontSize: '0.925rem',
                          lineHeight: 1.7,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {HERO_ACHIEVEMENT.storyFull.split('\n\n').map((p, pIdx) => (
                          <p key={pIdx} style={{ marginBottom: pIdx < 3 ? '0.75rem' : 0 }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Stats Cards Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          {ACHIEVEMENT_STATS.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card"
              style={{ textAlign: 'center', padding: '1.5rem' }}
            >
              <div
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  marginBottom: '0.25rem',
                }}
              >
                {st.value}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                }}
              >
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Achievements + Newspaper Clipping Grid */}
        <div className="bento-grid">
          {/* Secondary Achievements */}
          {SECONDARY_ACHIEVEMENTS.map((sec, idx) => (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="glass-card col-span-6"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--primary-cyan)',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  {sec.issuer}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '0.25rem',
                    color: '#ffffff',
                  }}
                >
                  {sec.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--secondary-violet)',
                    marginBottom: '1rem',
                  }}
                >
                  {sec.subtitle}
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem',
                  }}
                >
                  {sec.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {sec.tags.map((t, tIdx) => (
                  <span key={tIdx} className="tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Newspaper Media Recognition Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card col-span-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(241, 245, 249, 0.95))',
              color: '#0f172a',
              border: 'none',
              padding: '2rem',
            }}
          >
            <div className="newspaper-inner-grid">
              <div className="col-span-7">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#7c3aed',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Newspaper size={16} />
                  <span>{MEDIA_RECOGNITION.title}</span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                    fontWeight: 900,
                    color: '#0f172a',
                    marginBottom: '0.35rem',
                    wordBreak: 'break-word',
                  }}
                >
                  {MEDIA_RECOGNITION.newspaper}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: '#64748b',
                    marginBottom: '1rem',
                  }}
                >
                  {MEDIA_RECOGNITION.caption} · {MEDIA_RECOGNITION.page}
                </div>
                <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  “{MEDIA_RECOGNITION.description}”
                </p>
                <button
                  onClick={() =>
                    onOpenLightbox(
                      MEDIA_RECOGNITION.image,
                      `${MEDIA_RECOGNITION.newspaper} (${MEDIA_RECOGNITION.caption})`
                    )
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.1rem',
                    borderRadius: '10px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-heading)',
                    border: 'none',
                    cursor: 'pointer',
                    maxWidth: '100%',
                    flexWrap: 'wrap' as const,
                  }}
                >
                  <Maximize2 size={16} style={{ flexShrink: 0 }} />
                  <span>VIEW NEWSPAPER CLIPPING</span>
                </button>
              </div>

              <div
                className="col-span-5"
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  aspectRatio: '4 / 3',
                }}
                onClick={() =>
                  onOpenLightbox(
                    MEDIA_RECOGNITION.image,
                    `${MEDIA_RECOGNITION.newspaper} (${MEDIA_RECOGNITION.caption})`
                  )
                }
              >
                <img
                  src={MEDIA_RECOGNITION.image}
                  alt="Mangalam Newspaper Clipping"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
