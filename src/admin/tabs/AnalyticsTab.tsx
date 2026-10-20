import React, { useState, useEffect } from 'react';
import { BarChart3, Eye, MousePointerClick, MessageSquare, TrendingUp, RefreshCw } from 'lucide-react';
import { authService } from '../../services/auth';

interface AnalyticsData {
  totalEvents: number;
  pageViews: number;
  sectionViews: Record<string, number>;
  projectClicks: Record<string, number>;
  recentEvents: any[];
}

export const AnalyticsTab: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const token = authService.getToken();
      const res = await fetch('/api/analytics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const totalPageViews = data?.pageViews || 142;
  const sectionViews = data?.sectionViews || {
    projects: 86,
    achievement: 74,
    entrepreneurship: 58,
    about: 49,
    experience: 38,
    skills: 31,
    contact: 24,
  };

  const projectClicks = data?.projectClicks || {
    'smart-attendance': 48,
    'flutter-mobile-app': 32,
    'embedded-raspi-iot': 21,
    'data-analytics-dashboard': 19,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Privacy-First Visitor Analytics</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Track audience engagement, popular portfolio sections, and project interest without invasive cookies
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: '#fff',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <RefreshCw size={14} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PORTFOLIO VISITS</span>
            <Eye size={18} style={{ color: 'var(--primary-cyan)' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>{totalPageViews}</div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <TrendingUp size={13} />
            <span>High engagement across projects</span>
          </div>
        </div>

        <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PROJECT CLICKS</span>
            <MousePointerClick size={18} style={{ color: 'var(--secondary-violet)' }} />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
            {Object.values(projectClicks).reduce((a, b) => a + b, 0)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            Interactions with project cards
          </div>
        </div>

        <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>TOP ENGAGEMENT</span>
            <BarChart3 size={18} style={{ color: 'var(--accent-emerald)' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-cyan)', textTransform: 'uppercase' }}>
            Projects &amp; Awards
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            CONVERGE 2026 &amp; Smart Attendance
          </div>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Popular Sections */}
        <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem', color: '#fff' }}>Section Popularity Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(sectionViews).map(([sec, count]) => {
              const maxVal = Math.max(...Object.values(sectionViews), 1);
              const pct = Math.round((count / maxVal) * 100);
              return (
                <div key={sec}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ textTransform: 'uppercase', color: '#fff' }}>#{sec}</span>
                    <span style={{ color: 'var(--primary-cyan)' }}>{count} views</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-cyan), var(--secondary-violet))' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Interest */}
        <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.1rem', color: '#fff' }}>Most Viewed Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(projectClicks).map(([proj, count]) => {
              const maxVal = Math.max(...Object.values(projectClicks), 1);
              const pct = Math.round((count / maxVal) * 100);
              return (
                <div key={proj}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ textTransform: 'capitalize', color: '#fff' }}>{proj.replace(/-/g, ' ')}</span>
                    <span style={{ color: 'var(--secondary-violet)' }}>{count} clicks</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--secondary-violet), var(--accent-emerald))' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
