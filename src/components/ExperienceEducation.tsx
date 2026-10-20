import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, MapPin, GraduationCap, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

export const ExperienceEducation: React.FC = () => {
  const { experience: EXPERIENCE, education: EDUCATION } = usePortfolio();

  return (
    <section className="section" id="experience">
      <div className="container">
        {/* Experience Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <Award size={16} />
            <span>05 — EXPERIENCE</span>
          </div>
        </motion.div>
        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          LEARNING BY <span className="gradient-text">BUILDING.</span>
        </motion.h2>

        {/* Experience Card */}
        <motion.div
          custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="glass-card"
          style={{
            padding: '2rem', marginBottom: '4.5rem',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            background: 'linear-gradient(135deg, rgba(12,16,29,0.95), rgba(24,18,44,0.95))',
          }}
        >
          <div className="exp-inner-grid">
            {/* Left Metadata */}
            <div className="col-span-5" style={{ minWidth: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>
                {EXPERIENCE.company}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--secondary-violet)', fontWeight: 600, marginBottom: '1.25rem' }}>
                {EXPERIENCE.position}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-cyan)', marginBottom: '0.75rem' }}>
                <Calendar size={16} />
                <span>{EXPERIENCE.duration} ({EXPERIENCE.length})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '1.75rem' }}>
                <MapPin size={16} />
                <span>LOCATION: {EXPERIENCE.location}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {EXPERIENCE.skillsHighlighted.map((sk, idx) => (
                  <span key={idx} className="tag-pill" style={{ borderColor: 'rgba(0,240,255,0.3)', color: 'var(--primary-cyan)' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Story */}
            <div className="col-span-7" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              {EXPERIENCE.paragraphs.map((p, idx) => (
                <p key={idx} style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: idx < EXPERIENCE.paragraphs.length - 1 ? '1rem' : '1.5rem' }}>
                  {p}
                </p>
              ))}
              <div style={{ padding: '1.15rem 1.5rem', borderRadius: '16px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--secondary-violet)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <Heart size={14} style={{ color: 'var(--accent-pink)' }} />
                  <span>MENTORSHIP &amp; APPRECIATION</span>
                </div>
                <p style={{ fontSize: '0.925rem', color: '#ffffff', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{EXPERIENCE.mentorship}"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <GraduationCap size={16} />
            <span>06 — EDUCATION</span>
          </div>
        </motion.div>
        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          THE <span className="gradient-text">FOUNDATION.</span>
        </motion.h2>

        {/* Education Grid */}
        <div className="bento-grid">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              custom={idx} variants={REVEAL_SCALE} initial="hidden" whileInView="visible" viewport={VIEWPORT}
              whileHover={{ y: -5, borderColor: 'rgba(0,240,255,0.28)' }}
              className="glass-card col-span-6"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary-cyan)', fontWeight: 700, marginBottom: '0.4rem' }}>
                {edu.badge}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
                {edu.degree}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--secondary-violet)', marginBottom: '1rem' }}>
                {edu.field}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {edu.institution}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
