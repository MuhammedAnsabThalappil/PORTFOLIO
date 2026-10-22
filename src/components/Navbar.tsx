import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Command, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface NavbarProps {
  onOpenCommand: () => void;
}

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#journey' },
  { name: 'Achievements', href: '#achievement' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Projects', href: '#projects' },
  { name: 'Ventures', href: '#entrepreneurship' },
  { name: 'Experience', href: '#experience' },
  { name: 'Toolkit', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const drawerVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const linkItemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileDrawerOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileDrawerOpen]);

  const closeDrawer = () => setMobileDrawerOpen(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.65rem 0' : '1.15rem 0',
          transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container">
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1.25rem',
              borderRadius: '16px',
              background: scrolled ? 'rgba(17, 20, 28, 0.92)' : 'rgba(22, 26, 36, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--border-color, #2A3140)',
              boxShadow: scrolled
                ? '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 4px 18px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Brand Logo */}
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: 'var(--accent-primary, #7C6CFF)',
                  boxShadow: '0 0 12px rgba(124, 108, 255, 0.6)',
                }}
              />
              <span>ANSAB</span>
            </a>

            {/* Desktop Navigation Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'var(--bg-primary, #0B0D12)',
                padding: '0.3rem 0.45rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color, #2A3140)',
              }}
              className="desktop-nav"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: isActive ? 'var(--accent-primary, #7C6CFF)' : 'var(--text-secondary, #A7B0C0)',
                      background: isActive ? 'var(--bg-elevated, #1C2230)' : 'transparent',
                      boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      display: 'block',
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* Quick Share Trigger */}
              <ShareButton
                title="Muhammed Ansab — Building Ideas Into Reality"
                text="Official portfolio of Muhammed Ansab Thalappil — AI & Data Science Student, Developer, Entrepreneur & 1st Prize Winner at CONVERGE 2026."
                url="/"
                image="/assets/ansab.jpeg"
                variant="icon"
                className="desktop-nav"
              />

              {/* Command Palette Button */}
              <button
                type="button"
                onClick={onOpenCommand}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '10px',
                  background: 'var(--bg-primary, #0B0D12)',
                  border: '1px solid var(--border-color, #2A3140)',
                  color: 'var(--text-secondary, #A7B0C0)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  minHeight: '44px',
                  transition: 'all 0.2s ease',
                }}
                className="cmd-k-btn"
                title="Open Command Palette (Cmd+K)"
              >
                <Command size={14} style={{ color: 'var(--accent-primary, #7C6CFF)' }} />
                <span>Cmd+K</span>
              </button>

              {/* Mobile Hamburger Button (Min 44px x 44px touch target) */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                style={{
                  display: 'none',
                  background: 'var(--bg-card, #161A24)',
                  border: '1px solid var(--border-color, #2A3140)',
                  color: 'var(--text-primary, #F5F7FF)',
                  padding: '0.55rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  minWidth: '44px',
                  boxShadow: 'var(--shadow-sm)',
                }}
                className="mobile-menu-btn"
                aria-label="Open mobile menu"
                aria-expanded={mobileDrawerOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeDrawer}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 199,
                background: 'rgba(5, 7, 12, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer-panel"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(330px, 86vw)',
                zIndex: 200,
                background: 'var(--bg-secondary, #11141C)',
                boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.7)',
                borderLeft: '1px solid var(--border-color, #2A3140)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.75rem 1.5rem',
                overflowY: 'auto',
              }}
            >
              {/* Header with Title and Close Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-color, #2A3140)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary, #F5F7FF)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary, #7C6CFF)' }} />
                  <span>ANSAB</span>
                </div>

                <button
                  type="button"
                  onClick={closeDrawer}
                  style={{
                    background: 'var(--bg-card, #161A24)',
                    border: '1px solid var(--border-color, #2A3140)',
                    color: 'var(--text-primary, #F5F7FF)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '44px',
                    minHeight: '44px',
                  }}
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links with Min 48px Touch Height */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      custom={i}
                      variants={linkItemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={closeDrawer}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.15rem',
                        borderRadius: '12px',
                        background: isActive ? 'rgba(124, 108, 255, 0.12)' : 'transparent',
                        border: isActive ? '1px solid rgba(124, 108, 255, 0.3)' : '1px solid transparent',
                        color: isActive ? 'var(--accent-primary, #7C6CFF)' : 'var(--text-primary, #F5F7FF)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        minHeight: '48px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{link.name}</span>
                      <ChevronRight
                        size={16}
                        style={{
                          color: isActive ? 'var(--accent-primary, #7C6CFF)' : 'var(--text-muted, #7E899D)',
                        }}
                      />
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom Share Action */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color, #2A3140)' }}>
                <ShareButton
                  title="Muhammed Ansab — Building Ideas Into Reality"
                  text="Explore the personal portfolio of Muhammed Ansab Thalappil (AI & Data Science Student, Developer, Entrepreneur)."
                  url="/"
                  image="/assets/ansab.jpeg"
                  variant="button"
                  label="Share Portfolio"
                  style={{ width: '100%', justifyContent: 'center', minHeight: '48px' }}
                />

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '0.04em' }}>
                    CORE PHILOSOPHY
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                    "Skills create opportunities."
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
