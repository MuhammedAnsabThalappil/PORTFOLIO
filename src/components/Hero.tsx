import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Github, Mail, Trophy, Briefcase, Clock, Bot, MapPin, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShareButton } from './ShareButton';

const HERO_STAGGER: import('framer-motion').Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const HERO_ITEM: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export const Hero: React.FC = () => {
  const { profile: PROFILE, socials: SOCIALS } = usePortfolio();
  const [istTime, setIstTime] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <Trophy size={18} style={{ color: 'var(--color-amber)' }} />, value: '1ST PRIZE', label: 'CONVERGE 2026' },
    { icon: <Briefcase size={18} style={{ color: 'var(--color-primary)' }} />, value: '3 VENTURES', label: 'Motherbits & More' },
    { icon: <Clock size={18} style={{ color: 'var(--color-teal)' }} />, value: '7 MONTHS', label: 'Flutter Intern' },
    { icon: <Bot size={18} style={{ color: 'var(--color-coral)' }} />, value: 'AI & ML', label: 'B.Tech Scholar' },
  ];

  return (
    <section className="section" id="hero" style={{ paddingTop: 'clamp(5.5rem, 9vw, 8rem)', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Main Grid: 2 columns on desktop, 1 column stacked on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hero-main-grid"
        >
          {/* Text & Narrative Column */}
          <motion.div
            variants={HERO_STAGGER}
            initial="hidden"
            animate="visible"
            style={{ gridColumn: 'span 7' }}
            className="col-span-7"
          >
            {/* Status & Location Pill */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.6rem 0.85rem',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'var(--color-primary-subtle)',
                  border: '1px solid var(--color-primary-border)',
                  color: 'var(--color-primary)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-teal)',
                    boxShadow: '0 0 8px rgba(0, 191, 166, 0.6)',
                  }}
                />
                <span>AVAILABLE FOR VENTURES &amp; INNOVATION</span>
              </div>

              {istTime && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
                  <span>KERALA · {istTime}</span>
                </div>
              )}
            </motion.div>

            {/* Full Name Headline */}
            <motion.h1
              variants={HERO_ITEM}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.1rem, 5.2vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              {PROFILE.fullName}
            </motion.h1>

            {/* Core Brand Line */}
            <motion.div
              variants={HERO_ITEM}
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.35rem, 3.2vw, 2.1rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              Building Ideas Into Reality.
            </motion.div>

            {/* Role Tags */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.5rem 0.75rem',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ color: 'var(--color-primary)' }}>AI &amp; DATA SCIENCE STUDENT</span>
              <span style={{ color: 'var(--border-strong)' }}>•</span>
              <span style={{ color: 'var(--color-teal)' }}>SOFTWARE DEVELOPER</span>
              <span style={{ color: 'var(--border-strong)' }}>•</span>
              <span style={{ color: 'var(--color-coral)' }}>ENTREPRENEUR</span>
            </motion.div>

            {/* Short Professional Introduction */}
            <motion.p
              variants={HERO_ITEM}
              style={{
                fontSize: 'clamp(0.98rem, 1.8vw, 1.08rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1.85rem',
                maxWidth: '600px',
              }}
            >
              I am an AI &amp; Data Science scholar, programmer, and entrepreneur passionate about transforming innovative ideas into tangible real-world solutions. From engineering production software to co-founding ventures like <strong>Motherbits Technologies LLP</strong>, my journey is driven by one core philosophy: <em>skills create opportunities</em>.
            </motion.p>

            {/* Action Buttons: Stack cleanly on mobile, side-by-side on desktop */}
            <motion.div
              variants={HERO_ITEM}
              className="btn-mobile-stack"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '2rem',
                alignItems: 'center',
              }}
            >
              <a
                href="#projects"
                className="btn btn-primary"
                style={{ minHeight: '48px', padding: '0.75rem 1.65rem' }}
              >
                <span>Explore My Work</span>
                <ArrowRight size={17} />
              </a>

              <a
                href="#contact"
                className="btn btn-secondary"
                style={{ minHeight: '48px', padding: '0.75rem 1.65rem' }}
              >
                <span>Let's Connect</span>
              </a>

              <ShareButton
                title="Muhammed Ansab — Building Ideas Into Reality"
                text="Explore the personal portfolio of Muhammed Ansab Thalappil: AI & Data Science Student, Developer, Entrepreneur & 1st Prize Winner at CONVERGE 2026."
                url="https://ansab.pages.dev"
                image="/assets/ansab.jpeg"
                category="PORTFOLIO"
                variant="button"
                label="Share Profile"
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { href: SOCIALS.linkedin, icon: <Linkedin size={15} style={{ color: '#0A66C2' }} />, label: 'LinkedIn' },
                { href: SOCIALS.github, icon: <Github size={15} style={{ color: 'var(--text-primary)' }} />, label: 'GitHub' },
                { href: SOCIALS.email, icon: <Mail size={15} style={{ color: 'var(--color-primary)' }} />, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="tag-pill"
                  style={{
                    display: 'inline-flex',
                    gap: '0.45rem',
                    textDecoration: 'none',
                    minHeight: '38px',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Photograph Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: 'span 5' }}
            className="col-span-5 hero-profile-col"
          >
            <div
              className="hero-profile-frame"
              style={{
                position: 'relative',
                borderRadius: '24px',
                padding: '6px',
                background: 'linear-gradient(135deg, rgba(91, 75, 255, 0.25), rgba(0, 191, 166, 0.2), #FFFFFF)',
                boxShadow: 'var(--shadow-elevated)',
                maxWidth: '340px',
                width: '100%',
                margin: '0 auto',
              }}
            >
              {/* Top Verified Identity Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '12px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    background: 'var(--color-primary-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>
                    AI ENGINEER
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    Founder • Motherbits
                  </div>
                </div>
              </div>

              {/* Portrait Image Frame */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  background: '#EEECF9',
                }}
              >
                <img
                  src="/assets/ansab.jpeg"
                  alt="Muhammed Ansab Thalappil"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                  }}
                />

                {/* Subtle bottom gradient for readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(25, 26, 44, 0.65) 0%, transparent 40%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Bottom Overlay Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    right: '10px',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      Muhammed Ansab
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                      KMCT AI &amp; Data Science
                    </div>
                  </div>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--color-teal-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-teal)',
                    }}
                  >
                    <Sparkles size={13} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Key Highlights Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
            marginTop: '3.5rem',
          }}
          className="hero-stats-grid"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card hero-stat-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--border-color)',
                }}
              >
                {stat.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
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
