import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Terminal, Code2, Brain, Database, Lightbulb } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { REVEAL, VIEWPORT } from '../hooks/useReveal';

type TabKey = 'all' | 'programming' | 'development' | 'dataAi' | 'database' | 'professional';

export const SkillsSection: React.FC = () => {
  const { skills: SKILLS } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const categories: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'all',          label: 'All Skills',             icon: Wrench },
    { key: 'programming',  label: 'Programming',            icon: Terminal },
    { key: 'development',  label: 'Development',            icon: Code2 },
    { key: 'dataAi',       label: 'Data & AI',              icon: Brain },
    { key: 'database',     label: 'Database & Hardware',    icon: Database },
    { key: 'professional', label: 'Business & Soft Skills', icon: Lightbulb },
  ];

  const allSkillsList = [
    ...SKILLS.programming.map(s  => ({ name: s, cat: 'programming',  color: 'var(--color-primary)' })),
    ...SKILLS.development.map(s  => ({ name: s, cat: 'development',   color: 'var(--color-teal)' })),
    ...SKILLS.dataAi.map(s       => ({ name: s, cat: 'dataAi',        color: 'var(--color-primary)' })),
    ...SKILLS.database.map(s     => ({ name: s, cat: 'database',      color: 'var(--color-teal)' })),
    ...SKILLS.hardware.map(s     => ({ name: s, cat: 'database',      color: 'var(--color-amber)' })),
    ...SKILLS.professional.map(s => ({ name: s, cat: 'professional',  color: 'var(--color-coral)' })),
  ];

  const filteredSkills = activeTab === 'all'
    ? allSkillsList
    : activeTab === 'database'
    ? allSkillsList.filter(s => s.cat === 'database')
    : allSkillsList.filter(s => s.cat === activeTab);

  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Section Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <Wrench size={15} />
            <span>07 — TECHNICAL TOOLKIT</span>
          </div>
        </motion.div>

        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          Tools &amp; <span className="gradient-text">Competencies.</span>
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
          Practical technologies and methodologies applied across production applications, machine learning architectures, and venture operations.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          custom={3}
          variants={REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="skills-filter-tabs"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveTab(cat.key)}
                className="skills-filter-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  minHeight: '44px',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'var(--color-primary)' : '#FFFFFF',
                  border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 4px 12px rgba(91, 75, 255, 0.25)' : 'var(--shadow-sm)',
                }}
              >
                <IconComponent size={15} style={{ color: isActive ? '#FFFFFF' : 'var(--color-primary)' }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Chips Card */}
        <motion.div
          layout
          className="glass-card"
          style={{
            padding: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            minHeight: '140px',
            alignContent: 'flex-start',
            background: '#FFFFFF',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                layout
                key={`${skill.name}-${skill.cat}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.2, delay: idx * 0.015 } }}
                exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.15 } }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-color)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: skill.color,
                  }}
                />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
