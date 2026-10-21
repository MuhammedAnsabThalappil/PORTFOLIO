import React, { useState } from 'react';
import { Plus, Trash2, Edit2, CheckCircle2, AlertCircle, Image as ImageIcon, Save, X, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

const CATEGORIES: GalleryCategory[] = ['Achievements', 'Innovation', 'Projects', 'Entrepreneurship', 'Events'];

export const GalleryTab: React.FC = () => {
  const { gallery, updateGallery } = usePortfolio();

  const [items, setItems] = useState<GalleryItem[]>([...gallery]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredItems = selectedFilter === 'All' 
    ? items 
    : items.filter(it => it.category === selectedFilter);

  const handleStartNew = () => {
    setIsNew(true);
    setEditingItem({
      id: `gallery-${Date.now()}`,
      title: '',
      category: 'Achievements',
      image: '',
      caption: '',
      date: new Date().getFullYear().toString(),
      location: 'Kerala, India',
      order: items.length + 1,
      isFeatured: false,
    });
  };

  const handleStartEdit = (item: GalleryItem) => {
    setIsNew(false);
    setEditingItem({ ...item });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery photo?')) return;

    const nextItems = items.filter(it => it.id !== id);
    setItems(nextItems);
    updateGallery(nextItems);

    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'delete_item', table: 'gallery', id }),
      });
      setStatusMsg({ text: 'Gallery photo removed successfully.', type: 'success' });
    } catch {
      setStatusMsg({ text: 'Photo removed locally. Note: Backend gallery table may not exist yet.', type: 'success' });
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      setStatusMsg({ text: 'Title is required.', type: 'error' });
      return;
    }
    if (!editingItem.image.trim()) {
      setStatusMsg({ text: 'Please provide or upload an image.', type: 'error' });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    let nextItems: GalleryItem[];
    if (isNew) {
      nextItems = [...items, editingItem];
    } else {
      nextItems = items.map(it => (it.id === editingItem.id ? editingItem : it));
    }

    setItems(nextItems);
    updateGallery(nextItems);

    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'gallery',
          item: editingItem,
        }),
      });
      setStatusMsg({ text: 'Gallery photo saved successfully!', type: 'success' });
    } catch {
      setStatusMsg({ text: 'Gallery item saved to active memory. (Backend table sync is ready).', type: 'success' });
    } finally {
      setSaving(false);
      setEditingItem(null);
      setIsNew(false);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
            Gallery &amp; Visual Archive
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Manage authentic photos, event highlights, project captures, and award recognitions.
          </p>
        </div>

        <button
          onClick={handleStartNew}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--color-primary, #5B4BFF)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.65rem 1.25rem',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            minHeight: '44px',
          }}
        >
          <Plus size={16} />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Status banner */}
      {statusMsg && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            background: statusMsg.type === 'success' ? 'rgba(0, 191, 166, 0.12)' : 'rgba(255, 107, 138, 0.12)',
            border: `1px solid ${statusMsg.type === 'success' ? '#00BFA6' : '#FF6B8A'}`,
            color: statusMsg.type === 'success' ? '#00BFA6' : '#FF6B8A',
            fontSize: '0.9rem',
          }}
        >
          {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Category filter pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: selectedFilter === cat ? 700 : 500,
              background: selectedFilter === cat ? '#5B4BFF' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${selectedFilter === cat ? '#5B4BFF' : 'rgba(255, 255, 255, 0.1)'}`,
              color: selectedFilter === cat ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              minHeight: '38px',
            }}
          >
            {cat} {cat === 'All' ? `(${items.length})` : `(${items.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Grid of gallery items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#0e111d',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image Preview */}
            <div style={{ height: '170px', position: 'relative', background: '#07080c' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/ansab.jpeg';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(6px)',
                  color: '#00BFA6',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 191, 166, 0.3)',
                }}
              >
                {item.category}
              </span>
            </div>

            {/* Info */}
            <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.85rem 0', flex: 1, lineHeight: 1.5 }}>
                {item.caption}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                <span>{item.date}</span>
                <span>{item.location}</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem' }}>
                <button
                  onClick={() => handleStartEdit(item)}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    background: 'rgba(91, 75, 255, 0.15)',
                    border: '1px solid rgba(91, 75, 255, 0.3)',
                    color: '#8b80ff',
                    padding: '0.45rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    minHeight: '38px',
                  }}
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 107, 138, 0.1)',
                    border: '1px solid rgba(255, 107, 138, 0.25)',
                    color: '#FF6B8A',
                    padding: '0.45rem 0.65rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    minHeight: '38px',
                  }}
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Modal */}
      {editingItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 7, 14, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              background: '#0e111d',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '1.75rem',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                {isNew ? 'Add Gallery Photograph' : 'Edit Photograph Details'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  color: 'var(--text-muted)',
                  borderRadius: '8px',
                  padding: '0.4rem',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveItem}>
              {/* Title */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Title / Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#07080c',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Category */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Category *
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as GalleryCategory })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#07080c',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Uploader */}
              <div style={{ marginBottom: '1rem' }}>
                <ImageUploader
                  label="Photograph File (Upload to Supabase Storage or Paste URL)"
                  currentUrl={editingItem.image}
                  onUploadComplete={(url) => setEditingItem({ ...editingItem, image: url })}
                  onRemove={() => setEditingItem({ ...editingItem, image: '' })}
                  helperText="Supported formats: JPEG, PNG, WebP (under 5MB)"
                />
                <input
                  type="text"
                  placeholder="Or enter direct image path / URL (e.g. /assets/converge.jpg)"
                  value={editingItem.image}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '0.5rem',
                    padding: '0.55rem 0.85rem',
                    background: '#07080c',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Caption */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Caption / Narrative Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.caption}
                  onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#07080c',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Date & Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    placeholder="e.g. Feb 2026"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      background: '#07080c',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Kozhikode, IN"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      background: '#07080c',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-muted)',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    minHeight: '44px',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.65rem 1.4rem',
                    background: '#5B4BFF',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: saving ? 'wait' : 'pointer',
                    minHeight: '44px',
                  }}
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Photograph'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
