import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Maximize2, ChevronDown, Sparkles, Newspaper, Users, AwardCheck, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShareButton } from './ShareButton';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

interface AchievementsShowcaseProps {
  onOpenLightbox: (imgSrc: string, caption: string) => void;
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
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <Trophy size={16} />
            <span>02 — ACHIEVEMENTS &amp; RECOGNITION</span>
          </div>
          <h2 className="section-title">
            HONORS <span className="gradient-text">&amp; AWARDS</span>
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
            padding: '2.25rem',
            borderRadius: '26px',
            background: 'linear-gradient(135deg, rgba(14, 18, 30, 0.96), rgba(20, 26, 46, 0.96))',
            borderColor: 'rgba(220, 248, 54, 0.35)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(220, 248, 54, 0.12)',
            marginBottom: '2.5rem',
            position: 'relative',
          }}
        >
          <div className="achiev-hero-grid">
            {/* Left — Real Team Winner Photo */}
            <motion.div
              className="col-span-6"
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '16 / 10',
                cursor: 'pointer',
                border: '1px solid rgba(220, 248, 54, 0.25)',
                background: '#090d16',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
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
                  transition: 'transform 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 8, 12, 0.85) 0%, rgba(7, 8, 12, 0.1) 50%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Maximize2 size={14} style={{ color: 'var(--accent-aura)' }} />
                  <span>CLICK TO ENLARGE TEAM PHOTO</span>
                </div>
                <span style={{ color: 'var(--accent-aura)', fontWeight: 700 }}>KMCT 2026</span>
              </div>
            </motion.div>

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
                    background: 'rgba(220, 248, 54, 0.12)',
                    border: '1px solid rgba(220, 248, 54, 0.35)',
                    color: 'var(--accent-aura)',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <Trophy size={16} />
                  <span>{HERO_ACHIEVEMENT.badge}</span>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <span style={{ color: '#ffffff' }}>{HERO_ACHIEVEMENT.prize}</span>
                </div>

                {/* PROMINENT SHARE BUTTON FOR CONVERGE 2026 ACHIEVEMENT */}
                <ShareButton
                  title="CONVERGE 2026 — 1st Prize Winner | Muhammed Ansab"
                  text="Muhammed Ansab and team secured 1st Prize and ₹25,000 at the CONVERGE 2026 Reverse Pitch Competition against 43 competing teams!"
                  url="https://ansab.pages.dev#achievement-converge-2026"
                  image="/assets/converge.jpg"
                  category="CONVERGE 2026"
                  variant="button"
                  label="SHARE WIN"
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  fontWeight: 900,
                  marginBottom: '0.35rem',
                  color: '#ffffff',
                  wordBreak: 'break-word',
                  lineHeight: 1.15,
                }}
              >
                {HERO_ACHIEVEMENT.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: 'var(--accent-aura)',
                  marginBottom: '1.1rem',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}
              >
                {HERO_ACHIEVEMENT.subtitle}
              </div>

              <blockquote
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-main)',
                  fontWeight: 500,
                  marginBottom: '1.25rem',
                  lineHeight: 1.65,
                  borderLeft: '2px solid var(--accent-aura)',
                  paddingLeft: '1rem',
                  fontStyle: 'italic',
                }}
              >
                "{HERO_ACHIEVEMENT.wording}"
              </blockquote>

              {/* Team Members List */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.08em',
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
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          background: isAnsab ? 'rgba(220, 248, 54, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: isAnsab ? '1px solid rgba(220, 248, 54, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: isAnsab ? 'var(--accent-aura)' : 'var(--text-muted)',
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
                <motion.button
                  onClick={() => setStoryExpanded(!storyExpanded)}
                  whileHover={{ background: 'rgba(220, 248, 54, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
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
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <span>BEHIND THE SCENES: THE STORY</span>
                  <motion.div animate={{ rotate: storyExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} style={{ color: 'var(--accent-aura)' }} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {storyExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '1.25rem',
                          background: 'rgba(7, 8, 12, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '12px',
                          marginTop: '0.6rem',
                          fontSize: '0.9rem',
                          lineHeight: 1.7,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {HERO_ACHIEVEMENT.storyFull.split('\n\n').map((p, pIdx) => (
                          <p key={pIdx} style={{ marginBottom: pIdx < 3 ? '0.85rem' : 0 }}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {ACHIEVEMENT_STATS.map((st, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={REVEAL_SCALE}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              whileHover={{ y: -4, borderColor: 'rgba(220, 248, 54, 0.35)' }}
              className="glass-card"
              style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
            >
              <div
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  marginBottom: '0.3rem',
                }}
              >
                {st.value}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                }}
              >
                {st.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Secondary Achievements + Media Coverage ─── */}
        <div className="bento-grid">
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
                whileHover={{ y: -4 }}
                className="glass-card col-span-6"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--accent-aura)',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {sec.issuer}
                    </div>

                    {/* Share Button for this secondary achievement */}
                    <ShareButton
                      title={`${sec.title} — ${sec.issuer}`}
                      text={sec.description}
                      url={`https://ansab.pages.dev#achievement-${sec.id}`}
                      image={imgPath}
                      category={sec.title}
                      variant="pill"
                      label="SHARE"
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.55rem',
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
                      fontSize: '0.82rem',
                      color: '#3b82f6',
                      marginBottom: '1rem',
                      fontWeight: 600,
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

          {/* Newspaper Media Feature */}
          <motion.div
            id="achievement-media"
            custom={2}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.96))',
              color: '#0f172a',
              border: 'none',
              padding: '2.25rem',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="newspaper-inner-grid">
              <div className="col-span-7">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#4f46e5',
                    }}
                  >
                    <Newspaper size={16} />
                    <span>{MEDIA_RECOGNITION.title}</span>
                  </div>

                  {/* Share button for media coverage */}
                  <ShareButton
                    title="Mangalam Newspaper Feature — Muhammed Ansab"
                    text="Media coverage in Mangalam Kozhikode Edition celebrating innovation and entrepreneurship achievements by Muhammed Ansab."
                    url="https://ansab.pages.dev#achievement-media"
                    image={MEDIA_RECOGNITION.image}
                    category="MEDIA RECOGNITION"
                    variant="pill"
                    label="SHARE"
                    style={{
                      background: 'rgba(79, 70, 229, 0.1)',
                      borderColor: 'rgba(79, 70, 229, 0.3)',
                      color: '#4f46e5',
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.3rem, 4vw, 2.1rem)',
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
                    fontSize: '0.82rem',
                    color: '#64748b',
                    marginBottom: '1rem',
                  }}
                >
                  {MEDIA_RECOGNITION.caption} · {MEDIA_RECOGNITION.page}
                </div>

                <p style={{ fontSize: '1.02rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  "{MEDIA_RECOGNITION.description}"
                </p>

                <motion.button
                  onClick={() =>
                    onOpenLightbox(
                      MEDIA_RECOGNITION.image,
                      `${MEDIA_RECOGNITION.newspaper} (${MEDIA_RECOGNITION.caption})`
                    )
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.25rem',
                    borderRadius: '12px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-heading)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Maximize2 size={16} />
                  <span>VIEW NEWSPAPER CLIPPING</span>
                </motion.button>
              </div>

              {/* Newspaper Image Preview */}
              <motion.div
                className="col-span-5"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  aspectRatio: '4 / 3',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
