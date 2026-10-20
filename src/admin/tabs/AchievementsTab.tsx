import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit2, CheckCircle2, AlertCircle, Trophy, Newspaper } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { HeroAchievement, SecondaryAchievement, MediaRecognition } from '../../types';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

export const AchievementsTab: React.FC = () => {
  const {
    heroAchievement,
    secondaryAchievements,
    mediaRecognition,
    updateAchievements,
  } = usePortfolio();

  const [heroForm, setHeroForm] = useState<HeroAchievement>({ ...heroAchievement });
  const [secondaries, setSecondaries] = useState<SecondaryAchievement[]>([...secondaryAchievements]);
  const [mediaForm, setMediaForm] = useState<MediaRecognition>({ ...mediaRecognition });
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Edit / Create state for secondary achievements
  const [editingSecondary, setEditingSecondary] = useState<SecondaryAchievement | null>(null);
  const [isNewSecondary, setIsNewSecondary] = useState(false);

  const handleSaveHeroAndMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const token = authService.getToken();

      // Save hero achievement
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'hero_achievement',
          item: {
            id: 'converge-2026',
            title: heroForm.title,
            subtitle: heroForm.subtitle,
            badge: heroForm.badge,
            prize: heroForm.prize,
            journey_text: heroForm.journeyText,
            wording: heroForm.wording,
            team_members: heroForm.teamMembers,
            image: heroForm.image,
            story_teaser: heroForm.storyTeaser,
            story_full: heroForm.storyFull,
            is_published: true,
          },
        }),
      });

      // Save media recognition
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'media_recognition',
          item: {
            id: 'main',
            title: mediaForm.title,
            newspaper: mediaForm.newspaper,
            date: mediaForm.date,
            page: mediaForm.page,
            caption: mediaForm.caption,
            description: mediaForm.description,
            image: mediaForm.image,
            is_published: true,
          },
        }),
      });

      updateAchievements(heroForm, secondaries);
      setStatusMsg({ text: 'Hero Achievement & Media Recognition updated successfully!', type: 'success' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Failed to update achievements', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecondary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSecondary) return;

    setSaving(true);
    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'secondary_achievements',
          item: {
            id: editingSecondary.id,
            slug: editingSecondary.id,
            title: editingSecondary.title,
            issuer: editingSecondary.issuer,
            subtitle: editingSecondary.subtitle,
            description: editingSecondary.description,
            tags: editingSecondary.tags,
            is_published: true,
          },
        }),
      });

      let updated: SecondaryAchievement[];
      if (isNewSecondary) {
        updated = [...secondaries, editingSecondary];
      } else {
        updated = secondaries.map(s => s.id === editingSecondary.id ? editingSecondary : s);
      }

      setSecondaries(updated);
      updateAchievements(heroForm, updated);
      setEditingSecondary(null);
      setIsNewSecondary(false);
      setStatusMsg({ text: `Secondary Achievement "${editingSecondary.title}" saved!`, type: 'success' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Failed to save', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSecondary = async (id: string) => {
    setSaving(true);
    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'delete_item', table: 'secondary_achievements', id }),
      });

      const updated = secondaries.filter(s => s.id !== id);
      setSecondaries(updated);
      updateAchievements(heroForm, updated);
      setStatusMsg({ text: 'Achievement deleted', type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Failed to delete', type: 'error' });
    } finally {
      setSaving(false);
    }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Achievements &amp; Recognition CMS</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage the CONVERGE 2026 Reverse Pitch spotlight, awards, and media coverage
          </p>
        </div>
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

      {/* 1. Hero Achievement (CONVERGE 2026) */}
      <form onSubmit={handleSaveHeroAndMedia} style={{
        padding: '1.75rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Trophy size={20} style={{ color: '#f59e0b' }} />
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#fff' }}>Spotlight Award: {heroForm.title}</h3>
          </div>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.55rem 1.25rem' }}>
            <Save size={15} />
            <span>Save Spotlight</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>AWARD TITLE</label>
            <input
              type="text"
              required
              value={heroForm.title}
              onChange={e => setHeroForm({ ...heroForm, title: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>SUBTITLE / EVENT</label>
            <input
              type="text"
              value={heroForm.subtitle}
              onChange={e => setHeroForm({ ...heroForm, subtitle: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>BADGE (e.g. 🥇 1ST PRIZE)</label>
            <input
              type="text"
              value={heroForm.badge}
              onChange={e => setHeroForm({ ...heroForm, badge: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>PRIZE AMOUNT (e.g. ₹25,000)</label>
            <input
              type="text"
              value={heroForm.prize}
              onChange={e => setHeroForm({ ...heroForm, prize: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>JOURNEY TEXT (e.g. 43 TEAMS → TOP 6 → 1ST PRIZE)</label>
            <input
              type="text"
              value={heroForm.journeyText}
              onChange={e => setHeroForm({ ...heroForm, journeyText: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>TEAM MEMBERS (comma separated)</label>
            <input
              type="text"
              value={heroForm.teamMembers.join(', ')}
              onChange={e => setHeroForm({ ...heroForm, teamMembers: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>STORY TEASER</label>
            <input
              type="text"
              value={heroForm.storyTeaser}
              onChange={e => setHeroForm({ ...heroForm, storyTeaser: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>FULL STORY / JOURNEY REFLECTION</label>
            <textarea
              rows={4}
              value={heroForm.storyFull}
              onChange={e => setHeroForm({ ...heroForm, storyFull: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Hero Image Upload */}
        <ImageUploader
          label="HERO TROPHY / COMPETITION IMAGE"
          currentUrl={heroForm.image}
          onUploadComplete={(url) => setHeroForm({ ...heroForm, image: url })}
          onRemove={() => setHeroForm({ ...heroForm, image: '' })}
          helperText="Uploads to Supabase Storage bucket 'portfolio-images'"
        />
      </form>

      {/* 2. Media Recognition (Newspaper) */}
      <div style={{
        padding: '1.75rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Newspaper size={20} style={{ color: 'var(--primary-cyan)' }} />
          <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#fff' }}>Media Recognition (Newspaper Press)</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>NEWSPAPER NAME</label>
            <input
              type="text"
              value={mediaForm.newspaper}
              onChange={e => setMediaForm({ ...mediaForm, newspaper: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>PUBLICATION DATE</label>
            <input
              type="text"
              value={mediaForm.date}
              onChange={e => setMediaForm({ ...mediaForm, date: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>PAGE NO</label>
            <input
              type="text"
              value={mediaForm.page}
              onChange={e => setMediaForm({ ...mediaForm, page: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>CAPTION</label>
            <input
              type="text"
              value={mediaForm.caption}
              onChange={e => setMediaForm({ ...mediaForm, caption: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>

        <ImageUploader
          label="NEWSPAPER CLIPPING / PRESS IMAGE"
          currentUrl={mediaForm.image}
          onUploadComplete={(url) => setMediaForm({ ...mediaForm, image: url })}
          onRemove={() => setMediaForm({ ...mediaForm, image: '' })}
        />
      </div>

      {/* 3. Secondary Achievements List & Modal */}
      <div style={{
        padding: '1.75rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#fff' }}>Secondary Achievements &amp; Programs</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Govt INSPIRE Award, NIT Calicut training, etc.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingSecondary({
                id: 'sec-' + Date.now(),
                title: '',
                issuer: '',
                subtitle: '',
                description: '',
                tags: [],
              });
              setIsNewSecondary(true);
            }}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
          >
            <Plus size={15} />
            <span>Add Achievement</span>
          </button>
        </div>

        {/* Secondary Editor Modal */}
        {editingSecondary && (
          <form onSubmit={handleSaveSecondary} style={{
            padding: '1.25rem',
            borderRadius: '12px',
            background: 'rgba(0, 240, 255, 0.03)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>AWARD / PROGRAM TITLE</label>
                <input
                  type="text"
                  required
                  value={editingSecondary.title}
                  onChange={e => setEditingSecondary({ ...editingSecondary, title: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>ISSUER / ORGANIZATION</label>
                <input
                  type="text"
                  value={editingSecondary.issuer}
                  onChange={e => setEditingSecondary({ ...editingSecondary, issuer: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>SUBTITLE</label>
                <input
                  type="text"
                  value={editingSecondary.subtitle}
                  onChange={e => setEditingSecondary({ ...editingSecondary, subtitle: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={editingSecondary.description}
                  onChange={e => setEditingSecondary({ ...editingSecondary, description: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>TAGS (comma separated)</label>
                <input
                  type="text"
                  value={editingSecondary.tags.join(', ')}
                  onChange={e => setEditingSecondary({ ...editingSecondary, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                Save
              </button>
              <button type="button" onClick={() => setEditingSecondary(null)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {secondaries.map((sec) => (
            <div
              key={sec.id}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{sec.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {sec.issuer} · {sec.subtitle}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSecondary({ ...sec });
                    setIsNewSecondary(false);
                  }}
                  style={{
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: 'var(--primary-cyan)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSecondary(sec.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    padding: '0.4rem',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
