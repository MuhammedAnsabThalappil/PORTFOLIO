import React from 'react';
import { PROFILE, SOCIALS } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: '4.5rem 0 2.5rem 0',
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(5, 7, 14, 0.95)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <div
              className="footer-name"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '0.35rem',
                wordBreak: 'break-word',
              }}
            >
              MUHAMMED ANSAB THALAPPIL
            </div>
            <div
              style={{
                color: 'var(--primary-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              AI & DATA SCIENCE STUDENT · DEVELOPER · ENTREPRENEUR
            </div>
            <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              “{PROFILE.brandLine}”
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              LinkedIn
            </a>

            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              GitHub
            </a>

            <a
              href={SOCIALS.email}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Email
            </a>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
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
          <span>© {new Date().getFullYear()} Muhammed Ansab Thalappil. All rights reserved.</span>
          <span>Crafted with React, TypeScript & Framer Motion</span>
        </div>
      </div>
    </footer>
  );
};
