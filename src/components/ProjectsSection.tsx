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
  'flutter-mobile-app':       <Smartphone size={20} style={{ color: 'var(--color-primary)' }} />,
  'embedded-raspi-iot':       <Cpu size={20} style={{ color: 'var(--color-teal)' }} />,
  'data-analytics-dashboard': <BarChart2 size={20} style={{ color: 'var(--color-coral)' }} />,
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProjectModal }) => {
  const { featuredProject: FEATURED_PROJECT, extraProjects: EXTRA_PROJECTS } = usePortfolio();

  return (
    <section className="section" id="projects">
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
            <Code size={15} />
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
          Engineered <span className="gradient-text">Solutions.</span>
        </motion.h2>

        <motion.p
          custom={2}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="section-subtitle"
          style={{ marginBottom: '2.5rem' }}
        >
          Production software, computer vision architectures, and embedded IoT systems built for real-world impact.
        </motion.p>

        {/* ─── Featured Project Card ─── */}
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
            overflow: 'hidden',
            background: '#FFFFFF',
          }}
        >
          <div className="featured-project-grid">
            {/* Left Image */}
            <div className="featured-project-image-col">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  minHeight: '260px',
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
                    }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : null}

                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                    color: '#B45309',
                    fontWeight: 800,
                  }}
                >
                  <Trophy size={13} />
                  <span>NATIONAL INSPIRE AWARD</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="featured-project-content-col">
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
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {FEATURED_PROJECT.number} · FEATURED ARCHITECTURE
                </div>

                <ShareButton
                  title={FEATURED_PROJECT.name}
                  text={FEATURED_PROJECT.description}
                  url="https://ansab.pages.dev#project-smart-attendance"
                  image={FEATURED_PROJECT.image}
                  category={FEATURED_PROJECT.name}
                  variant="pill"
                  label="Share"
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                  fontWeight: 900,
                  marginBottom: '0.35rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                {FEATURED_PROJECT.name}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  color: 'var(--color-teal)',
                  marginBottom: '1rem',
                  fontWeight: 700,
                }}
              >
                {FEATURED_PROJECT.category}
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}
              >
                {FEATURED_PROJECT.description}
              </p>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {FEATURED_PROJECT.technologies.map((tech) => (
                  <span key={tech} className="tag-pill">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => onOpenProjectModal(FEATURED_PROJECT)}
                  className="btn btn-primary btn-sm"
                >
                  <span>Explore Architecture</span>
                  <ExternalLink size={14} />
                </button>

                {FEATURED_PROJECT.githubUrl && (
                  <a
                    href={FEATURED_PROJECT.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Extra Projects Grid (1 col mobile, 2 col tablet, 3 col desktop) ─── */}
        <div className="projects-grid">
          {EXTRA_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              custom={idx}
              variants={REVEAL_SCALE}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="glass-card"
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
                    marginBottom: '0.85rem',
                  }}
                >
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
                    {PROJECT_ICONS[project.id] ?? <Code size={18} style={{ color: 'var(--color-primary)' }} />}
                  </div>

                  <ShareButton
                    title={project.name}
                    text={project.description}
                    url="https://ansab.pages.dev#projects"
                    category={project.name}
                    variant="pill"
                    label="Share"
                  />
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {project.number}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  {project.name}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    marginBottom: '0.85rem',
                  }}
                >
                  {project.category}
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                  }}
                >
                  {project.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {project.technologies.map((t) => (
                    <span key={t} className="tag-pill" style={{ fontSize: '0.75rem' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(project)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <span>Details</span>
                    <ExternalLink size={13} />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.55rem', minWidth: '44px' }}
                      aria-label={`GitHub repository for ${project.name}`}
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
