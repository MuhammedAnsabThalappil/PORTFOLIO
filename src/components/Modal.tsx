import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, Instagram } from 'lucide-react';
import { Project, Business } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Project | Business | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isProject = data ? 'technologies' in data : false;
  const isBusiness = data ? 'role' in data : false;

  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          key="modal-backdrop"
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
            zIndex: 400,
            background: 'rgba(3, 5, 12, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            key="modal-panel"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '680px',
              background: 'rgba(12, 16, 29, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '24px',
              padding: '2.25rem',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#ffffff',
                padding: '0.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--primary-cyan)',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              {isProject
                ? `${(data as Project).number} · PROJECT DETAILS`
                : `${(data as Business).number} · ${(data as Business).role}`}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '0.35rem',
              }}
            >
              {data.name}
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--secondary-violet)',
                marginBottom: '1.5rem',
              }}
            >
              {data.category}
            </div>

            <p
              style={{
                fontSize: '1.025rem',
                lineHeight: 1.75,
                color: 'var(--text-muted)',
                marginBottom: '2rem',
              }}
            >
              {data.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
              {isProject && (data as Project).technologies.map((t, idx) => (
                <span key={idx} className="tag-pill">
                  {t}
                </span>
              ))}
              {isBusiness && (data as Business).tags.map((t, idx) => (
                <span key={idx} className="tag-pill" style={{ borderColor: 'var(--primary-cyan)', color: 'var(--primary-cyan)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {isProject && (data as Project).githubUrl && (
                <a
                  href={(data as Project).githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>VIEW REPOSITORY</span>
                  <ExternalLink size={16} />
                </a>
              )}

              {isBusiness && (data as Business).website && (
                <a
                  href={(data as Business).website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Globe size={16} />
                  <span>OFFICIAL WEBSITE</span>
                </a>
              )}

              {isBusiness && (data as Business).instagram && (
                <a
                  href={(data as Business).instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Instagram size={16} />
                  <span>INSTAGRAM</span>
                </a>
              )}

              <button onClick={onClose} className="btn btn-secondary">
                <span>CLOSE</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
