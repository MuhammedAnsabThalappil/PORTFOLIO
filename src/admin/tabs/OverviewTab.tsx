import React from 'react';
import {
  FolderKanban,
  Trophy,
  Briefcase,
  Layers,
  Mail,
  Plus,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface OverviewTabProps {
  onNavigate: (tab: string) => void;
  onOpenChangePassword: () => void;
  isTemporaryPassword: boolean;
  unreadCount: number;
  recentMessages: any[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onNavigate,
  onOpenChangePassword,
  isTemporaryPassword,
  unreadCount,
  recentMessages,
}) => {
  const { allProjects, secondaryAchievements, heroAchievement, businesses, experience } = usePortfolio();

  const totalAchievements = 1 + secondaryAchievements.length;
  const draftProjectsCount = allProjects.filter(p => (p as any).isDraft).length;
  const publishedProjectsCount = allProjects.length - draftProjectsCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Security Warning Banner if using default 2006 */}
      {isTemporaryPassword && (
        <div style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '14px',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
            }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.25rem', color: '#fff', fontSize: '1rem' }}>
                Temporary Development Password Active (2006)
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Please change your password to a strong phrase before deploying this site to production.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenChangePassword}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Change Password Now</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
      }}>
        {[
          { label: 'Total Projects', value: allProjects.length, sub: `${publishedProjectsCount} Published · ${draftProjectsCount} Drafts`, icon: <FolderKanban size={20} style={{ color: 'var(--primary-cyan)' }} />, tab: 'projects' },
          { label: 'Achievements', value: totalAchievements, sub: 'CONVERGE 1st · INSPIRE Award', icon: <Trophy size={20} style={{ color: '#f59e0b' }} />, tab: 'achievements' },
          { label: 'Businesses', value: businesses.length, sub: 'Motherbits, King Day, Zoltiq', icon: <Briefcase size={20} style={{ color: 'var(--secondary-violet)' }} />, tab: 'businesses' },
          { label: 'Unread Messages', value: unreadCount, sub: 'Submissions from visitors', icon: <Mail size={20} style={{ color: 'var(--accent-emerald)' }} />, tab: 'messages' },
        ].map((card, i) => (
          <div
            key={i}
            onClick={() => onNavigate(card.tab)}
            style={{
              padding: '1.5rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {card.label}
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.6rem' }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Live Link */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(0, 240, 255, 0.03)',
        border: '1px solid rgba(0, 240, 255, 0.15)',
      }}>
        <div>
          <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#fff' }}>Quick CMS Actions</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Create new records or update current sections directly</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => onNavigate('projects')}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Manage Projects</span>
          </button>
          <button
            onClick={() => onNavigate('achievements')}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Manage Achievements</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <span>Update Resume</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <span>View Public Site</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* Recent Contact Submissions */}
      <div style={{
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        padding: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={18} style={{ color: 'var(--accent-emerald)' }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Recent Inquiries &amp; Messages</h3>
          </div>
          <button
            onClick={() => onNavigate('messages')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-cyan)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>View All Messages</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {recentMessages.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            No contact messages received yet. Submissions from the public contact form will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentMessages.slice(0, 5).map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: msg.is_read ? 'rgba(255,255,255,0.015)' : 'rgba(0, 240, 255, 0.04)',
                  border: `1px solid ${msg.is_read ? 'var(--border-color)' : 'rgba(0, 240, 255, 0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{msg.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)' }}>{msg.email}</span>
                    {!msg.is_read && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        background: 'rgba(0,240,255,0.2)',
                        color: 'var(--primary-cyan)',
                        fontWeight: 700,
                      }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '600px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.message}
                  </p>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {new Date(msg.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
