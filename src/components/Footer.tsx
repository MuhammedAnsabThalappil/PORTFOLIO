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
        padding: '5rem 0 3rem 0',
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(7, 8, 12, 0.98)',
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
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <div
              className="footer-name"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '0.4rem',
                letterSpacing: '-0.02em',
              }}
            >
              {PROFILE.fullName.toUpperCase()}
            </div>

            <div
              style={{
                color: 'var(--accent-aura)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '0.65rem',
                letterSpacing: '0.04em',
              }}
            >
              AI &amp; DATA SCIENCE SCHOLAR · SOFTWARE ENGINEER · FOUNDER
            </div>

            <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              "{PROFILE.brandLine}"
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
              CONNECT &amp; EXPLORE
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
                  whileHover={{ color: 'var(--accent-aura)', y: -2 }}
                  style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <ShareButton
                title="Muhammed Ansab — Building Ideas Into Reality"
                text="Official portfolio of Muhammed Ansab Thalappil — AI & Data Science Student, Developer, Entrepreneur & 1st Prize Winner at CONVERGE 2026."
                url="https://ansab.pages.dev"
                image="/assets/ansab.jpeg"
                variant="pill"
                label="SHARE SITE"
              />
            </div>

            {/* Back to top + Replay Intro */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                onClick={scrollToTop}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                <ArrowUp size={13} />
                <span>BACK TO TOP</span>
              </button>

              <span style={{ color: 'rgba(255, 255, 255, 0.1)' }}>·</span>

              <button
                onClick={replayIntro}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-aura)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                <Sparkles size={12} />
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
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
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
                color: 'var(--text-dim)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-aura)';
                e.currentTarget.style.borderColor = 'rgba(220, 248, 54, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-dim)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
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
