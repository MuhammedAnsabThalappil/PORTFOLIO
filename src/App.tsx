import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CommandMenu } from './components/CommandMenu';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { TimelineSection } from './components/TimelineSection';
import { AchievementsShowcase } from './components/AchievementsShowcase';
import { ProjectsSection } from './components/ProjectsSection';
import { BusinessShowcase } from './components/BusinessShowcase';
import { ExperienceEducation } from './components/ExperienceEducation';
import { SkillsSection } from './components/SkillsSection';
import { ExploringMarquee } from './components/ExploringMarquee';
import { CinematicPhilosophy } from './components/CinematicPhilosophy';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { Lightbox } from './components/Lightbox';
import { Project, Business } from './types';

export const App: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [modalData, setModalData] = useState<Project | Business | null>(null);
  const [lightboxData, setLightboxData] = useState<{ src: string; caption: string } | null>(null);

  // Global Cmd+K / Ctrl+K shortcut to open command palette
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

  return (
    <div className="app-container">
      {/* Background ambient lighting */}
      <div className="ambient-grid" />

      {/* Sticky Navigation */}
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <AboutBento />
        <TimelineSection />
        <AchievementsShowcase
          onOpenLightbox={(src, caption) => setLightboxData({ src, caption })}
        />
        <ProjectsSection
          onOpenProjectModal={(project) => setModalData(project)}
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

      {/* Footer */}
      <Footer />

      {/* Overlays & Modals */}
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

export default App;
