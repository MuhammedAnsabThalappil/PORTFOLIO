import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp, Share2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ShareButton } from './ShareButton';
import { REVEAL, VIEWPORT } from '../hooks/useReveal';

export const Footer: React.FC = () => {
  const { profile: PROFILE, socials: SOCIALS, websiteSettings } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replayIntro = () => {
    sessionStorage.removeItem('ansab_editorial_intro_seen');
    window.location.reload();
  };

  return (
    <motion.footer
      custom={0}
      variants={REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{
        padding: 'clamp(3rem, 6vw, 4.5rem) 0 2.5rem 0',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Top Colophon Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ maxWidth: '520px', minWidth: 0 }}>
            <div
              className="footer-name"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
                letterSpacing: '-0.02em',
              }}
            >
              {PROFILE.fullName.toUpperCase()}
            </div>

            <div
              style={{
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '0.65rem',
                letterSpacing: '0.04em',
              }}
            >
              AI &amp; DATA SCIENCE SCHOLAR · SOFTWARE ENGINEER · FOUNDER
            </div>

            <div style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              "{PROFILE.brandLine}"
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600 }}>
              CONNECT &amp; EXPLORE
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { href: SOCIALS.linkedin, label: 'LinkedIn' },
                { href: SOCIALS.github, label: 'GitHub' },
                { href: SOCIALS.email, label: 'Email' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ color: 'var(--accent-primary)', y: -2 }}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    transition: 'color 0.2s ease',
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <ShareButton
                title="Muhammed Ansab — Building Ideas Into Reality"
                text="Official portfolio of Muhammed Ansab Thalappil — AI & Data Science Student, Developer, Entrepreneur & 1st Prize Winner at CONVERGE 2026."
                url="/"
                image="/assets/ansab.jpeg"
                variant="pill"
                label="SHARE SITE"
              />
            </div>

            {/* Back to top + Replay Intro */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={scrollToTop}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: '0.4rem 0',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <ArrowUp size={14} />
                <span>BACK TO TOP</span>
              </button>

              <span style={{ color: 'var(--border-color)' }}>·</span>

              <button
                onClick={replayIntro}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: '0.4rem 0',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Sparkles size={14} />
                <span>REPLAY CINEMATIC INTRO</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div
          className="footer-bottom"
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span>
            {websiteSettings?.footerText || `© ${new Date().getFullYear()} Muhammed Ansab Thalappil. All rights reserved.`}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Architected with React, TypeScript &amp; Cloudflare</span>
            <Link
              to="/admin"
              style={{
                color: 'var(--accent-primary)',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                background: 'rgba(91, 75, 255, 0.06)',
                border: '1px solid var(--border-color)',
                minHeight: '36px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(91, 75, 255, 0.12)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(91, 75, 255, 0.06)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              ⚡ Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
