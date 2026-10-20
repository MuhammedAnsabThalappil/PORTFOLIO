import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  caption: string;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, imgSrc, caption }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && imgSrc && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 500,
            background: 'rgba(3, 5, 12, 0.96)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          {/* Blur in backdrop */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            exit={{ backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90, background: 'rgba(0, 240, 255, 0.15)' }}
            whileTap={{ scale: 0.9 }}
            className="lightbox-close-btn"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 510,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close Lightbox"
          >
            <X size={22} />
          </motion.button>

          {/* Image container */}
          <motion.div
            key="lightbox-image"
            initial={{ scale: 0.82, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(0,0,0,0.85), 0 0 40px rgba(0, 240, 255, 0.18)',
              position: 'relative',
              zIndex: 501,
            }}
          >
            <img
              src={imgSrc}
              alt={caption || 'Enlarged photo view'}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Caption */}
          {caption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              style={{
                marginTop: '1.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                textAlign: 'center',
                maxWidth: '700px',
                position: 'relative',
                zIndex: 501,
              }}
            >
              {caption}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
