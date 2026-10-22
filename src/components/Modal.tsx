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
            background: 'rgba(5, 7, 12, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
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
              maxWidth: '640px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg-card, #161A24)',
              border: '1px solid var(--border-color, #2A3140)',
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 5vw, 2.25rem)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-elevated, #1C2230)',
                border: '1px solid var(--border-color, #2A3140)',
                color: 'var(--text-secondary, #A7B0C0)',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary, #F5F7FF)';
                e.currentTarget.style.borderColor = 'var(--border-strong, #3D465A)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary, #A7B0C0)';
                e.currentTarget.style.borderColor = 'var(--border-color, #2A3140)';
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-primary)',
                fontWeight: 700,
                marginBottom: '0.5rem',
                letterSpacing: '0.04em',
              }}
            >
              {isProject
                ? `${(data as Project).number} · PROJECT DETAILS`
                : `${(data as Business).number} · ${(data as Business).role}`}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                marginBottom: '0.35rem',
                letterSpacing: '-0.02em',
                paddingRight: '2.5rem',
              }}
            >
              {data.name}
            </h3>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                color: 'var(--accent-secondary)',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              {data.category}
            </div>

            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
              }}
            >
              {data.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
              {isProject && (data as Project).technologies.map((t, idx) => (
                <span key={idx} className="tag-pill">
                  {t}
                </span>
              ))}
              {isBusiness && (data as Business).tags.map((t, idx) => (
                <span key={idx} className="tag-pill" style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {isProject && (data as Project).githubUrl && (
                <a
                  href={(data as Project).githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ minHeight: '44px' }}
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
                  style={{ minHeight: '44px' }}
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
                  style={{ minHeight: '44px' }}
                >
                  <Instagram size={16} />
                  <span>INSTAGRAM</span>
                </a>
              )}

              <button onClick={onClose} className="btn btn-secondary" style={{ minHeight: '44px' }}>
                <span>CLOSE</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
