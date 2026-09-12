import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github, Smartphone, Cpu, BarChart2, Trophy } from 'lucide-react';
import { FEATURED_PROJECT, EXTRA_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onOpenProjectModal: (project: Project) => void;
}

const PROJECT_ICONS: Record<string, React.ReactNode> = {
  'flutter-mobile-app': <Smartphone size={22} style={{ color: 'var(--primary-cyan)' }} />,
  'embedded-raspi-iot': <Cpu size={22} style={{ color: 'var(--secondary-violet)' }} />,
  'data-analytics-dashboard': <BarChart2 size={22} style={{ color: 'var(--accent-emerald)' }} />,
};

const PROJECT_EMOJI: Record<string, string> = {
  'flutter-mobile-app': '📱',
  'embedded-raspi-iot': '🍓',
  'data-analytics-dashboard': '🧠',
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProjectModal }) => {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-eyebrow">
          <Code size={16} />
          <span>03 — PROJECTS</span>
        </div>
        <h2 className="section-title">
          THINGS I'VE <span className="gradient-text">BUILT.</span>
        </h2>

        {/* ─── Featured Project ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card"
          style={{
            padding: '0',
            marginBottom: '1.5rem',
            borderColor: 'rgba(0, 240, 255, 0.3)',
            background: 'linear-gradient(135deg, rgba(12, 16, 29, 0.97), rgba(16, 24, 44, 0.97))',
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
                  minHeight: '300px',
                  background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(139,92,246,0.12))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {FEATURED_PROJECT.image ? (
                  <img
                    src={FEATURED_PROJECT.image}
                    alt={FEATURED_PROJECT.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      inset: 0,
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : null}
                {/* Overlay gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, transparent 60%, rgba(12,16,29,0.9))',
                    pointerEvents: 'none',
                  }}
                />
                {/* Award badge overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '10px',
                    background: 'rgba(9,13,26,0.9)',
                    border: '1px solid rgba(245,158,11,0.4)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Trophy size={14} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f59e0b' }}>
                    INSPIRE AWARD — MANAK
                  </span>
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div className="featured-project-content-col" style={{ padding: '2.25rem 2.25rem 2.25rem 2rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--primary-cyan)',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.06em',
                }}
              >
                {FEATURED_PROJECT.number} · FEATURED INNOVATION
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.9rem)',
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
                  color: 'var(--secondary-violet)',
                  marginBottom: '1.25rem',
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
                    HIGHLIGHTS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {FEATURED_PROJECT.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="tag-pill"
                        style={{
                          borderColor: 'rgba(245, 158, 11, 0.3)',
                          color: '#fbbf24',
                          background: 'rgba(245, 158, 11, 0.07)',
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
                  TECH STACK
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {FEATURED_PROJECT.technologies.map((tech, idx) => (
                    <span key={idx} className="tag-pill" style={{ borderColor: 'rgba(0, 240, 255, 0.3)', color: '#ffffff' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a href="#achievement" className="btn btn-primary btn-sm">
                  <span>VIEW RECOGNITION</span>
                  <ExternalLink size={15} />
                </a>
                <a
                  href={FEATURED_PROJECT.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Extra Projects Grid ─── */}
        <div className="bento-grid">
          {EXTRA_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
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
                      color: 'var(--primary-cyan)',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {proj.number}
                  </span>
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

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
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
                    color: 'var(--secondary-violet)',
                    marginBottom: '0.9rem',
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
                    <span key={tIdx} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  onClick={() => onOpenProjectModal(proj)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <span>VIEW DETAILS</span>
                </button>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.6rem 0.75rem', borderRadius: '10px' }}
                  aria-label="GitHub Code"
                >
                  <Github size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
