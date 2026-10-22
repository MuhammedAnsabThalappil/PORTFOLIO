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
      : '/');

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
            background: 'var(--bg-card, #161A24)',
            border: '1px solid var(--border-color, #2A3140)',
            color: 'var(--text-muted, #7E899D)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            ...style,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary, #7C6CFF)';
            e.currentTarget.style.borderColor = 'var(--accent-primary, #7C6CFF)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted, #7E899D)';
            e.currentTarget.style.borderColor = 'var(--border-color, #2A3140)';
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
            background: 'rgba(124, 108, 255, 0.12)',
            border: '1px solid rgba(124, 108, 255, 0.3)',
            color: 'var(--accent-primary, #7C6CFF)',
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
          background: 'var(--bg-elevated, #1C2230)',
          border: '1px solid var(--border-color, #2A3140)',
          color: 'var(--text-primary, #F5F7FF)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.04em',
          transition: 'all 0.2s ease',
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary, #7C6CFF)';
          e.currentTarget.style.color = 'var(--accent-hover, #9387FF)';
          e.currentTarget.style.background = 'rgba(124, 108, 255, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color, #2A3140)';
          e.currentTarget.style.color = 'var(--text-primary, #F5F7FF)';
          e.currentTarget.style.background = 'var(--bg-elevated, #1C2230)';
        }}
      >
        <Share2 size={14} />
        <span>{label}</span>
      </motion.button>
      <ShareModal isOpen={modalOpen} onClose={() => setModalOpen(false)} data={sharePayload} />
    </>
  );
};
