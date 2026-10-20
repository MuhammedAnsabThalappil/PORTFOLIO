import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Command, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenCommand: () => void;
}

// Static — defined outside the component so it is never recreated on re-render
const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#journey' },
  { name: 'Achievements', href: '#achievement' },
  { name: 'Projects', href: '#projects' },
  { name: 'Business', href: '#entrepreneurship' },
  { name: 'Experience', href: '#experience' },
  { name: 'Toolkit', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const drawerVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const linkItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] },
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
              padding: '0.6rem 1.25rem',
              borderRadius: '16px',
              background: scrolled ? 'rgba(8, 12, 23, 0.88)' : 'rgba(12, 16, 29, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: scrolled ? '1px solid rgba(0, 240, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.6)' : 'none',
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
                gap: '0.6rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.2rem',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              <motion.div
                animate={{ boxShadow: ['0 0 12px var(--primary-cyan)', '0 0 24px var(--primary-cyan)', '0 0 12px var(--primary-cyan)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--primary-cyan)',
                }}
              />
              <span>ANSAB</span>
            </motion.a>

            {/* Desktop Navigation Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.3rem 0.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
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
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      background: isActive ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                      border: isActive ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid transparent',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <motion.button
                onClick={onOpenCommand}
                whileHover={{ scale: 1.03, borderColor: 'rgba(0,240,255,0.3)' }}
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
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                className="cmd-k-btn"
                title="Open Command Palette (Cmd+K)"
              >
                <Command size={14} style={{ color: 'var(--primary-cyan)' }} />
                <span className="cmd-k-text">Cmd+K</span>
              </motion.button>

              {/* Mobile Hamburger */}
              <motion.button
                onClick={() => setMobileDrawerOpen(true)}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="mobile-menu-btn"
                aria-label="Open menu"
                aria-expanded={mobileDrawerOpen}
              >
                <motion.div
                  animate={mobileDrawerOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Menu size={22} />
                </motion.div>
              </motion.button>
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
                background: 'rgba(5, 7, 14, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* Drawer panel */}
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
                width: 'min(320px, 85vw)',
                zIndex: 200,
                background: 'rgba(8, 12, 23, 0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(0, 240, 255, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                overflowY: 'auto',
              }}
            >
              {/* Drawer header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.2rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-cyan)', boxShadow: '0 0 12px var(--primary-cyan)' }} />
                  <span>ANSAB</span>
                </div>
                <motion.button
                  onClick={closeDrawer}
                  whileHover={{ rotate: 90, background: 'rgba(0,240,255,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Staggered nav links */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    custom={i}
                    variants={linkItemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={closeDrawer}
                    whileHover={{ x: 4, background: 'rgba(0,240,255,0.07)', borderColor: 'rgba(0,240,255,0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.15rem',
                      borderRadius: '12px',
                      background: activeSection === link.href.substring(1)
                        ? 'rgba(0, 240, 255, 0.08)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: activeSection === link.href.substring(1)
                        ? '1px solid rgba(0, 240, 255, 0.2)'
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      color: activeSection === link.href.substring(1) ? '#ffffff' : 'var(--text-muted)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'background 0.2s ease, border-color 0.2s ease',
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      size={16}
                      style={{
                        color: activeSection === link.href.substring(1)
                          ? 'var(--primary-cyan)'
                          : 'var(--text-dim)',
                      }}
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Footer quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-cyan)', marginBottom: '0.35rem', letterSpacing: '0.08em' }}>
                  CORE PHILOSOPHY
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"Skills create opportunities."</div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
