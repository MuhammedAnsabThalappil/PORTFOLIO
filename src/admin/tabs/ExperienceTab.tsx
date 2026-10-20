import React, { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Experience } from '../../types';
import { authService } from '../../services/auth';

export const ExperienceTab: React.FC = () => {
  const { experience, updateExperience } = usePortfolio();
  const [form, setForm] = useState<Experience>({ ...experience });
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'experience',
          item: {
            id: 'exp-main',
            company: form.company,
            position: form.position,
            duration: form.duration,
            length: form.length,
            location: form.location,
            paragraphs: form.paragraphs,
            mentorship: form.mentorship,
            skills_highlighted: form.skillsHighlighted,
            is_published: true,
          },
        }),
      });

      updateExperience(form);
      setStatusMsg({ text: 'Experience details updated successfully!', type: 'success' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving experience', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddParagraph = () => {
    setForm(prev => ({ ...prev, paragraphs: [...prev.paragraphs, ''] }));
  };

  const handleUpdateParagraph = (idx: number, val: string) => {
    const updated = [...form.paragraphs];
    updated[idx] = val;
    setForm(prev => ({ ...prev, paragraphs: updated }));
  };

  const handleRemoveParagraph = (idx: number) => {
    setForm(prev => ({ ...prev, paragraphs: prev.paragraphs.filter((_, i) => i !== idx) }));
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-color)',
    color: '#ffffff',
    fontSize: '0.9rem',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    fontWeight: 600,
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Professional Experience CMS</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage internships, software engineering roles, takeaways, and mentorship acknowledgments
          </p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Experience'}</span>
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

      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
      }}>
        <div>
          <label style={labelStyle}>COMPANY / ORGANIZATION</label>
          <input
            type="text"
            required
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>POSITION / TITLE</label>
          <input
            type="text"
            required
            value={form.position}
            onChange={e => setForm({ ...form, position: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>DURATION (e.g. June 2024 — December 2024)</label>
          <input
            type="text"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>TENURE LENGTH (e.g. 7 MONTHS)</label>
          <input
            type="text"
            value={form.length}
            onChange={e => setForm({ ...form, length: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>LOCATION</label>
          <input
            type="text"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>SKILLS HIGHLIGHTED (comma separated)</label>
          <input
            type="text"
            value={form.skillsHighlighted.join(', ')}
            onChange={e => setForm({ ...form, skillsHighlighted: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            style={inputStyle}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>MENTORSHIP / APPRECIATION NOTE</label>
          <textarea
            rows={2}
            value={form.mentorship}
            onChange={e => setForm({ ...form, mentorship: e.target.value })}
            placeholder="Special appreciation to mentor..."
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* Paragraphs */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Experience Narrative Paragraphs</h3>
          <button
            type="button"
            onClick={handleAddParagraph}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: 'var(--primary-cyan)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Plus size={14} />
            <span>Add Paragraph</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {form.paragraphs.map((p, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary-cyan)', paddingTop: '0.75rem' }}>
                #{idx + 1}
              </span>
              <textarea
                rows={2}
                value={p}
                onChange={e => handleUpdateParagraph(idx, e.target.value)}
                style={{ ...inputStyle, flex: 1, resize: 'vertical' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveParagraph(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.75rem 0.5rem' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
