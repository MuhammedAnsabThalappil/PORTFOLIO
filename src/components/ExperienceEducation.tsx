import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, MapPin, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

export const ExperienceEducation: React.FC = () => {
  const { experience: EXPERIENCE, education: EDUCATION } = usePortfolio();

  return (
    <section className="section" id="experience">
      <div className="container">
        {/* Section Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <Award size={15} />
            <span>05 — PROFESSIONAL EXPERIENCE</span>
          </div>
        </motion.div>

        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          Learning By <span className="gradient-text">Building.</span>
        </motion.h2>

        {/* Experience Card */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="glass-card"
          style={{
            marginBottom: '3.5rem',
            background: 'var(--bg-card, #161A24)',
          }}
        >
          <div className="exp-inner-grid">
            {/* Left Metadata Column */}
            <div className="col-span-5" style={{ minWidth: 0 }}>
              <div
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.04em',
                  marginBottom: '0.35rem',
                }}
              >
                SOFTWARE TRAINEE INTERNSHIP
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                  lineHeight: 1.2,
                }}
              >
                {EXPERIENCE.company}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  color: 'var(--color-teal)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                {EXPERIENCE.position}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                }}
              >
                <Calendar size={15} style={{ color: 'var(--color-primary)' }} />
                <span>{EXPERIENCE.duration} ({EXPERIENCE.length})</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-muted)',
                  marginBottom: '1.5rem',
                }}
              >
                <MapPin size={15} style={{ color: 'var(--color-coral)' }} />
                <span>Location: {EXPERIENCE.location}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {EXPERIENCE.skillsHighlighted.map((sk, idx) => (
                  <span key={idx} className="tag-pill">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Story & Mentorship Column */}
            <div className="col-span-7" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              {EXPERIENCE.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: '0.96rem',
                    lineHeight: 1.75,
                    color: 'var(--text-secondary)',
                    marginBottom: idx < EXPERIENCE.paragraphs.length - 1 ? '1rem' : '1.25rem',
                  }}
                >
                  {p}
                </p>
              ))}

              <div
                style={{
                  padding: '1.15rem 1.35rem',
                  borderRadius: '14px',
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.78rem',
                    color: 'var(--color-coral)',
                    fontWeight: 800,
                    marginBottom: '0.35rem',
                  }}
                >
                  <Heart size={14} />
                  <span>MENTORSHIP &amp; APPRECIATION</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                  "{EXPERIENCE.mentorship}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <GraduationCap size={15} />
            <span>06 — ACADEMIC FOUNDATIONS</span>
          </div>
        </motion.div>

        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          Educational <span className="gradient-text">Trajectory.</span>
        </motion.h2>

        {/* Education Grid */}
        <div className="bento-grid">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={REVEAL_SCALE}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              whileHover={{ y: -4 }}
              className="glass-card col-span-6"
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  fontWeight: 800,
                  marginBottom: '0.4rem',
                  letterSpacing: '0.04em',
                }}
              >
                {edu.badge}
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
                {edu.degree}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  color: 'var(--color-teal)',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                {edu.field}
              </div>

              <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {edu.institution}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <CheckCircle2 size={13} style={{ color: 'var(--color-teal)' }} />
                <span>{edu.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
