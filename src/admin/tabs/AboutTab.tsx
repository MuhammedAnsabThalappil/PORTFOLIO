import React, { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { authService } from '../../services/auth';

export const AboutTab: React.FC = () => {
  const { profile, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = authService.getToken();
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'save_item',
          table: 'profile',
          item: {
            id: 'ansab',
            full_name: formData.fullName,
            location: formData.location,
            brand_line: formData.brandLine,
            core_brand: formData.coreBrand,
            hero_statement: formData.heroStatement,
            philosophy: formData.philosophy,
            mission: formData.mission,
            about_story: formData.aboutStory,
            identity_cards: formData.identityCards,
            professional_identity: formData.professionalIdentity,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      updateProfile(formData);
      setMessage({ text: 'Profile & About Me section updated successfully!', type: 'success' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ text: err.message || 'Error saving changes', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Story paragraphs management
  const handleAddStoryPara = () => {
    setFormData(prev => ({
      ...prev,
      aboutStory: [...prev.aboutStory, ''],
    }));
  };

  const handleUpdateStoryPara = (index: number, val: string) => {
    const updated = [...formData.aboutStory];
    updated[index] = val;
    setFormData(prev => ({ ...prev, aboutStory: updated }));
  };

  const handleRemoveStoryPara = (index: number) => {
    setFormData(prev => ({
      ...prev,
      aboutStory: prev.aboutStory.filter((_, i) => i !== index),
    }));
  };

  // Identity cards management
  const handleUpdateCard = (index: number, field: string, val: any) => {
    const updated = [...formData.identityCards];
    updated[index] = { ...updated[index], [field]: val };
    setFormData(prev => ({ ...prev, identityCards: updated }));
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
      {/* Top action bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>About Me &amp; Personal Branding</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage your personal statement, core mission, story, and identity cards</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
          style={{ padding: '0.65rem 1.5rem' }}
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {message && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          background: message.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
          color: message.type === 'success' ? '#10b981' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem',
        }}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Core Personal Details */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        <div>
          <label style={labelStyle}>FULL NAME</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>LOCATION</label>
          <input
            type="text"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>BRAND LINE / MOTTO</label>
          <input
            type="text"
            value={formData.brandLine}
            onChange={e => setFormData({ ...formData, brandLine: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>CORE BRAND SLOGAN</label>
          <input
            type="text"
            value={formData.coreBrand}
            onChange={e => setFormData({ ...formData, coreBrand: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>HERO STATEMENT / QUOTE</label>
          <input
            type="text"
            value={formData.heroStatement}
            onChange={e => setFormData({ ...formData, heroStatement: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>PHILOSOPHY</label>
          <input
            type="text"
            value={formData.philosophy}
            onChange={e => setFormData({ ...formData, philosophy: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>MISSION STATEMENT</label>
          <textarea
            rows={3}
            value={formData.mission}
            onChange={e => setFormData({ ...formData, mission: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* About Story Paragraphs */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>About Story Paragraphs</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rendered in the About section story box</p>
          </div>
          <button
            type="button"
            onClick={handleAddStoryPara}
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
          {formData.aboutStory.map((para, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary-cyan)', paddingTop: '0.75rem' }}>
                #{idx + 1}
              </span>
              <textarea
                rows={2}
                value={para}
                onChange={e => handleUpdateStoryPara(idx, e.target.value)}
                style={{ ...inputStyle, flex: 1, resize: 'vertical' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveStoryPara(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  padding: '0.75rem 0.5rem',
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Identity Cards */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
      }}>
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem', color: '#fff' }}>Identity Bento Cards (01, 02, 03)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {formData.identityCards.map((card, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-cyan)', fontWeight: 700 }}>
                  CARD {card.number}
                </span>
              </div>
              <div>
                <label style={labelStyle}>TITLE</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={e => handleUpdateCard(idx, 'title', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>TAGS (comma separated)</label>
                <input
                  type="text"
                  value={card.tags.join(', ')}
                  onChange={e => handleUpdateCard(idx, 'tags', e.target.value.split(',').map(s => s.trim()))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={card.description}
                  onChange={e => handleUpdateCard(idx, 'description', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
