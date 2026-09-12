import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Terminal, Code2, Brain, Database, Cpu, Lightbulb } from 'lucide-react';
import { SKILLS } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'programming' | 'development' | 'dataAi' | 'database' | 'professional'>('all');

  const categories = [
    { key: 'all', label: 'All Skills', icon: Wrench },
    { key: 'programming', label: 'Programming', icon: Terminal },
    { key: 'development', label: 'Development', icon: Code2 },
    { key: 'dataAi', label: 'Data & AI', icon: Brain },
    { key: 'database', label: 'Database & Hardware', icon: Database },
    { key: 'professional', label: 'Business & Soft Skills', icon: Lightbulb },
  ];

  const allSkillsList = [
    ...SKILLS.programming.map(s => ({ name: s, cat: 'programming', color: 'var(--primary-cyan)' })),
    ...SKILLS.development.map(s => ({ name: s, cat: 'development', color: 'var(--secondary-violet)' })),
    ...SKILLS.dataAi.map(s => ({ name: s, cat: 'dataAi', color: 'var(--primary-cyan)' })),
    ...SKILLS.database.map(s => ({ name: s, cat: 'database', color: 'var(--accent-emerald)' })),
    ...SKILLS.hardware.map(s => ({ name: s, cat: 'database', color: 'var(--accent-emerald)' })),
    ...SKILLS.professional.map(s => ({ name: s, cat: 'professional', color: 'var(--accent-amber)' })),
  ];

  const filteredSkills = activeTab === 'all'
    ? allSkillsList
    : activeTab === 'database'
    ? allSkillsList.filter(s => s.cat === 'database')
    : allSkillsList.filter(s => s.cat === activeTab);

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-eyebrow">
          <Wrench size={16} />
          <span>07 — SKILLS & TOOLKIT</span>
        </div>
        <h2 className="section-title">
          MY <span className="gradient-text">TOOLKIT.</span>
        </h2>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                <IconComponent size={16} style={{ color: isActive ? 'var(--primary-cyan)' : 'var(--text-dim)' }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Chips Grid */}
        <motion.div
          layout
          className="glass-card"
          style={{
            padding: '2.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            minHeight: '180px',
            alignContent: 'flex-start',
          }}
        >
          {filteredSkills.map((skill, idx) => (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
              key={`${skill.name}-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${skill.color}`,
                boxShadow: `0 0 15px ${skill.color}22`,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#ffffff',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 0 25px ${skill.color}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 0 15px ${skill.color}22`;
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: skill.color,
                  boxShadow: `0 0 8px ${skill.color}`,
                }}
              />
              <span>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
