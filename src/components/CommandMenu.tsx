import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Trophy, Briefcase, Code, User, Mail, Compass, Award, ExternalLink } from 'lucide-react';
import { SOCIALS } from '../data/portfolioData';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Static — defined outside the component to avoid recreation on every render.
const COMMAND_ITEMS = [
  { name: 'About Muhammed Ansab', section: '#about', icon: User, tag: 'Section' },
  { name: 'Visual Journey Roadmap', section: '#journey', icon: Compass, tag: 'Section' },
  { name: 'CONVERGE 2026 1st Prize Winner', section: '#achievement', icon: Trophy, tag: 'Highlight' },
  { name: 'Smart Attendance System (ML)', section: '#projects', icon: Code, tag: 'Project' },
  { name: 'Motherbits Technologies LLP', section: '#entrepreneurship', icon: Briefcase, tag: 'Business' },
  { name: 'King Day Kids E-Commerce', section: '#entrepreneurship', icon: Briefcase, tag: 'Business' },
  { name: 'Zoltiq International Trade', section: '#entrepreneurship', icon: Briefcase, tag: 'Business' },
  { name: 'Cyra Learnings Internship', section: '#experience', icon: Award, tag: 'Experience' },
  { name: 'Technical Toolkit & Skills', section: '#skills', icon: Code, tag: 'Section' },
  { name: 'Contact & Collaboration', section: '#contact', icon: Mail, tag: 'Section' },
  { name: 'LinkedIn Profile', url: SOCIALS.linkedin, icon: ExternalLink, tag: 'Social' },
  { name: 'Send Direct Email', url: SOCIALS.email, icon: Mail, tag: 'Action' },
] as const;

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Cmd+K toggle is handled in App.tsx — only Escape is handled locally.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query when menu closes
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const filteredItems = COMMAND_ITEMS.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="command-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 300,
            background: 'rgba(3, 5, 12, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <motion.div
            key="command-panel"
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '640px',
              background: 'rgba(12, 16, 29, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '20px',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15)',
              overflow: 'hidden',
            }}
          >
            {/* Search Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <Search size={20} style={{ color: 'var(--primary-cyan)' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, projects, ventures..."
                autoFocus
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: 'var(--text-muted)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
              {filteredItems.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const IconComponent = item.icon;
                  const href = 'section' in item ? item.section : item.url;
                  const isExternal = 'url' in item;
                  return (
                    <a
                      key={idx}
                      href={href}
                      target={isExternal ? '_blank' : '_self'}
                      rel={isExternal ? 'noopener noreferrer' : ''}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        color: '#ffffff',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                        marginBottom: '0.25rem',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary-cyan)',
                          }}
                        >
                          <IconComponent size={16} />
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.name}</span>
                      </div>

                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.tag}
                      </span>
                    </a>
                  );
                })
              )}
            </div>

            <div
              style={{
                padding: '0.65rem 1.25rem',
                background: 'rgba(0, 0, 0, 0.2)',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>Tip: Press ESC to close</span>
              <span>Raycast Navigation</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
