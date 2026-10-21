import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Tag, Filter } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GalleryItem, GalleryCategory } from '../types';
import { REVEAL, VIEWPORT } from '../hooks/useReveal';

const CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
  'Achievements',
  'Innovation',
  'Projects',
  'Entrepreneurship',
  'Events',
];

export const GallerySection: React.FC = () => {
  const { gallery: GALLERY } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | GalleryCategory>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter gallery items
  const filteredItems = selectedCategory === 'All'
    ? GALLERY
    : GALLERY.filter(item => item.category === selectedCategory);

  // Keyboard controls for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeLightboxIndex === null) return;

    if (e.key === 'Escape') {
      setActiveLightboxIndex(null);
    } else if (e.key === 'ArrowRight') {
      setActiveLightboxIndex(prev => (prev !== null ? (prev + 1) % filteredItems.length : null));
    } else if (e.key === 'ArrowLeft') {
      setActiveLightboxIndex(prev => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
    }
  }, [activeLightboxIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [activeLightboxIndex]);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const showPrev = () => {
    setActiveLightboxIndex(prev => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  };

  const showNext = () => {
    setActiveLightboxIndex(prev => (prev !== null ? (prev + 1) % filteredItems.length : null));
  };

  return (
    <section className="section" id="gallery">
      <div className="container">
        {/* Section Header */}
        <motion.div
          custom={0}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="section-eyebrow">
            <ImageIcon size={16} />
            <span>VISUAL ARCHIVE</span>
          </div>
        </motion.div>

        <motion.h2
          custom={1}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="section-title"
        >
          MOMENTS &amp; <span className="gradient-text">MILESTONES.</span>
        </motion.h2>

        <motion.p
          custom={2}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="section-subtitle"
          style={{ marginBottom: '2.5rem' }}
        >
          Authentic photographs documenting competitive hackathons, national innovation summits, university programs, commercial ventures, and leadership milestones.
        </motion.p>

        {/* Filter Pills */}
        <motion.div
          custom={3}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="gallery-filter-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? GALLERY.length : GALLERY.filter(i => i.category === cat).length;
            if (cat !== 'All' && count === 0) return null;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="gallery-filter-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  minHeight: '44px', // Touch friendly
                  transition: 'all 0.2s ease',
                  background: isActive ? 'var(--accent-aura)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#07080c' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-aura)' : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '999px',
                    background: isActive ? 'rgba(7, 8, 12, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div
            className="glass-card"
            style={{
              textAlign: 'center',
              padding: '3.5rem 1.5rem',
              color: 'var(--text-muted)',
            }}
          >
            <ImageIcon size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <h3 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>No images in this category</h3>
            <p style={{ fontSize: '0.9rem' }}>Select another category or view all photographs.</p>
          </div>
        ) : (
          <div className="gallery-responsive-grid">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="gallery-card glass-card"
                onClick={() => setActiveLightboxIndex(index)}
                style={{
                  padding: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(14, 18, 28, 0.85)',
                }}
              >
                {/* Image Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    background: '#0a0d16',
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.title}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.45s ease',
                    }}
                    className="gallery-card-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/ansab.jpeg';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(7, 8, 12, 0.7) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Category Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '8px',
                      background: 'rgba(7, 8, 12, 0.82)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(220, 248, 54, 0.3)',
                      color: 'var(--accent-aura)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    <span>{item.category}</span>
                  </div>

                  {/* Enlarge Hint */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(7, 8, 12, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                  >
                    <Maximize2 size={14} />
                  </div>
                </div>

                {/* Card Details */}
                <div style={{ padding: '1.25rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '0.35rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Interactive Lightbox */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeLightboxIndex !== null && activeItem && (
              <motion.div
                key="gallery-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 99999,
                  background: 'rgba(5, 7, 12, 0.94)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'clamp(0.75rem, 3vw, 2rem)',
                }}
                onClick={() => setActiveLightboxIndex(null)}
              >
                {/* Top Controls Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '10px',
                      background: 'rgba(14, 18, 28, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      pointerEvents: 'auto',
                    }}
                  >
                    <span style={{ color: 'var(--accent-aura)', fontWeight: 700 }}>
                      {activeLightboxIndex + 1}
                    </span>
                    <span>/</span>
                    <span>{filteredItems.length}</span>
                    <span style={{ opacity: 0.4 }}>|</span>
                    <span>{activeItem.category}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxIndex(null);
                    }}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      transition: 'background 0.2s',
                    }}
                    aria-label="Close Lightbox"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Main Image Area with Prev & Next */}
                <div
                  style={{
                    position: 'relative',
                    maxWidth: '1100px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    key={activeItem.id}
                    initial={{ scale: 0.94, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.94, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      maxHeight: '70vh',
                      maxWidth: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={activeItem.imageUrl}
                      alt={activeItem.altText || activeItem.title}
                      style={{
                        maxHeight: '70vh',
                        maxWidth: '92vw',
                        objectFit: 'contain',
                        borderRadius: '16px',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(220, 248, 54, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/ansab.jpeg';
                      }}
                    />
                  </motion.div>

                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                    style={{
                      position: 'absolute',
                      left: 'clamp(4px, 2vw, 16px)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(10, 13, 22, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.2s, background 0.2s',
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                    style={{
                      position: 'absolute',
                      right: 'clamp(4px, 2vw, 16px)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(10, 13, 22, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.2s, background 0.2s',
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Details Bottom Card */}
                  <div
                    style={{
                      marginTop: '1rem',
                      maxWidth: '750px',
                      width: '100%',
                      padding: '1rem 1.25rem',
                      borderRadius: '14px',
                      background: 'rgba(14, 18, 28, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      textAlign: 'center',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {activeItem.title}
                    </h3>
                    {activeItem.caption && (
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {activeItem.caption}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
