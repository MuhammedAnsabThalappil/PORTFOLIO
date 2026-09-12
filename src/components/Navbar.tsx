import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenCommand: () => void;
}

// Static — defined outside the component so it is never recreated on re-render
// and the scroll useEffect never needs it in its dependency array.
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

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const sectionId of sections.reverse()) {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
              background: scrolled ? 'rgba(8, 12, 23, 0.85)' : 'rgba(12, 16, 29, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: scrolled ? '1px solid rgba(0, 240, 255, 0.18)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.6)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Logo */}
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
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--primary-cyan)',
                  boxShadow: '0 0 12px var(--primary-cyan)',
                }}
              />
              <span>
                ANSAB
              </span>
            </a>

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
                  <a
                    key={link.name}
                    href={link.href}
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
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Right Quick Action / Cmd+K Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={onOpenCommand}
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
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                style={{
                  display: 'none',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
                className="mobile-menu-btn"
                aria-label="Open menu"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 200,
              background: 'rgba(5, 7, 14, 0.95)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.2rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-cyan)' }} />
                <span>ANSAB</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#fff',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={18} style={{ color: 'var(--primary-cyan)' }} />
                </a>
              ))}
            </nav>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-cyan)', marginBottom: '0.4rem' }}>
                CORE PHILOSOPHY
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>“Skills create opportunities.”</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .cmd-k-text { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};
