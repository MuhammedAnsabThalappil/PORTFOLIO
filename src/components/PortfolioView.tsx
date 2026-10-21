import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { CommandMenu } from './CommandMenu';
import { Hero } from './Hero';
import { AboutBento } from './AboutBento';
import { TimelineSection } from './TimelineSection';
import { AchievementsShowcase } from './AchievementsShowcase';
import { GallerySection } from './GallerySection';
import { ProjectsSection } from './ProjectsSection';
import { BusinessShowcase } from './BusinessShowcase';
import { ExperienceEducation } from './ExperienceEducation';
import { SkillsSection } from './SkillsSection';
import { ExploringMarquee } from './ExploringMarquee';
import { CinematicPhilosophy } from './CinematicPhilosophy';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { Modal } from './Modal';
import { Lightbox } from './Lightbox';
import { AnimatedBackground } from './AnimatedBackground';
import { CinematicOpening } from './CinematicOpening';
import { CustomCursor } from './CustomCursor';
import { Project, Business } from '../types';
import { trackAnalytics } from '../services/supabase';

export const PortfolioView: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [modalData, setModalData] = useState<Project | Business | null>(null);
  const [lightboxData, setLightboxData] = useState<{ src: string; caption: string } | null>(null);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track page visit on mount
  useEffect(() => {
    trackAnalytics('page_view', { path: '/' });
  }, []);

  // Smooth scroll to hash anchor on load (e.g., #achievement-converge-2026)
  useEffect(() => {
    if (window.location.hash) {
      const hashTarget = document.querySelector(window.location.hash);
      if (hashTarget) {
        setTimeout(() => {
          hashTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 600);
      }
    }
  }, []);

  return (
    <div className="app-container">
      {/* Custom Fluid Cursor (Desktop only, auto-disabled on touch) */}
      <CustomCursor />

      {/* Cinematic opening sequence featuring real portrait photo */}
      <CinematicOpening />

      {/* Ambient starlight & grid background */}
      <AnimatedBackground />

      {/* Sticky Navigation */}
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <AboutBento />
        <TimelineSection />
        <AchievementsShowcase
          onOpenLightbox={(src, caption) => setLightboxData({ src, caption })}
        />
        <GallerySection />
        <ProjectsSection
          onOpenProjectModal={(project) => {
            setModalData(project);
            trackAnalytics('project_click', { target: project.id });
          }}
        />
        <BusinessShowcase
          onOpenBusinessModal={(biz) => setModalData(biz)}
        />
        <ExperienceEducation />
        <SkillsSection />
        <ExploringMarquee />
        <CinematicPhilosophy />
        <ContactSection />
      </main>

      <Footer />

      {/* Overlays */}
      <CommandMenu
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
      />

      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
      />

      <Lightbox
        isOpen={!!lightboxData}
        onClose={() => setLightboxData(null)}
        imgSrc={lightboxData?.src || ''}
        caption={lightboxData?.caption || ''}
      />
    </div>
  );
};
