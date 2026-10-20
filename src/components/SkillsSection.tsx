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
    { key: 'all',          label: 'All Skills',           icon: Wrench },
    { key: 'programming',  label: 'Programming',          icon: Terminal },
    { key: 'development',  label: 'Development',          icon: Code2 },
    { key: 'dataAi',       label: 'Data & AI',            icon: Brain },
    { key: 'database',     label: 'Database & Hardware',  icon: Database },
    { key: 'professional', label: 'Business & Soft Skills', icon: Lightbulb },
  ];

  const allSkillsList = [
    ...SKILLS.programming.map(s  => ({ name: s, cat: 'programming',  color: 'var(--primary-cyan)' })),
    ...SKILLS.development.map(s  => ({ name: s, cat: 'development',   color: 'var(--secondary-violet)' })),
    ...SKILLS.dataAi.map(s       => ({ name: s, cat: 'dataAi',        color: 'var(--primary-cyan)' })),
    ...SKILLS.database.map(s     => ({ name: s, cat: 'database',      color: 'var(--accent-emerald)' })),
    ...SKILLS.hardware.map(s     => ({ name: s, cat: 'database',      color: 'var(--accent-emerald)' })),
    ...SKILLS.professional.map(s => ({ name: s, cat: 'professional',  color: 'var(--accent-amber)' })),
  ];

  const filteredSkills = activeTab === 'all'
    ? allSkillsList
    : activeTab === 'database'
    ? allSkillsList.filter(s => s.cat === 'database')
    : allSkillsList.filter(s => s.cat === activeTab);

  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <Wrench size={16} />
            <span>07 — SKILLS &amp; TOOLKIT</span>
          </div>
        </motion.div>
        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          MY <span className="gradient-text">TOOLKIT.</span>
        </motion.h2>

        {/* Filter Tabs */}
        <motion.div
          custom={2} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="skills-filter-tabs"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="skills-filter-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.15rem', borderRadius: '12px',
                  fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isActive ? '1px solid rgba(0,240,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                <IconComponent size={16} style={{ color: isActive ? 'var(--primary-cyan)' : 'var(--text-dim)' }} />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Chips */}
        <motion.div
          layout
          className="glass-card"
          style={{ padding: '2.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', minHeight: '180px', alignContent: 'flex-start' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                layout
                key={`${skill.name}-${skill.cat}`}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1,    opacity: 1, transition: { duration: 0.22, delay: idx * 0.018, ease: [0.16,1,0.3,1] } }}
                exit={{ scale: 0.85,   opacity: 0, transition: { duration: 0.15 } }}
                whileHover={{ y: -3, boxShadow: `0 0 28px ${skill.color}55` }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.65rem 1.25rem', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${skill.color}`,
                  boxShadow: `0 0 14px ${skill.color}22`,
                  fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, color: '#ffffff',
                  cursor: 'default',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: skill.color, boxShadow: `0 0 8px ${skill.color}`, flexShrink: 0 }} />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
