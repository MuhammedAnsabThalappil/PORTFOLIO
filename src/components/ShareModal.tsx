import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, X, MessageSquare, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export interface ShareData {
  title: string;
  text: string;
  url: string;
  image?: string;
  category?: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data || typeof document === 'undefined') return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is blocked
      const input = document.createElement('input');
      input.value = data.url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    const message = `${data.title}\n\n${data.text}\n\n${data.url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const text = `${data.title} — ${data.text}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.url)}`, '_blank', 'noopener,noreferrer');
  };

  return createPortal(
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(25, 26, 44, 0.45)',
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem',
            boxShadow: '0 25px 60px rgba(25, 26, 44, 0.16), 0 0 40px rgba(91, 75, 255, 0.08)',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(91, 75, 255, 0.1)',
                  border: '1px solid rgba(91, 75, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                }}
              >
                <Share2 size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  SHARE THIS HIGHLIGHT
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {data.category || 'MUHAMMED ANSAB PORTFOLIO'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close share modal"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <X size={16} />
            </button>
          </div>

          {/* Preview Card */}
          <div
            style={{
              padding: '1rem',
              borderRadius: '14px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {data.image && (
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '1px solid var(--border-color)',
                }}
              />
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {data.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {data.text}
              </div>
            </div>
          </div>

          {/* Social Share Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button
              onClick={handleWhatsApp}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                background: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                color: '#1da851',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                minHeight: '44px',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageSquare size={20} />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleLinkedIn}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                background: 'rgba(10, 102, 194, 0.08)',
                border: '1px solid rgba(10, 102, 194, 0.25)',
                color: '#0a66c2',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                minHeight: '44px',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={handleTwitter}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem 0.5rem',
                borderRadius: '12px',
                background: 'rgba(29, 155, 240, 0.08)',
                border: '1px solid rgba(29, 155, 240, 0.25)',
                color: '#1d9bf0',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                minHeight: '44px',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Twitter size={20} />
              <span>X (Twitter)</span>
            </button>
          </div>

          {/* Copy Direct Link */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.4rem 0.4rem 0.85rem',
                borderRadius: '12px',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <input
                readOnly
                value={data.url}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <button
                onClick={handleCopyLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '9px',
                  background: copied ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  minHeight: '38px',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'COPIED!' : 'COPY'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
