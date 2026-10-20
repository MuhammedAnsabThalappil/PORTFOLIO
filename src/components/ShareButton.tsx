import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { ShareModal, ShareData } from './ShareModal';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  image?: string;
  category?: string;
  variant?: 'button' | 'pill' | 'icon' | 'compact';
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  image,
  category,
  variant = 'button',
  label = 'SHARE',
  className = '',
  style = {},
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Compute canonical or current URL with hash anchor
  const resolvedUrl =
    url ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}${category ? '#' + category.toLowerCase().replace(/\s+/g, '-') : ''}`
      : 'https://ansab.pages.dev');

  const sharePayload: ShareData = {
    title,
    text,
    url: resolvedUrl,
    image,
    category,
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Check if running on mobile device with native Web Share API
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth <= 820;
    if (isMobileDevice && typeof navigator !== 'undefined' && typeof (navigator as any).share === 'function') {
      try {
        await (navigator as any).share({
          title,
          text,
          url: resolvedUrl,
        });
        return;
      } catch (err: any) {
        // If user cancelled, don't open modal; if failed, fall through to modal
        if (err.name === 'AbortError') return;
      }
    }

    setModalOpen(true);
  };

  // Render variant styles
  if (variant === 'icon') {
    return (
      <>
        <motion.button
          type="button"
          onClick={handleShareClick}
          aria-label={`Share ${title}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className={className}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: 'var(--text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            ...style,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-aura)';
            e.currentTarget.style.borderColor = 'rgba(220, 248, 54, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
        >
          <Share2 size={16} />
        </motion.button>
        <ShareModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={sharePayload} />
      </>
    );
  }

  if (variant === 'pill') {
    return (
      <>
        <motion.button
          type="button"
          onClick={handleShareClick}
          aria-label={`Share ${title}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`editorial-pill ${className}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            background: 'rgba(220, 248, 54, 0.08)',
            border: '1px solid rgba(220, 248, 54, 0.25)',
            color: 'var(--accent-aura)',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            cursor: 'pointer',
            ...style,
          }}
        >
          <Share2 size={12} />
          <span>{label}</span>
        </motion.button>
        <ShareModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={sharePayload} />
      </>
    );
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={handleShareClick}
        aria-label={`Share ${title}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`share-btn-editorial ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.55rem 1rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.04em',
          transition: 'all 0.2s ease',
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-aura)';
          e.currentTarget.style.color = 'var(--accent-aura)';
          e.currentTarget.style.background = 'rgba(220, 248, 54, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
      >
        <Share2 size={14} />
        <span>{label}</span>
      </motion.button>
      <ShareModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={sharePayload} />
    </>
  );
};
