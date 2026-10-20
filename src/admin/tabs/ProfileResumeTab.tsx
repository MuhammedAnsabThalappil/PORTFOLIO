import React, { useState } from 'react';
import { Save, User, FileText, CheckCircle2, AlertCircle, ExternalLink, Globe } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

export const ProfileResumeTab: React.FC = () => {
  const { profile, socials, updateProfile, updateSocials } = usePortfolio();

  const [profilePhoto, setProfilePhoto] = useState<string>((profile as any).profile_image || '/assets/ansab.jpeg');
  const [resumeUrl, setResumeUrl] = useState<string>((profile as any).resume_url || '/assets/resume.pdf');
  const [socialForm, setSocialForm] = useState({ ...socials });
  const [fullName, setFullName] = useState(profile.fullName);
  const [location, setLocation] = useState(profile.location);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const token = authService.getToken();

      // Save profile picture & resume
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'profile',
          item: {
            id: 'ansab',
            full_name: fullName,
            location: location,
            profile_image: profilePhoto,
            resume_url: resumeUrl,
          },
        }),
      });

      // Save socials
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          action: 'save_item',
          table: 'socials',
          item: {
            id: 'main',
            linkedin: socialForm.linkedin,
            github: socialForm.github,
            email: socialForm.email,
            location: socialForm.location,
          },
        }),
      });

      updateProfile({ fullName, location, ...({ profile_image: profilePhoto, resume_url: resumeUrl } as any) });
      updateSocials(socialForm);

      setStatusMsg({ text: 'Profile, resume, and contact links saved successfully!', type: 'success' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving changes', type: 'error' });
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
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Profile &amp; Resume Assets</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Upload profile photo, manage resume PDF in Supabase Storage, and update social channels
          </p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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

      {/* File Uploads Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Profile Photo */}
        <div style={{
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <User size={20} style={{ color: 'var(--primary-cyan)' }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Profile Photo</h3>
          </div>

          <ImageUploader
            label="OFFICIAL HEADSHOT / AVATAR"
            currentUrl={profilePhoto}
            onUploadComplete={(url) => setProfilePhoto(url)}
            onRemove={() => setProfilePhoto('')}
            helperText="Stored in Supabase 'portfolio-images' bucket"
          />
        </div>

        {/* Resume Document */}
        <div style={{
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <FileText size={20} style={{ color: 'var(--secondary-violet)' }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Official Resume / CV</h3>
          </div>

          <ImageUploader
            label="RESUME DOCUMENT (PDF / DOCX)"
            currentUrl={resumeUrl}
            acceptType="resume"
            onUploadComplete={(url) => setResumeUrl(url)}
            onRemove={() => setResumeUrl('')}
            helperText="Stored in Supabase 'portfolio-resumes' bucket"
          />
        </div>
      </div>

      {/* Social Links & Public Contact Info */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Globe size={20} style={{ color: 'var(--accent-emerald)' }} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Social Profiles &amp; Public Contact</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>LINKEDIN URL</label>
            <input
              type="text"
              value={socialForm.linkedin}
              onChange={e => setSocialForm({ ...socialForm, linkedin: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>GITHUB PROFILE URL</label>
            <input
              type="text"
              value={socialForm.github}
              onChange={e => setSocialForm({ ...socialForm, github: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>PUBLIC EMAIL ADDRESS (mailto:)</label>
            <input
              type="text"
              value={socialForm.email}
              onChange={e => setSocialForm({ ...socialForm, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>PUBLIC LOCATION DISPLAY</label>
            <input
              type="text"
              value={socialForm.location}
              onChange={e => setSocialForm({ ...socialForm, location: e.target.value })}
              style={inputStyle}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
