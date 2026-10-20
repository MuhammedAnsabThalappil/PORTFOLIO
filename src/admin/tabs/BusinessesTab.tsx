import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Briefcase, ExternalLink, Save, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Business } from '../../types';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

export const BusinessesTab: React.FC = () => {
  const { businesses, updateBusinesses } = usePortfolio();
  const [bizList, setBizList] = useState<Business[]>([...businesses]);
  const [editingBiz, setEditingBiz] = useState<Business | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const initialNewBiz: Business = {
    id: 'biz-' + Date.now(),
    number: `BUSINESS 0${bizList.length + 1}`,
    name: '',
    role: 'FOUNDER',
    category: '',
    shortDesc: '',
    description: '',
    image: '',
    tags: [],
    website: '',
    instagram: '',
  };

  const handleStartCreate = () => {
    setEditingBiz({ ...initialNewBiz });
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBiz) return;

    setSaving(true);
    setStatusMsg(null);

    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'businesses',
          item: {
            id: editingBiz.id,
            slug: editingBiz.id,
            number: editingBiz.number,
            name: editingBiz.name,
            role: editingBiz.role,
            category: editingBiz.category,
            short_desc: editingBiz.shortDesc,
            description: editingBiz.description,
            image: editingBiz.image,
            tags: editingBiz.tags || [],
            website: editingBiz.website,
            instagram: editingBiz.instagram,
            is_published: true,
          },
        }),
      });

      let updated: Business[];
      if (isNew) {
        updated = [...bizList, editingBiz];
      } else {
        updated = bizList.map(b => b.id === editingBiz.id ? editingBiz : b);
      }

      setBizList(updated);
      updateBusinesses(updated);
      setEditingBiz(null);
      setIsNew(false);
      setStatusMsg({ text: `Business profile "${editingBiz.name}" saved successfully!`, type: 'success' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving business', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'delete_item', table: 'businesses', id }),
      });

      const updated = bizList.filter(b => b.id !== id);
      setBizList(updated);
      updateBusinesses(updated);
      setStatusMsg({ text: 'Business profile removed', type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error deleting business', type: 'error' });
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Business Ventures CMS</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage Motherbits Technologies LLP, King Day, Zoltiq, and commercial ventures
          </p>
        </div>
        {!editingBiz && (
          <button onClick={handleStartCreate} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
            <Plus size={16} />
            <span>Add Business</span>
          </button>
        )}
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

      {/* Editor Modal / Panel */}
      {editingBiz && (
        <form onSubmit={handleSave} style={{
          padding: '1.75rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>
              {isNew ? 'Create New Business Venture' : `Edit: ${editingBiz.name}`}
            </h3>
            <button type="button" onClick={() => setEditingBiz(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>VENTURE BADGE / NUMBER</label>
              <input
                type="text"
                required
                value={editingBiz.number}
                onChange={e => setEditingBiz({ ...editingBiz, number: e.target.value })}
                placeholder="BUSINESS 01"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>BUSINESS NAME</label>
              <input
                type="text"
                required
                value={editingBiz.name}
                onChange={e => setEditingBiz({ ...editingBiz, name: e.target.value })}
                placeholder="MOTHERBITS TECHNOLOGIES LLP"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>YOUR ROLE</label>
              <input
                type="text"
                required
                value={editingBiz.role}
                onChange={e => setEditingBiz({ ...editingBiz, role: e.target.value })}
                placeholder="CO-FOUNDER / FOUNDER"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>INDUSTRY CATEGORY</label>
              <input
                type="text"
                value={editingBiz.category}
                onChange={e => setEditingBiz({ ...editingBiz, category: e.target.value })}
                placeholder="TECH INNOVATION · PRODUCT R&D"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>SHORT SUMMARY</label>
              <input
                type="text"
                value={editingBiz.shortDesc}
                onChange={e => setEditingBiz({ ...editingBiz, shortDesc: e.target.value })}
                placeholder="Short 1-sentence teaser..."
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>DETAILED DESCRIPTION</label>
              <textarea
                rows={3}
                required
                value={editingBiz.description}
                onChange={e => setEditingBiz({ ...editingBiz, description: e.target.value })}
                placeholder="Full operational description of the venture..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={labelStyle}>TAGS (comma separated)</label>
              <input
                type="text"
                value={editingBiz.tags.join(', ')}
                onChange={e => setEditingBiz({ ...editingBiz, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Tech Platform, Product R&D, Co-Founder"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>OFFICIAL WEBSITE URL</label>
              <input
                type="text"
                value={editingBiz.website || ''}
                onChange={e => setEditingBiz({ ...editingBiz, website: e.target.value })}
                placeholder="https://..."
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>INSTAGRAM / SOCIAL URL</label>
              <input
                type="text"
                value={editingBiz.instagram || ''}
                onChange={e => setEditingBiz({ ...editingBiz, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                style={inputStyle}
              />
            </div>
          </div>

          <ImageUploader
            label="BUSINESS BRAND LOGO / COVER IMAGE"
            currentUrl={editingBiz.image}
            onUploadComplete={(url) => setEditingBiz({ ...editingBiz, image: url })}
            onRemove={() => setEditingBiz({ ...editingBiz, image: '' })}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
              <Save size={16} />
              <span>Save Business</span>
            </button>
            <button type="button" onClick={() => setEditingBiz(null)} className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bizList.map((biz) => (
          <div
            key={biz.id}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'rgba(124, 58, 237, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary-violet)',
              }}>
                <Briefcase size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{biz.name}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--secondary-violet)' }}>
                    [{biz.role}]
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {biz.number} · {biz.category}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  setEditingBiz({ ...biz });
                  setIsNew(false);
                }}
                style={{
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  color: 'var(--primary-cyan)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.8rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(biz.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  padding: '0.45rem',
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
  );
};
