import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Check, X, Eye, ExternalLink, Image as ImageIcon, Save, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

export const ProjectsTab: React.FC = () => {
  const { allProjects, updateProjects } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const initialNewProject: Project = {
    id: 'project-' + Date.now(),
    number: `PROJECT 0${allProjects.length + 1}`,
    name: '',
    category: '',
    description: '',
    highlights: [],
    technologies: [],
    image: '',
    viewUrl: '#',
    githubUrl: 'https://github.com/',
    isFeatured: false,
  };

  const handleStartCreate = () => {
    setEditingProject({ ...initialNewProject });
    setIsCreating(true);
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setStatusMsg(null);

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
          table: 'projects',
          item: {
            id: editingProject.id,
            slug: editingProject.id,
            number: editingProject.number,
            name: editingProject.name,
            category: editingProject.category,
            description: editingProject.description,
            highlights: editingProject.highlights || [],
            technologies: editingProject.technologies || [],
            image: editingProject.image,
            view_url: editingProject.viewUrl,
            github_url: editingProject.githubUrl,
            is_featured: editingProject.isFeatured,
            is_published: true,
            is_draft: false,
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to save project');

      let updatedList: Project[];
      if (isCreating) {
        updatedList = [...allProjects, editingProject];
      } else {
        updatedList = allProjects.map(p => p.id === editingProject.id ? editingProject : p);
      }

      // If set as featured, ensure others are not
      if (editingProject.isFeatured) {
        updatedList = updatedList.map(p => ({
          ...p,
          isFeatured: p.id === editingProject.id,
        }));
      }

      updateProjects(updatedList);
      setStatusMsg({ text: `Project "${editingProject.name}" saved successfully!`, type: 'success' });
      setEditingProject(null);
      setIsCreating(false);
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving project', type: 'error' });
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'delete_item', table: 'projects', id }),
      });

      const updated = allProjects.filter(p => p.id !== id);
      updateProjects(updated);
      setDeleteConfirmId(null);
      setStatusMsg({ text: 'Project deleted successfully', type: 'success' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Failed to delete project', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= allProjects.length) return;

    const copy = [...allProjects];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    updateProjects(copy);

    const token = authService.getToken();
    fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action: 'reorder_items', table: 'projects', orderedIds: copy.map(p => p.id) }),
    });
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Projects Portfolio CMS</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage featured projects, extra builds, images, and live links
          </p>
        </div>
        {!editingProject && (
          <button onClick={handleStartCreate} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
            <Plus size={16} />
            <span>Add New Project</span>
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
          {statusMsg.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Editor Modal / Panel */}
      {editingProject && (
        <form onSubmit={handleSaveProject} style={{
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
              {isCreating ? 'Create New Project' : `Edit: ${editingProject.name}`}
            </h3>
            <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>PROJECT NUMBER / BADGE</label>
              <input
                type="text"
                required
                value={editingProject.number}
                onChange={e => setEditingProject({ ...editingProject, number: e.target.value })}
                placeholder="e.g. PROJECT 01"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>PROJECT NAME / TITLE</label>
              <input
                type="text"
                required
                value={editingProject.name}
                onChange={e => setEditingProject({ ...editingProject, name: e.target.value })}
                placeholder="AI-Powered Smart Attendance System"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>CATEGORY / TAGLINE</label>
              <input
                type="text"
                value={editingProject.category}
                onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                placeholder="Machine Learning • Computer Vision • Python"
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea
                rows={3}
                required
                value={editingProject.description}
                onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Detailed project summary..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={labelStyle}>TECHNOLOGIES (comma separated)</label>
              <input
                type="text"
                value={editingProject.technologies.join(', ')}
                onChange={e => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="Python, OpenCV, Flutter, SQL"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>HIGHLIGHTS (comma separated)</label>
              <input
                type="text"
                value={(editingProject.highlights || []).join(', ')}
                onChange={e => setEditingProject({ ...editingProject, highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                placeholder="INSPIRE Award, 1st Prize, Live App"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>VIEW URL / DEMO LINK</label>
              <input
                type="text"
                value={editingProject.viewUrl || ''}
                onChange={e => setEditingProject({ ...editingProject, viewUrl: e.target.value })}
                placeholder="https://... or #achievement"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>GITHUB REPO URL</label>
              <input
                type="text"
                value={editingProject.githubUrl || ''}
                onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                style={inputStyle}
              />
            </div>
          </div>

          {/* Image Uploader */}
          <ImageUploader
            label="COVER IMAGE (SUPABASE STORAGE)"
            currentUrl={editingProject.image}
            onUploadComplete={(url) => setEditingProject({ ...editingProject, image: url })}
            onRemove={() => setEditingProject({ ...editingProject, image: '' })}
            helperText="Supports JPG, PNG, WebP up to 5MB"
          />

          {/* Featured Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              id="isFeatured"
              checked={editingProject.isFeatured || false}
              onChange={e => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-cyan)' }}
            />
            <label htmlFor="isFeatured" style={{ color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}>
              Set as <strong>Hero Featured Project</strong> (displays as main spotlight banner)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Project'}</span>
            </button>
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Projects List Table */}
      <div style={{
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>Active Projects ({allProjects.length})</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            Use arrows to reorder
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {allProjects.map((project, idx) => (
            <div
              key={project.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 1.5rem',
                borderBottom: idx < allProjects.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '240px' }}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
                    <ImageIcon size={20} />
                  </div>
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{project.name}</span>
                    {project.isFeatured && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        background: 'rgba(0,240,255,0.2)',
                        color: 'var(--primary-cyan)',
                        fontWeight: 700,
                      }}>
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {project.number} · {project.category}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  title="Move Up"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: idx === 0 ? 'var(--text-dim)' : '#fff',
                    padding: '0.45rem',
                    cursor: idx === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  title="Move Down"
                  disabled={idx === allProjects.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: idx === allProjects.length - 1 ? 'var(--text-dim)' : '#fff',
                    padding: '0.45rem',
                    cursor: idx === allProjects.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  title="Edit"
                  onClick={() => handleStartEdit(project)}
                  style={{
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'var(--primary-cyan)',
                    padding: '0.45rem 0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                  }}
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>

                {deleteConfirmId === project.id ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      style={{
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Confirm Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(null)}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => setDeleteConfirmId(project.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-dim)',
                      padding: '0.45rem',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
