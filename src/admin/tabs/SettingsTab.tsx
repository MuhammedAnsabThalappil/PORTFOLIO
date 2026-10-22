import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Palette, Sparkles, Check } from 'lucide-react';
import { usePortfolio, ACCENT_PRESETS, applyAccentTheme } from '../../context/PortfolioContext';
import { authService } from '../../services/auth';
import { ImageUploader } from '../components/ImageUploader';

export const SettingsTab: React.FC = () => {
  const { websiteSettings, updateWebsiteSettings } = usePortfolio();
  const [form, setForm] = useState({
    siteTitle: websiteSettings.siteTitle,
    metaDescription: websiteSettings.metaDescription,
    heroTagline: websiteSettings.heroTagline,
    footerText: websiteSettings.footerText,
    accentTheme: websiteSettings.accentTheme || 'violet',
  });
  const [ogImage, setOgImage] = useState('/assets/profile.jpg');
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSelectAccent = (themeId: string) => {
    setForm(prev => ({ ...prev, accentTheme: themeId }));
    applyAccentTheme(themeId);
    updateWebsiteSettings({ accentTheme: themeId });
  };

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
            accent_theme: form.accentTheme,
          },
        }),
      });

      // Update document title dynamically in browser
      document.title = form.siteTitle;
      updateWebsiteSettings({
        siteTitle: form.siteTitle,
        metaDescription: form.metaDescription,
        heroTagline: form.heroTagline,
        footerText: form.footerText,
        accentTheme: form.accentTheme,
      });

      setStatusMsg({ text: 'Website settings & theme saved and active!', type: 'success' });
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
    background: 'var(--bg-elevated, #1C2230)',
    border: '1px solid var(--border-color, #2A3140)',
    color: 'var(--text-primary, #F5F7FF)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted, #7E899D)',
    marginBottom: '0.4rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
  };

  const currentPreset = ACCENT_PRESETS[form.accentTheme] || ACCENT_PRESETS.violet;

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-primary, #F5F7FF)', fontFamily: 'var(--font-heading)' }}>
            Website Metadata &amp; Theme System
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted, #7E899D)' }}>
            Manage supported accent colors, SEO tags, tab title, and footer branding
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            borderRadius: '12px',
            background: 'var(--accent-primary, #7C6CFF)',
            color: '#ffffff',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            boxShadow: '0 4px 14px rgba(124, 108, 255, 0.4)',
            transition: 'all 0.2s ease',
            minHeight: '44px',
          }}
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {statusMsg && (
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          background: statusMsg.type === 'success' ? 'rgba(52, 211, 153, 0.12)' : 'rgba(248, 113, 113, 0.12)',
          border: `1px solid ${statusMsg.type === 'success' ? 'var(--success, #34D399)' : 'var(--error, #F87171)'}`,
          color: statusMsg.type === 'success' ? 'var(--success, #34D399)' : 'var(--error, #F87171)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.9rem',
        }}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* ── CENTRAL THEME ACCENT MANAGER ── */}
      <div style={{
        padding: '1.75rem',
        borderRadius: '16px',
        background: 'var(--bg-card, #161A24)',
        border: '1px solid var(--border-color, #2A3140)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Palette size={20} style={{ color: 'var(--accent-primary, #7C6CFF)' }} />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary, #F5F7FF)', fontWeight: 800 }}>
              CENTRAL THEME &amp; ACCENT PALETTE
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted, #7E899D)' }}>
              Unified Dark Neutral Base (#0B0D12 / #11141C / #161A24) with accessible accent presets
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {Object.values(ACCENT_PRESETS).map(preset => {
            const isSelected = form.accentTheme === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectAccent(preset.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(124, 108, 255, 0.08)' : 'var(--bg-elevated, #1C2230)',
                  border: isSelected ? `2px solid ${preset.primary}` : '1px solid var(--border-color, #2A3140)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: preset.primary,
                      boxShadow: `0 0 10px ${preset.primary}80`,
                    }} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary, #F5F7FF)' }}>
                      {preset.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: preset.primary,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Check size={12} />
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary, #A7B0C0)', lineHeight: 1.4 }}>
                  {preset.description}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    background: 'var(--bg-primary, #0B0D12)',
                    color: preset.primary,
                    border: '1px solid var(--border-color, #2A3140)',
                  }}>
                    {preset.primary}
                  </span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    background: 'var(--bg-primary, #0B0D12)',
                    color: preset.secondary,
                    border: '1px solid var(--border-color, #2A3140)',
                  }}>
                    {preset.secondary}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Preview Box */}
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          background: 'var(--bg-primary, #0B0D12)',
          border: '1px solid var(--border-color, #2A3140)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={16} style={{ color: currentPreset.primary }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-primary, #F5F7FF)', fontWeight: 600 }}>
              Active Accent Preview: <span style={{ color: currentPreset.primary }}>{currentPreset.name}</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              background: `${currentPreset.primary}20`,
              border: `1px solid ${currentPreset.primary}50`,
              color: currentPreset.primary,
              fontWeight: 700,
            }}>
              Sample Badge
            </span>

            <button
              type="button"
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                background: currentPreset.primary,
                color: '#ffffff',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'default',
              }}
            >
              Action Button
            </button>
          </div>
        </div>
      </div>

      {/* ── METADATA & CONTENT SETTINGS ── */}
      <div style={{
        padding: '1.75rem',
        borderRadius: '16px',
        background: 'var(--bg-card, #161A24)',
        border: '1px solid var(--border-color, #2A3140)',
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
