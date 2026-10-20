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
      background: '#07080c',
      color: '#ffffff',
      fontFamily: 'var(--font-body)',
      position: 'relative',
    }}>
      {/* ── Sidebar Navigation (Desktop) ── */}
      <aside
        className="admin-sidebar"
        style={{
          width: '260px',
          background: 'rgba(12, 14, 22, 0.95)',
          borderRight: '1px solid var(--border-color)',
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
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary-cyan), var(--secondary-violet))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#050508',
                fontWeight: 900,
                fontSize: '1rem',
              }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                  ANSAB <span style={{ color: 'var(--primary-cyan)' }}>CMS</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
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
                  background: activeTab === item.id ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                  border: activeTab === item.id ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
                  color: activeTab === item.id ? 'var(--primary-cyan)' : 'var(--text-muted)',
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
                    background: 'var(--primary-cyan)',
                    color: '#050508',
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
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: '#ef4444',
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
          background: 'rgba(12, 14, 22, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
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
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Database indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isLiveConnected ? '#10b981' : 'var(--primary-cyan)',
                boxShadow: `0 0 10px ${isLiveConnected ? '#10b981' : 'var(--primary-cyan)'}`,
              }} />
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
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
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ef4444',
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
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                padding: '0.45rem 0.65rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
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
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                color: 'var(--primary-cyan)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textDecoration: 'none',
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
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: '#fff',
            }}>
              <User size={13} style={{ color: 'var(--primary-cyan)' }} />
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
            background: 'rgba(7, 8, 12, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
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
                  background: activeTab === item.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${activeTab === item.id ? 'rgba(0, 240, 255, 0.3)' : 'var(--border-color)'}`,
                  color: activeTab === item.id ? 'var(--primary-cyan)' : '#fff',
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
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
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
