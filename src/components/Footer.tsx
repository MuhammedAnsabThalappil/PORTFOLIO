import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, VIEWPORT } from '../hooks/useReveal';

export const Footer: React.FC = () => {
  const { profile: PROFILE, socials: SOCIALS, websiteSettings } = usePortfolio();

  return (
    <motion.footer
      custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}
      style={{ padding: '4.5rem 0 2.5rem 0', borderTop: '1px solid var(--border-color)', background: 'rgba(5,7,14,0.97)' }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <div className="footer-name" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem,4vw,1.6rem)', fontWeight: 900, color: '#ffffff', marginBottom: '0.35rem', wordBreak: 'break-word' }}>
              {PROFILE.fullName.toUpperCase()}
            </div>
            <div style={{ color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              AI &amp; DATA SCIENCE STUDENT · DEVELOPER · ENTREPRENEUR
            </div>
            <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              "{PROFILE.brandLine}"
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { href: SOCIALS.linkedin, label: 'LinkedIn' },
              { href: SOCIALS.github,   label: 'GitHub' },
              { href: SOCIALS.email,    label: 'Email' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ color: 'var(--primary-cyan)', y: -2 }}
                style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-heading)', fontWeight: 600, transition: 'color 0.2s ease' }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-bottom" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
          <span>{websiteSettings?.footerText || `© ${new Date().getFullYear()} Muhammed Ansab Thalappil. All rights reserved.`}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Crafted with React, TypeScript &amp; Framer Motion</span>
            <Link to="/admin" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.75rem' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-cyan)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>
              ⚡ Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

