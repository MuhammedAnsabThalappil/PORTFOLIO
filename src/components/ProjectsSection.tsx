import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github, Smartphone, Cpu, BarChart2, Trophy, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ShareButton } from './ShareButton';
import { REVEAL, REVEAL_SCALE, VIEWPORT } from '../hooks/useReveal';

interface ProjectsSectionProps {
  onOpenProjectModal: (project: Project) => void;
}

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  'flutter-mobile-app':       <Smartphone size={22} style={{ color: 'var(--accent-aura)' }} />,
  'embedded-raspi-iot':       <Cpu size={22} style={{ color: '#3b82f6' }} />,
  'data-analytics-dashboard': <BarChart2 size={22} style={{ color: 'var(--accent-emerald)' }} />,
};

const PROJECT_EMOJI: Record<string, string> = {
  'flutter-mobile-app':       '📱',
  'embedded-raspi-iot':       '🍓',
  'data-analytics-dashboard': '🧠',
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProjectModal }) => {
  const { featuredProject: FEATURED_PROJECT, extraProjects: EXTRA_PROJECTS } = usePortfolio();

  return (
    <section className="section" id="projects">
      <div className="container">
        {/* Header */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="section-eyebrow">
            <Code size={16} />
            <span>03 — PORTFOLIO &amp; ARCHITECTURE</span>
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
          ENGINEERED <span className="gradient-text">SOLUTIONS.</span>
        </motion.h2>

        {/* ─── Featured Project ─── */}
        <motion.div
          id="project-smart-attendance"
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="glass-card"
          style={{
            padding: '0',
            marginBottom: '2rem',
            borderColor: 'rgba(220, 248, 54, 0.35)',
            background: 'linear-gradient(135deg, rgba(14, 18, 30, 0.98), rgba(18, 24, 42, 0.98))',
            overflow: 'hidden',
          }}
        >
          <div className="featured-project-grid">
            {/* Left — Image */}
            <div className="featured-project-image-col">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  minHeight: '320px',
                  background: 'linear-gradient(135deg, rgba(220, 248, 54, 0.08), rgba(59, 130, 246, 0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {FEATURED_PROJECT.image ? (
                  <img
                    src={FEATURED_PROJECT.image}
                    alt={FEATURED_PROJECT.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      inset: 0,
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📷</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      MACHINE VISION CAMERA
                    </span>
                  </div>
                )}

                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '8px',
                    background: 'rgba(7, 8, 12, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(220, 248, 54, 0.4)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-aura)',
                    fontWeight: 700,
                  }}
                >
                  <Trophy size={13} />
                  <span>NATIONAL INSPIRE AWARD</span>
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div className="featured-project-content-col" style={{ padding: '2.5rem 2.5rem 2.5rem 2rem' }}>
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--accent-aura)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  {FEATURED_PROJECT.number} // CORE INNOVATION
                </div>

                {/* Share Button for Featured Project */}
                <ShareButton
                  title={`Smart Attendance System — Project by Muhammed Ansab`}
                  text={`ML-based Smart Attendance System recognized by the Government of India with the INSPIRE Award MANAK.`}
                  url="https://ansab.pages.dev#project-smart-attendance"
                  image={FEATURED_PROJECT.image || '/assets/projects/smart-attendance.jpg'}
                  category="FEATURED PROJECT"
                  variant="pill"
                  label="SHARE"
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                  fontWeight: 900,
                  marginBottom: '0.3rem',
                  color: '#ffffff',
                  lineHeight: 1.15,
                }}
              >
                🏆 {FEATURED_PROJECT.name}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#3b82f6',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                {FEATURED_PROJECT.category}
              </div>

              <p
                style={{
                  fontSize: '0.97rem',
                  lineHeight: 1.72,
                  color: 'var(--text-muted)',
                  marginBottom: '1.5rem',
                }}
              >
                {FEATURED_PROJECT.description}
              </p>

              {/* Highlights */}
              {FEATURED_PROJECT.highlights && FEATURED_PROJECT.highlights.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-dim)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      marginBottom: '0.65rem',
                    }}
                  >
                    ACCOLADES &amp; FEATURES
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {FEATURED_PROJECT.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="tag-pill"
                        style={{
                          borderColor: 'rgba(220, 248, 54, 0.3)',
                          color: 'var(--accent-aura)',
                          background: 'rgba(220, 248, 54, 0.08)',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginBottom: '0.65rem',
                  }}
                >
                  TECHNOLOGIES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {FEATURED_PROJECT.technologies.map((tech, idx) => (
                    <span key={idx} className="tag-pill" style={{ color: '#ffffff' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <motion.a
                  href="#achievement"
                  className="btn btn-primary btn-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>VIEW RECOGNITION</span>
                  <ExternalLink size={15} />
                </motion.a>
                <motion.a
                  href={FEATURED_PROJECT.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Extra Projects Grid ─── */}
        <div className="bento-grid">
          {EXTRA_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              id={`project-${proj.id}`}
              custom={idx}
              variants={REVEAL_SCALE}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              whileHover={{ y: -6, borderColor: 'rgba(220, 248, 54, 0.35)' }}
              className="glass-card col-span-4"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--accent-aura)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {proj.number}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    {/* Share Button for individual project */}
                    <ShareButton
                      title={`${proj.name} — Project by Muhammed Ansab`}
                      text={proj.description}
                      url={`https://ansab.pages.dev#project-${proj.id}`}
                      category={proj.name}
                      variant="icon"
                    />

                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {PROJECT_ICONS[proj.id] ?? <Code size={18} style={{ color: 'var(--text-dim)' }} />}
                    </div>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '0.2rem',
                    color: '#ffffff',
                    lineHeight: 1.25,
                  }}
                >
                  {PROJECT_EMOJI[proj.id] ? `${PROJECT_EMOJI[proj.id]} ` : ''}{proj.name}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#3b82f6',
                    marginBottom: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {proj.category}
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                  }}
                >
                  {proj.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {proj.technologies.map((t, tIdx) => (
                    <span key={tIdx} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <motion.button
                  onClick={() => onOpenProjectModal(proj)}
                  className="btn btn-secondary btn-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1 }}
                >
                  <span>VIEW DETAILS</span>
                </motion.button>
                <motion.a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  style={{ padding: '0.6rem 0.75rem', borderRadius: '10px' }}
                  aria-label="GitHub Code"
                >
                  <Github size={15} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
