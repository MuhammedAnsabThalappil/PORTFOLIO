import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Linkedin, Github, Mail, Trophy, Briefcase, Clock, Bot } from 'lucide-react';
import { PROFILE, SOCIALS } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const stats = [
    { icon: <Trophy size={18} style={{ color: '#f59e0b' }} />, value: '2', label: 'Awards' },
    { icon: <Briefcase size={18} style={{ color: 'var(--primary-cyan)' }} />, value: '3', label: 'Businesses' },
    { icon: <Clock size={18} style={{ color: 'var(--secondary-violet)' }} />, value: '7 Mo', label: 'Experience' },
    { icon: <Bot size={18} style={{ color: 'var(--accent-emerald)' }} />, value: '4', label: 'AI Projects' },
  ];

  return (
    <section className="section" id="hero" style={{ paddingTop: '8rem', paddingBottom: '3.5rem' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hero-main-grid"
        >
          {/* Main Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 7' }}
            className="col-span-7"
          >
            {/* Top Tagline */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                color: 'var(--primary-cyan)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              <Sparkles size={14} />
              <span>AI × CODE × BUSINESS</span>
            </div>

            {/* Name & Core Brand */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '0.5rem',
                color: '#ffffff',
              }}
            >
              {PROFILE.fullName.toUpperCase()}
            </h1>

            <div
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.35rem)',
                fontWeight: 800,
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}
            >
              {PROFILE.coreBrand}
            </div>

            {/* Professional Roles */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.6rem 0.85rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ color: 'var(--primary-cyan)', fontWeight: 600 }}>AI & DATA SCIENCE STUDENT</span>
              <span>·</span>
              <span>DEVELOPER</span>
              <span>·</span>
              <span style={{ color: 'var(--secondary-violet)', fontWeight: 600 }}>ENTREPRENEUR</span>
            </div>

            {/* Quote Statement */}
            <blockquote
              style={{
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--text-main)',
                borderLeft: '3px solid var(--primary-cyan)',
                paddingLeft: '1rem',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              "{PROFILE.heroStatement}"
            </blockquote>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '600px' }}>
              I'm Muhammed Ansab, an AI & Data Science student, programmer and entrepreneur passionate about turning ideas into impact through code, innovation, and practical ventures.
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn btn-primary">
                <span>EXPLORE MY WORK</span>
                <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span>LET'S CONNECT</span>
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-pill"
                style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}
              >
                <Linkedin size={14} style={{ color: 'var(--primary-cyan)' }} />
                <span>LinkedIn</span>
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tag-pill"
                style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}
              >
                <Github size={14} style={{ color: 'var(--secondary-violet)' }} />
                <span>GitHub</span>
              </a>
              <a
                href={SOCIALS.email}
                className="tag-pill"
                style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}
              >
                <Mail size={14} style={{ color: 'var(--accent-emerald)' }} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>

          {/* Profile Visual Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          style={{ gridColumn: 'span 5', position: 'relative' }}
            className="col-span-5 hero-profile-col"
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                padding: '10px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.22), rgba(139, 92, 246, 0.22))',
                boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 240, 255, 0.18)',
                maxWidth: '380px',
                marginLeft: 'auto',
              }}
            >
              {/* Professional Identity Badge — Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '16px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '14px',
                  background: 'rgba(9, 13, 26, 0.96)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(139,92,246,0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-cyan)',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-cyan)', letterSpacing: '0.04em' }}>
                    AI DEVELOPER
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
                    Founder • Entrepreneur
                  </div>
                </div>
              </div>

              {/* Profile Image Container — reduced ~18% via aspect ratio */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '3 / 4',
                  background: '#090d1a',
                }}
              >
                <img
                  src="/assets/profile.jpg"
                  alt="Muhammed Ansab Thalappil"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'contrast(1.05)',
                  }}
                />

                {/* Bottom Overlay Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    right: '14px',
                    padding: '0.75rem 1rem',
                    borderRadius: '14px',
                    background: 'rgba(9, 13, 26, 0.88)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '9px',
                      background: 'rgba(0, 240, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-cyan)',
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>
                      MUHAMMED ANSAB
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--primary-cyan)' }}>
                      Co-Founder @ Motherbits LLP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compact Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            marginTop: '3.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}
          className="hero-stats-grid"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card hero-stat-card"
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderColor: 'rgba(0, 240, 255, 0.12)',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1,
                    marginBottom: '0.2rem',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
