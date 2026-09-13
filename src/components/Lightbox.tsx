import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  caption: string;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, imgSrc, caption }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && imgSrc && (
        <motion.div
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
            zIndex: 500,
            background: 'rgba(3, 5, 12, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 510,
            }}
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(0, 240, 255, 0.2)',
              position: 'relative',
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

          {caption && (
            <div
              style={{
                marginTop: '1.25rem',
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-mono)',
                textAlign: 'center',
                maxWidth: '700px',
              }}
            >
              {caption}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
