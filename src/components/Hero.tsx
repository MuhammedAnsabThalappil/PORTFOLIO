import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Linkedin, Github, Mail, Trophy, Briefcase, Clock, Bot, MapPin, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShareButton } from './ShareButton';

const HERO_STAGGER: import('framer-motion').Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const HERO_ITEM: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const Hero: React.FC = () => {
  const { profile: PROFILE, socials: SOCIALS } = usePortfolio();
  const [istTime, setIstTime] = useState('');

  // Live IST (Indian Standard Time) Clock
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
    { icon: <Trophy size={18} style={{ color: '#f59e0b' }} />, value: '1ST PRIZE', label: 'CONVERGE 2026' },
    { icon: <Briefcase size={18} style={{ color: 'var(--accent-aura)' }} />, value: '3 VENTURES', label: 'Motherbits & More' },
    { icon: <Clock size={18} style={{ color: '#3b82f6' }} />, value: '7 MONTHS', label: 'Flutter Trainee' },
    { icon: <Bot size={18} style={{ color: 'var(--accent-emerald)' }} />, value: 'AI & ML', label: 'B.Tech Scholar' },
  ];

  return (
    <section className="section" id="hero" style={{ paddingTop: 'clamp(5rem, 10vw, 7.5rem)', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Asymmetrical Editorial Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hero-main-grid"
        >
          {/* ── Main Text & Narrative Column (Span 7) ── */}
          <motion.div
            variants={HERO_STAGGER}
            initial="hidden"
            animate="visible"
            style={{ gridColumn: 'span 7' }}
            className="col-span-7"
          >
            {/* Editorial Status & Location Line */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.6rem 1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'rgba(220, 248, 54, 0.08)',
                  border: '1px solid rgba(220, 248, 54, 0.25)',
                  color: 'var(--accent-aura)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--accent-aura)',
                    boxShadow: '0 0 8px var(--accent-aura)',
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
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <MapPin size={12} style={{ color: 'var(--accent-aura)' }} />
                  <span>KERALA · {istTime}</span>
                </div>
              )}
            </motion.div>

            {/* Full Name Headline */}
            <motion.h1
              variants={HERO_ITEM}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5.8vw, 4.3rem)',
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                marginBottom: '0.4rem',
                color: '#ffffff',
              }}
            >
              {PROFILE.fullName.toUpperCase()}
            </motion.h1>

            {/* Core Brand Line */}
            <motion.div
              variants={HERO_ITEM}
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.35rem, 3.2vw, 2.1rem)',
                fontWeight: 800,
                marginBottom: '1.25rem',
                letterSpacing: '-0.015em',
              }}
            >
              {PROFILE.coreBrand}
            </motion.div>

            {/* Editorial Role Tags */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.6rem 0.85rem',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ color: 'var(--accent-aura)', fontWeight: 700 }}>AI &amp; DATA SCIENCE</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span>SOFTWARE DEVELOPER</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span style={{ color: '#3b82f6', fontWeight: 700 }}>ENTREPRENEUR</span>
            </motion.div>

            {/* Signature Quote */}
            <motion.blockquote
              variants={HERO_ITEM}
              style={{
                fontSize: 'clamp(1.02rem, 2.5vw, 1.15rem)',
                fontStyle: 'italic',
                color: '#f8fafc',
                borderLeft: '3px solid var(--accent-aura)',
                paddingLeft: '1.2rem',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                background: 'rgba(255, 255, 255, 0.015)',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '0 10px 10px 0',
              }}
            >
              "{PROFILE.heroStatement}"
            </motion.blockquote>

            {/* Description */}
            <motion.p
              variants={HERO_ITEM}
              style={{
                fontSize: '1.02rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                maxWidth: '620px',
              }}
            >
              I am Muhammed Ansab Thalappil, an AI &amp; Data Science student, programmer, and entrepreneur passionate about transforming ideas into tangible real-world solutions. From building production code to launching ventures like <strong>Motherbits Technologies LLP</strong>, my journey is driven by one belief: <em>skills create opportunities</em>.
            </motion.p>

            {/* CTA Buttons & Share Action */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '2.5rem',
                alignItems: 'center',
              }}
            >
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={17} />
              </motion.a>

              <motion.a
                href="#contact"
                className="btn btn-secondary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>LET'S CONNECT</span>
              </motion.a>

              {/* Dedicated Hero Share Button */}
              <ShareButton
                title="Muhammed Ansab — Building Ideas Into Reality"
                text="Explore the personal portfolio of Muhammed Ansab Thalappil: AI & Data Science Student, Developer, Entrepreneur & 1st Prize Winner at CONVERGE 2026."
                url="https://ansab.pages.dev"
                image="/assets/ansab.jpeg"
                category="PORTFOLIO"
                variant="button"
                label="SHARE PROFILE"
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={HERO_ITEM}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { href: SOCIALS.linkedin, icon: <Linkedin size={14} style={{ color: '#0a66c2' }} />, label: 'LinkedIn' },
                { href: SOCIALS.github, icon: <Github size={14} style={{ color: '#ffffff' }} />, label: 'GitHub' },
                { href: SOCIALS.email, icon: <Mail size={14} style={{ color: 'var(--accent-aura)' }} />, label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="tag-pill"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Real Portrait Photograph Visual Column (Span 5) ── */}
          {/* CRITICAL: Must be visible on mobile, tablet, and desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: 'span 5', position: 'relative' }}
            className="col-span-5 hero-profile-col"
          >
            <div
              className="hero-profile-float"
              style={{
                position: 'relative',
                borderRadius: '26px',
                padding: '8px',
                background: 'linear-gradient(135deg, rgba(220, 248, 54, 0.35), rgba(59, 130, 246, 0.25), rgba(255, 255, 255, 0.05))',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(220, 248, 54, 0.12)',
                maxWidth: '380px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {/* Top Verified Identity Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: '16px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '14px',
                  background: 'rgba(10, 13, 22, 0.96)',
                  border: '1px solid rgba(220, 248, 54, 0.4)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(220, 248, 54, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-aura)',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-aura)', letterSpacing: '0.04em' }}>
                    AI ENGINEER
                  </div>
                  <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>
                    Founder • Motherbits
                  </div>
                </div>
              </motion.div>

              {/* Portrait Image Frame */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '3 / 4',
                  background: '#0a0d16',
                }}
              >
                <img
                  src="/assets/ansab.jpeg"
                  alt="Muhammed Ansab Thalappil — AI Engineer and Entrepreneur"
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Gradient vignette overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 8, 12, 0.85) 0%, rgba(7, 8, 12, 0.1) 45%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Bottom Overlay Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    right: '12px',
                    padding: '0.75rem 1rem',
                    borderRadius: '14px',
                    background: 'rgba(10, 13, 22, 0.92)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '9px',
                        background: 'rgba(220, 248, 54, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-aura)',
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>
                        MUHAMMED ANSAB
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--accent-aura)', fontWeight: 600 }}>
                        KMCT AI &amp; Data Science
                      </div>
                    </div>
                  </div>

                  {/* Micro Share button right on the photo */}
                  <ShareButton
                    title="Muhammed Ansab Thalappil"
                    text="Muhammed Ansab — AI & Data Science Student, Developer, Entrepreneur & CONVERGE 2026 Winner."
                    url="https://ansab.pages.dev"
                    image="/assets/ansab.jpeg"
                    variant="icon"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Key Highlights Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '3.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
          }}
          className="hero-stats-grid"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, borderColor: 'rgba(220, 248, 54, 0.35)' }}
              className="glass-card hero-stat-card"
              style={{
                padding: '1.25rem 1.4rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
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
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    marginTop: '0.2rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
