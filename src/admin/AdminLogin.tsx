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

  // If already logged in, redirect directly to admin dashboard
  useEffect(() => {
    authService.verifySession().then(({ valid }) => {
      if (valid) {
        navigate('/admin', { replace: true });
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setError(null);
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at top, #111425 0%, #06070a 100%)',
      padding: '1.5rem',
      position: 'relative',
    }}>
      {/* Return to Portfolio Link */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-cyan)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <ArrowLeft size={16} />
        <span>BACK TO PORTFOLIO</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(12, 14, 22, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 240, 255, 0.08)',
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            margin: '0 auto 1rem',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(124, 58, 237, 0.15))',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-cyan)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.2)',
          }}>
            <Shield size={28} />
          </div>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 0.4rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em',
          }}>
            ADMIN <span className="gradient-text">CMS PORTAL</span>
          </h1>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            MUHAMMED ANSAB THALAPPIL
          </p>
        </div>


        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.5rem',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              marginBottom: '0.4rem',
              fontWeight: 600,
            }}>
              ADMIN USERNAME
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
              }} />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="ANSAB"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              marginBottom: '0.4rem',
              fontWeight: 600,
            }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
              }} />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 2.75rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: '0.75rem',
              padding: '0.9rem',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary-cyan), var(--secondary-violet))',
              color: '#050508',
              fontWeight: 700,
              fontSize: '0.95rem',
              fontFamily: 'var(--font-heading)',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(0, 240, 255, 0.25)',
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

        <div style={{
          marginTop: '1.75rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
        }}>
          Protected by rate limiting &amp; server-side encryption
        </div>
      </motion.div>
    </div>
  );
};
