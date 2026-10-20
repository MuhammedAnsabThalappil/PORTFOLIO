import React, { useState } from 'react';
import { Save, Plus, X, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skills } from '../../types';
import { authService } from '../../services/auth';

export const SkillsTab: React.FC = () => {
  const { skills, updateSkills } = usePortfolio();
  const [skillState, setSkillState] = useState<Skills>({ ...skills });
  const [newSkillText, setNewSkillText] = useState<{ [key in keyof Skills]?: string }>({});
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const categories: { key: keyof Skills; label: string; desc: string }[] = [
    { key: 'programming', label: 'PROGRAMMING LANGUAGES', desc: 'Core languages and low-level code' },
    { key: 'development', label: 'SOFTWARE & WEB DEVELOPMENT', desc: 'Mobile & Web application technologies' },
    { key: 'dataAi', label: 'AI, MACHINE LEARNING & DATA SCIENCE', desc: 'Models, architectures & predictive systems' },
    { key: 'database', label: 'DATABASES & DATA STORAGE', desc: 'Relational & distributed database engines' },
    { key: 'hardware', label: 'HARDWARE & EMBEDDED SYSTEMS', desc: 'Microcontrollers, Raspberry Pi & IoT sensors' },
    { key: 'professional', label: 'PROFESSIONAL & INNOVATION SKILLS', desc: 'Leadership, commercial acumen & problem solving' },
  ];

  const handleAddSkill = (catKey: keyof Skills) => {
    const text = (newSkillText[catKey] || '').trim();
    if (!text) return;

    if (skillState[catKey].includes(text)) {
      setNewSkillText(prev => ({ ...prev, [catKey]: '' }));
      return;
    }

    setSkillState(prev => ({
      ...prev,
      [catKey]: [...prev[catKey], text],
    }));

    setNewSkillText(prev => ({ ...prev, [catKey]: '' }));
  };

  const handleRemoveSkill = (catKey: keyof Skills, skillName: string) => {
    setSkillState(prev => ({
      ...prev,
      [catKey]: prev[catKey].filter(s => s !== skillName),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMsg(null);

    try {
      const token = authService.getToken();

      // Convert categorized skills into rows
      const rows: Array<{ category: string; name: string; order_index: number; is_published: boolean }> = [];
      for (const cat of categories) {
        skillState[cat.key].forEach((name, i) => {
          rows.push({
            category: cat.key,
            name,
            order_index: i + 1,
            is_published: true,
          });
        });
      }

      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'skills',
          item: { id: 'skills-bundle', data: rows },
        }),
      });

      updateSkills(skillState);
      setStatusMsg({ text: 'Skills toolkit updated successfully!', type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving skills', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Technical &amp; Engineering Toolkit</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Organize skills by authentic categories without artificial percentages
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.5rem' }}
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save All Skills'}</span>
        </button>
      </div>

      {statusMsg && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          background: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
          color: statusMsg.type === 'success' ? '#10b981' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {categories.map((cat) => (
          <div
            key={cat.key}
            style={{
              padding: '1.5rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-cyan)', fontWeight: 700, marginBottom: '0.25rem' }}>
                {cat.label}
              </div>
              <p style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                {cat.desc}
              </p>

              {/* Skills Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {skillState[cat.key].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(cat.key, skill)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0,
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Add Skill Input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add skill tag..."
                value={newSkillText[cat.key] || ''}
                onChange={e => setNewSkillText({ ...newSkillText, [cat.key]: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(cat.key);
                  }
                }}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => handleAddSkill(cat.key)}
                style={{
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  color: 'var(--primary-cyan)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
