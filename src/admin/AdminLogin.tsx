import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { authService } from '../services/auth';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('ANSAB');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect directly to admin dashboard
  useEffect(() => {
    authService.verifySession().then(({ valid }) => {
      if (valid) {
        navigate('/admin', { replace: true });
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setError(null);
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at top, #161A24 0%, #0B0D12 70%)',
        padding: '1.25rem',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Return to Portfolio Link */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary, #A7B0C0)',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          textDecoration: 'none',
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color, #2A3140)',
          minHeight: '44px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-primary, #7C6CFF)';
          e.currentTarget.style.borderColor = 'var(--accent-primary, #7C6CFF)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary, #A7B0C0)';
          e.currentTarget.style.borderColor = 'var(--border-color, #2A3140)';
        }}
      >
        <ArrowLeft size={16} />
        <span>BACK TO PORTFOLIO</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-card, #161A24)',
          border: '1px solid var(--border-color, #2A3140)',
          borderRadius: '20px',
          padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65), 0 0 40px rgba(124, 108, 255, 0.08)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 1.25rem',
              borderRadius: '14px',
              background: 'rgba(124, 108, 255, 0.12)',
              border: '1px solid rgba(124, 108, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary, #7C6CFF)',
              boxShadow: '0 0 25px rgba(124, 108, 255, 0.25)',
            }}
          >
            <Shield size={28} />
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--text-primary, #F5F7FF)',
              margin: '0 0 0.4rem',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            ADMIN <span className="gradient-text">CMS PORTAL</span>
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: '0.8rem',
              color: 'var(--text-secondary, #A7B0C0)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            MUHAMMED ANSAB THALAPPIL
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              background: 'rgba(248, 113, 113, 0.12)',
              border: '1px solid rgba(248, 113, 113, 0.35)',
              color: 'var(--error, #F87171)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '1.5rem',
              lineHeight: 1.45,
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary, #A7B0C0)',
                marginBottom: '0.45rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              ADMIN USERNAME
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted, #7E899D)',
                }}
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ANSAB"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  background: 'var(--bg-elevated, #1C2230)',
                  border: '1px solid var(--border-color, #2A3140)',
                  color: 'var(--text-primary, #F5F7FF)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)',
                  minHeight: '48px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary, #7C6CFF)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color, #2A3140)')}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary, #A7B0C0)',
                marginBottom: '0.45rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted, #7E899D)',
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  background: 'var(--bg-elevated, #1C2230)',
                  border: '1px solid var(--border-color, #2A3140)',
                  color: 'var(--text-primary, #F5F7FF)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  minHeight: '48px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary, #7C6CFF)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color, #2A3140)')}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            style={{
              marginTop: '0.5rem',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              background: 'var(--accent-primary, #7C6CFF)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              fontFamily: 'var(--font-heading)',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              minHeight: '48px',
              boxShadow: '0 4px 16px rgba(124, 108, 255, 0.4)',
              transition: 'background 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--accent-hover, #9387FF)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--accent-primary, #7C6CFF)';
            }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>ACCESS DASHBOARD</span>
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div
          style={{
            marginTop: '1.75rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted, #7E899D)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Protected by rate limiting &amp; server-side encryption
        </div>
      </motion.div>
    </div>
  );
};
