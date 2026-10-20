import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Education } from '../../types';
import { authService } from '../../services/auth';

export const EducationTab: React.FC = () => {
  const { education, updateEducation } = usePortfolio();
  const [eduList, setEduList] = useState<Education[]>([...education]);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleStartCreate = () => {
    setEditingItem({
      degree: '',
      field: '',
      institution: '',
      status: 'Currently Pursuing',
      badge: 'Academic Milestone',
    });
    setIsNew(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setStatusMsg(null);

    try {
      const token = authService.getToken();
      const id = (editingItem as any).id || 'edu-' + Date.now();

      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'education',
          item: {
            id,
            degree: editingItem.degree,
            field: editingItem.field,
            institution: editingItem.institution,
            status: editingItem.status,
            badge: editingItem.badge,
            is_published: true,
          },
        }),
      });

      let updated: Education[];
      if (isNew) {
        updated = [...eduList, editingItem];
      } else {
        updated = eduList.map(e => e.institution === editingItem.institution ? editingItem : e);
      }

      setEduList(updated);
      updateEducation(updated);
      setEditingItem(null);
      setIsNew(false);
      setStatusMsg({ text: `Education entry for "${editingItem.institution}" saved!`, type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving education entry', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (institution: string) => {
    const item = eduList.find(e => e.institution === institution);
    const id = (item as any)?.id || 'edu-deleted';

    setSaving(true);
    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'delete_item', table: 'education', id }),
      });

      const updated = eduList.filter(e => e.institution !== institution);
      setEduList(updated);
      updateEducation(updated);
      setStatusMsg({ text: 'Education entry removed', type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error deleting entry', type: 'error' });
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
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Academic Education CMS</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage university, technical higher secondary degrees, credentials, and milestones
          </p>
        </div>
        {!editingItem && (
          <button onClick={handleStartCreate} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
            <Plus size={16} />
            <span>Add Qualification</span>
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
      {editingItem && (
        <form onSubmit={handleSave} style={{
          padding: '1.75rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          <div>
            <label style={labelStyle}>DEGREE / QUALIFICATION</label>
            <input
              type="text"
              required
              value={editingItem.degree}
              onChange={e => setEditingItem({ ...editingItem, degree: e.target.value })}
              placeholder="BACHELOR OF TECHNOLOGY"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>MAJOR / FIELD OF STUDY</label>
            <input
              type="text"
              required
              value={editingItem.field}
              onChange={e => setEditingItem({ ...editingItem, field: e.target.value })}
              placeholder="ARTIFICIAL INTELLIGENCE & DATA SCIENCE"
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>INSTITUTION NAME</label>
            <input
              type="text"
              required
              value={editingItem.institution}
              onChange={e => setEditingItem({ ...editingItem, institution: e.target.value })}
              placeholder="KMCT Engineering College, Manassery"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>STATUS (e.g. Currently Pursuing / Completed)</label>
            <input
              type="text"
              value={editingItem.status}
              onChange={e => setEditingItem({ ...editingItem, status: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>BADGE LABEL</label>
            <input
              type="text"
              value={editingItem.badge}
              onChange={e => setEditingItem({ ...editingItem, badge: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
              Save Qualification
            </button>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {eduList.map((item, idx) => (
          <div
            key={idx}
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
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(0, 240, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-cyan)',
              }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{item.degree}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-cyan)', background: 'rgba(0,240,255,0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {item.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {item.field} · {item.institution}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  setEditingItem({ ...item });
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
                onClick={() => handleDelete(item.institution)}
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
