import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Trophy,
  Briefcase,
  GraduationCap,
  Wrench,
  Rocket,
  FileText,
  Mail,
  Settings,
  BarChart3,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  KeyRound,
  Database,
  Image as ImageIcon,
} from 'lucide-react';
import { authService } from '../services/auth';
import { usePortfolio } from '../context/PortfolioContext';

// Tabs
import { OverviewTab } from './tabs/OverviewTab';
import { AboutTab } from './tabs/AboutTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { EducationTab } from './tabs/EducationTab';
import { SkillsTab } from './tabs/SkillsTab';
import { BusinessesTab } from './tabs/BusinessesTab';
import { ProfileResumeTab } from './tabs/ProfileResumeTab';
import { MessagesTab } from './tabs/MessagesTab';
import { SettingsTab } from './tabs/SettingsTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { ChangePasswordModal } from './components/ChangePasswordModal';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isLiveConnected } = usePortfolio();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isTempPassword, setIsTempPassword] = useState<boolean>(authService.isTemporaryPassword());
  const [username, setUsername] = useState<string>(authService.getUsername());
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  // Authenticate session on mount
  useEffect(() => {
    authService.verifySession().then(({ valid, user }) => {
      if (!valid) {
        navigate('/admin/login', { replace: true });
      } else if (user) {
        setIsTempPassword(user.isTemporary);
        setUsername(user.username);
      }
    });
  }, [navigate]);

  // Load message notification badge count
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const token = authService.getToken();
        const res = await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ action: 'get_messages' }),
        });
        const data = await res.json();
        if (data.messages) {
          setRecentMessages(data.messages);
          const unread = data.messages.filter((m: any) => !m.is_read).length;
          setUnreadCount(unread);
        }
      } catch {
        // Dev fallback
      }
    };
    fetchUnread();
  }, [activeTab]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'about', label: 'About Me', icon: <User size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <ImageIcon size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'Skills & Toolkit', icon: <Wrench size={18} /> },
    { id: 'businesses', label: 'Businesses', icon: <Rocket size={18} /> },
    { id: 'profile', label: 'Profile & Resume', icon: <FileText size={18} /> },
    { id: 'messages', label: 'Contact Messages', icon: <Mail size={18} />, badge: unreadCount },
    { id: 'settings', label: 'Website Settings', icon: <Settings size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-primary, #0B0D12)',
      color: 'var(--text-primary, #F5F7FF)',
      fontFamily: 'var(--font-body)',
      position: 'relative',
    }}>
      {/* ── Sidebar Navigation (Desktop) ── */}
      <aside
        className="admin-sidebar"
        style={{
          width: '260px',
          background: 'var(--bg-secondary, #11141C)',
          borderRight: '1px solid var(--border-color, #2A3140)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 100,
        }}
      >
        <div>
          {/* Logo / Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color, #2A3140)' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--accent-primary, #7C6CFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: '0 0 12px rgba(124, 108, 255, 0.4)',
              }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary, #F5F7FF)', letterSpacing: '-0.02em' }}>
                  ANSAB <span style={{ color: 'var(--accent-primary, #7C6CFF)' }}>CMS</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #7E899D)', fontFamily: 'var(--font-mono)' }}>
                  PORTFOLIO CONTROL PANEL
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem',
                  borderRadius: '10px',
                  background: activeTab === item.id ? 'rgba(124, 108, 255, 0.12)' : 'transparent',
                  border: activeTab === item.id ? '1px solid rgba(124, 108, 255, 0.3)' : '1px solid transparent',
                  color: activeTab === item.id ? 'var(--accent-primary, #7C6CFF)' : 'var(--text-secondary, #A7B0C0)',
                  fontWeight: activeTab === item.id ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.18s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>

                {Boolean(item.badge) && (
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '9999px',
                    background: 'var(--accent-primary, #7C6CFF)',
                    color: '#ffffff',
                    fontWeight: 800,
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-color, #2A3140)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: 'var(--error, #F87171)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              padding: '0.4rem 0',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header style={{
          height: '68px',
          background: 'rgba(17, 20, 28, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color, #2A3140)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1rem, 3vw, 2rem)',
          position: 'sticky',
          top: 0,
          zIndex: 90,
        }}>
          {/* Mobile hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="admin-mobile-toggle"
              style={{
                display: 'none',
                background: 'var(--bg-card, #161A24)',
                border: '1px solid var(--border-color, #2A3140)',
                color: 'var(--text-primary, #F5F7FF)',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '0.4rem',
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Database indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isLiveConnected ? 'var(--success, #34D399)' : 'var(--accent-secondary, #36D6C5)',
                boxShadow: `0 0 10px ${isLiveConnected ? 'var(--success, #34D399)' : 'var(--accent-secondary, #36D6C5)'}`,
              }} />
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted, #7E899D)' }}>
                {isLiveConnected ? 'Supabase Connected' : 'Local Dev Active'}
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Temporary password warning button */}
            {isTempPassword && (
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(248, 113, 113, 0.15)',
                  border: '1px solid rgba(248, 113, 113, 0.4)',
                  color: 'var(--error, #F87171)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                <ShieldAlert size={14} />
                <span>Change Temporary Password</span>
              </button>
            )}

            {/* Change password button */}
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              title="Security Settings"
              style={{
                background: 'var(--bg-elevated, #1C2230)',
                border: '1px solid var(--border-color, #2A3140)',
                borderRadius: '8px',
                color: 'var(--text-secondary, #A7B0C0)',
                padding: '0.45rem 0.65rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary, #F5F7FF)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary, #A7B0C0)')}
            >
              <KeyRound size={14} />
              <span>Security</span>
            </button>

            {/* View live public site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(124, 108, 255, 0.12)',
                border: '1px solid rgba(124, 108, 255, 0.3)',
                color: 'var(--accent-primary, #7C6CFF)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <span>VIEW PORTFOLIO</span>
              <ExternalLink size={13} />
            </a>

            {/* Admin user pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              background: 'var(--bg-elevated, #1C2230)',
              border: '1px solid var(--border-color, #2A3140)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary, #F5F7FF)',
            }}>
              <User size={13} style={{ color: 'var(--accent-primary, #7C6CFF)' }} />
              <span>{username}</span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            top: '68px',
            background: 'var(--bg-secondary, #11141C)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            overflowY: 'auto',
          }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: activeTab === item.id ? 'rgba(124, 108, 255, 0.15)' : 'var(--bg-card, #161A24)',
                  border: `1px solid ${activeTab === item.id ? 'rgba(124, 108, 255, 0.4)' : 'var(--border-color, #2A3140)'}`,
                  color: activeTab === item.id ? 'var(--accent-primary, #7C6CFF)' : 'var(--text-primary, #F5F7FF)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </button>
            ))}

            <button
              onClick={handleLogout}
              style={{
                marginTop: '1rem',
                padding: '0.85rem',
                borderRadius: '10px',
                background: 'rgba(248, 113, 113, 0.1)',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                color: 'var(--error, #F87171)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        )}


        {/* Tab Viewport */}
        <main style={{ flex: 1, padding: 'clamp(1.25rem, 3vw, 2.5rem)', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'overview' && (
            <OverviewTab
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenChangePassword={() => setIsPasswordModalOpen(true)}
              isTemporaryPassword={isTempPassword}
              unreadCount={unreadCount}
              recentMessages={recentMessages}
            />
          )}

          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'achievements' && <AchievementsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'experience' && <ExperienceTab />}
          {activeTab === 'education' && <EducationTab />}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'businesses' && <BusinessesTab />}
          {activeTab === 'profile' && <ProfileResumeTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'settings' && <SettingsTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
        </main>
      </div>

      {/* Password Change Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setIsTempPassword(false);
          setIsPasswordModalOpen(false);
        }}
      />
    </div>
  );
};
