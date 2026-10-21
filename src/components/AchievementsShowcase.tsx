import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronDown, Newspaper, ExternalLink, Calendar, MapPin, Maximize2, Share2, Award, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShareButton } from './ShareButton';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

interface AchievementsShowcaseProps {
  onOpenLightbox: (imageSrc: string, caption: string) => void;
}

export const AchievementsShowcase: React.FC<AchievementsShowcaseProps> = ({ onOpenLightbox }) => {
  const {
    heroAchievement: HERO_ACHIEVEMENT,
    achievementStats: ACHIEVEMENT_STATS,
    secondaryAchievements: SECONDARY_ACHIEVEMENTS,
    mediaRecognition: MEDIA_RECOGNITION,
  } = usePortfolio();

  const [storyExpanded, setStoryExpanded] = useState(false);

  return (
    <section className="section" id="achievement">
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
            <Trophy size={15} />
            <span>HONORS &amp; AWARDS</span>
          </div>
          <h2 className="section-title">
            Competitive &amp; <span className="gradient-text">State Recognition.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            "Learning, building, competing — and turning ideas into impactful results."
          </p>
        </motion.div>

        {/* ─── CONVERGE 2026 Hero Achievement Card ─── */}
        <motion.div
          id="achievement-converge-2026"
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="glass-card"
          style={{
            marginBottom: '2.5rem',
            position: 'relative',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFF 100%)',
          }}
        >
          <div className="achiev-hero-grid">
            {/* Left — Real Team Winner Photo */}
            <div
              className="col-span-6"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 10',
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                background: '#EEECF9',
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
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.45s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(25, 26, 44, 0.75) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Maximize2 size={14} style={{ color: 'var(--color-amber)' }} />
                  <span>CLICK TO ENLARGE TEAM PHOTO</span>
                </div>
                <span style={{ color: 'var(--color-amber)', fontWeight: 800 }}>KMCT 2026</span>
              </div>
            </div>

            {/* Right Details & Story */}
            <div className="col-span-6">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                {/* 1st Prize Pill */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.95rem',
                    borderRadius: '9999px',
                    background: 'var(--color-amber-subtle)',
                    border: '1px solid var(--color-amber-border)',
                    color: '#B45309',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  <Trophy size={16} />
                  <span>{HERO_ACHIEVEMENT.badge}</span>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span style={{ color: 'var(--text-primary)' }}>{HERO_ACHIEVEMENT.prize}</span>
                </div>

                {/* Share Button for CONVERGE 2026 */}
                <ShareButton
                  title="CONVERGE 2026 — 1st Prize Winner | Muhammed Ansab"
                  text="Muhammed Ansab and team secured 1st Prize and ₹25,000 at the CONVERGE 2026 Reverse Pitch Competition against 43 competing teams!"
                  url="https://ansab.pages.dev#achievement-converge-2026"
                  image="/assets/converge.jpg"
                  category="CONVERGE 2026"
                  variant="button"
                  label="Share Win"
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                  fontWeight: 900,
                  marginBottom: '0.35rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                {HERO_ACHIEVEMENT.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  color: 'var(--color-primary)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  marginBottom: '1rem',
                }}
              >
                {HERO_ACHIEVEMENT.subtitle}
              </div>

              <blockquote
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  borderLeft: '3px solid var(--color-primary)',
                  marginBottom: '1.25rem',
                  paddingLeft: '1rem',
                  fontStyle: 'italic',
                }}
              >
                "{HERO_ACHIEVEMENT.wording}"
              </blockquote>

              {/* Winning Team Members */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.06em',
                  }}
                >
                  WINNING TEAM MEMBERS
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {HERO_ACHIEVEMENT.teamMembers.map((member, mIdx) => {
                    const isAnsab = member.includes('Ansab');
                    return (
                      <span
                        key={mIdx}
                        style={{
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-body)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '8px',
                          background: isAnsab ? 'var(--color-primary-subtle)' : 'var(--bg-surface-subtle)',
                          border: isAnsab ? '1px solid var(--color-primary-border)' : '1px solid var(--border-color)',
                          color: isAnsab ? 'var(--color-primary)' : 'var(--text-secondary)',
                          fontWeight: isAnsab ? 800 : 500,
                        }}
                      >
                        {member}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Expandable Story Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setStoryExpanded(!storyExpanded)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    minHeight: '44px',
                  }}
                >
                  <span>Behind the Scenes: The Full Story</span>
                  <motion.div animate={{ rotate: storyExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={18} style={{ color: 'var(--color-primary)' }} />
                  </motion.div>
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
                          padding: '1.25rem',
                          background: '#FFFFFF',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          marginTop: '0.5rem',
                          fontSize: '0.92rem',
                          lineHeight: 1.7,
                          color: 'var(--text-secondary)',
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

        {/* ─── Metric Journey Strip ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
          className="hero-stats-grid"
        >
          {ACHIEVEMENT_STATS.map((st, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={REVEAL_SCALE}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="glass-card"
              style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
            >
              <div
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  fontWeight: 900,
                  marginBottom: '0.2rem',
                }}
              >
                {st.value}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.04em',
                }}
              >
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Secondary Achievements ─── */}
        <div className="bento-grid" style={{ marginBottom: '2.5rem' }}>
          {SECONDARY_ACHIEVEMENTS.map((sec, idx) => {
            const isInspire = sec.id === 'inspire-award';
            const imgPath = isInspire ? '/assets/projects/smart-attendance.jpg' : '/assets/nit.jpeg';

            return (
              <motion.div
                key={sec.id}
                id={`achievement-${sec.id}`}
                custom={idx}
                variants={REVEAL}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="glass-card col-span-6"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        color: 'var(--color-primary)',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {sec.issuer}
                    </div>

                    <ShareButton
                      title={`${sec.title} — ${sec.issuer}`}
                      text={sec.description}
                      url={`https://ansab.pages.dev#achievement-${sec.id}`}
                      image={imgPath}
                      category={sec.title}
                      variant="pill"
                      label="Share"
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      marginBottom: '0.25rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {sec.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.85rem',
                      color: 'var(--color-teal)',
                      marginBottom: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    {sec.subtitle}
                  </div>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {sec.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {sec.tags.map((t, tIdx) => (
                    <span key={tIdx} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── State Media Feature (Mangalam Newspaper) ─── */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="glass-card"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, var(--bg-surface-subtle) 100%)',
          }}
        >
          <div className="newspaper-inner-grid">
            <div
              className="col-span-4"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '4 / 3',
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                background: '#EEECF9',
              }}
              onClick={() => onOpenLightbox(MEDIA_RECOGNITION.image, 'State Media Coverage in Mangalam Newspaper')}
            >
              <img
                src={MEDIA_RECOGNITION.image}
                alt="Mangalam Newspaper Feature"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(25, 26, 44, 0.7) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.65rem 0.85rem',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                }}
              >
                CLICK TO ENLARGE CLIPPING
              </div>
            </div>

            <div className="col-span-8">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.78rem',
                  color: 'var(--color-primary)',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.04em',
                }}
              >
                <Newspaper size={16} />
                <span>STATE MEDIA COVERAGE</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.7rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                }}
              >
                {MEDIA_RECOGNITION.title}
              </h3>

              <div
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--color-teal)',
                  marginBottom: '0.85rem',
                }}
              >
                {MEDIA_RECOGNITION.newspaper} · Page {MEDIA_RECOGNITION.page} · {MEDIA_RECOGNITION.date}
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                }}
              >
                {MEDIA_RECOGNITION.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShareButton
                  title="State Media Recognition — Mangalam"
                  text="Muhammed Ansab Thalappil featured in Mangalam Newspaper for student innovation leadership."
                  url="https://ansab.pages.dev#achievement"
                  image="/assets/recognition/newspaper.jpg"
                  category="MEDIA FEATURE"
                  variant="pill"
                  label="Share Article"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
