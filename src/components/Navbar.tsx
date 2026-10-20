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
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const linkItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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

  // Lock body scroll when drawer open
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
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
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
              background: scrolled ? 'rgba(7, 8, 12, 0.92)' : 'rgba(14, 18, 28, 0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: scrolled ? '1px solid rgba(220, 248, 54, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.7)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.25rem',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              <div
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: 'var(--accent-aura)',
                  boxShadow: '0 0 10px var(--accent-aura)',
                }}
              />
              <span>ANSAB</span>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.3rem 0.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              className="desktop-nav"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ color: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      background: isActive ? 'rgba(220, 248, 54, 0.12)' : 'transparent',
                      border: isActive ? '1px solid rgba(220, 248, 54, 0.3)' : '1px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      display: 'block',
                    }}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* Quick Share Trigger */}
              <ShareButton
                title="Muhammed Ansab — Building Ideas Into Reality"
                text="Official portfolio of Muhammed Ansab Thalappil — AI & Data Science Student, Developer, Entrepreneur & 1st Prize Winner at CONVERGE 2026."
                url="https://ansab.pages.dev"
                image="/assets/ansab.jpeg"
                variant="icon"
                className="desktop-nav"
              />

              {/* Command Palette Button */}
              <motion.button
                onClick={onOpenCommand}
                whileHover={{ scale: 1.03, borderColor: 'rgba(220,248,54,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="cmd-k-btn"
                title="Open Command Palette (Cmd+K)"
              >
                <Command size={14} style={{ color: 'var(--accent-aura)' }} />
                <span className="cmd-k-text">Cmd+K</span>
              </motion.button>

              {/* Mobile Hamburger Button */}
              <motion.button
                onClick={() => setMobileDrawerOpen(true)}
                whileTap={{ scale: 0.92 }}
                style={{
                  display: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  padding: '0.55rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  minWidth: '44px',
                }}
                className="mobile-menu-btn"
                aria-label="Open mobile menu"
                aria-expanded={mobileDrawerOpen}
              >
                <Menu size={22} />
              </motion.button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
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
                background: 'rgba(7, 8, 12, 0.98)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderLeft: '1px solid rgba(220, 248, 54, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.75rem 1.5rem',
                overflowY: 'auto',
              }}
            >
              {/* Drawer header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.75rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.25rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-aura)', boxShadow: '0 0 10px var(--accent-aura)' }} />
                  <span>ANSAB</span>
                </div>
                <motion.button
                  onClick={closeDrawer}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    minHeight: '40px',
                  }}
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Staggered Navigation Links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    custom={i}
                    variants={linkItemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={closeDrawer}
                    whileHover={{ x: 4, background: 'rgba(220,248,54,0.08)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1.15rem',
                      borderRadius: '12px',
                      background: activeSection === link.href.substring(1)
                        ? 'rgba(220, 248, 54, 0.1)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: activeSection === link.href.substring(1)
                        ? '1px solid rgba(220, 248, 54, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      color: activeSection === link.href.substring(1) ? '#ffffff' : 'var(--text-muted)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      minHeight: '48px', // Touch-friendly
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      size={16}
                      style={{
                        color: activeSection === link.href.substring(1)
                          ? 'var(--accent-aura)'
                          : 'var(--text-dim)',
                      }}
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Drawer Share Button */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <ShareButton
                  title="Muhammed Ansab — Building Ideas Into Reality"
                  text="Check out the personal portfolio of Muhammed Ansab Thalappil (AI & Data Science Student, Developer, Entrepreneur)."
                  url="https://ansab.pages.dev"
                  image="/assets/ansab.jpeg"
                  variant="button"
                  label="SHARE PORTFOLIO"
                  style={{ width: '100%', justifyContent: 'center', minHeight: '48px' }}
                />

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-aura)', marginBottom: '0.2rem', letterSpacing: '0.08em' }}>
                    CORE PHILOSOPHY
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
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
