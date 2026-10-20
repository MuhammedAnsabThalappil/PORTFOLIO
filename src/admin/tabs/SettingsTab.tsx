import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

export const SettingsTab: React.FC = () => {
  const { websiteSettings } = usePortfolio();
  const [form, setForm] = useState({ ...websiteSettings });
  const [ogImage, setOgImage] = useState('/assets/profile.jpg');
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
          table: 'website_settings',
          item: {
            id: 'main',
            site_title: form.siteTitle,
            meta_description: form.metaDescription,
            hero_tagline: form.heroTagline,
            footer_text: form.footerText,
            og_image: ogImage,
          },
        }),
      });

      // Update document title dynamically in browser
      document.title = form.siteTitle;

      setStatusMsg({ text: 'Website settings saved and updated live!', type: 'success' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: any) {
      setStatusMsg({ text: err.message || 'Error saving settings', type: 'error' });
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
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Website Metadata &amp; Global Settings</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Configure SEO tags, browser tab title, OpenGraph social card, and footer branding
          </p>
        </div>
        <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
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
        padding: '1.75rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <div>
          <label style={labelStyle}>BROWSER TAB TITLE &amp; SEO TITLE</label>
          <input
            type="text"
            required
            value={form.siteTitle}
            onChange={e => setForm({ ...form, siteTitle: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>SEO META DESCRIPTION</label>
          <textarea
            rows={3}
            required
            value={form.metaDescription}
            onChange={e => setForm({ ...form, metaDescription: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={labelStyle}>HERO SECTION BRAND SLOGAN</label>
          <input
            type="text"
            value={form.heroTagline}
            onChange={e => setForm({ ...form, heroTagline: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>FOOTER COPYRIGHT &amp; SIGNATURE</label>
          <input
            type="text"
            value={form.footerText}
            onChange={e => setForm({ ...form, footerText: e.target.value })}
            style={inputStyle}
          />
        </div>

        <ImageUploader
          label="OPENGRAPH SOCIAL SHARE PREVIEW IMAGE"
          currentUrl={ogImage}
          onUploadComplete={(url) => setOgImage(url)}
          onRemove={() => setOgImage('')}
          helperText="Displays when portfolio link is shared on LinkedIn, WhatsApp, Twitter, etc."
        />
      </div>
    </form>
  );
};
