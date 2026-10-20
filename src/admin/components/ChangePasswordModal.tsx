import React, { useState } from 'react';
import { X, Lock, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { authService } from '../../services/auth';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Validation rules
  const isMinLength = newPassword.length >= 8;
  const isNotTemp = newPassword !== '2006';
  const hasSymbolOrNum = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);
  const isMatching = newPassword.length > 0 && newPassword === confirmPassword;
  const isValid = isMinLength && isNotTemp && hasSymbolOrNum && isMatching;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setError(null);
    setLoading(true);

    try {
      await authService.changePassword(currentPassword, newPassword);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#0c0d14',
        border: '1px solid rgba(0, 240, 255, 0.3)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 240, 255, 0.1)',
        position: 'relative',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-cyan)',
          }}>
            <Lock size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>Change Password</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required before production deployment</p>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#ef4444',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#10b981',
            textAlign: 'center',
          }}>
            <ShieldCheck size={40} style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>Password Updated!</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Your session has been securely refreshed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                CURRENT PASSWORD
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password (e.g. 2006)"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                NEW STRONG PASSWORD
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                CONFIRM NEW PASSWORD
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            {/* Checklist */}
            <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isMinLength ? '#10b981' : 'var(--text-dim)' }}>
                <Check size={13} /> <span>At least 8 characters</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: hasSymbolOrNum ? '#10b981' : 'var(--text-dim)' }}>
                <Check size={13} /> <span>Contains number or symbol</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isNotTemp ? '#10b981' : 'var(--text-dim)' }}>
                <Check size={13} /> <span>Different from default 2006</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isMatching ? '#10b981' : 'var(--text-dim)' }}>
                <Check size={13} /> <span>Passwords match</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              style={{
                marginTop: '0.5rem',
                padding: '0.85rem',
                borderRadius: '10px',
                background: isValid ? 'linear-gradient(135deg, var(--primary-cyan), var(--secondary-violet))' : 'rgba(255,255,255,0.1)',
                color: isValid ? '#050508' : 'var(--text-dim)',
                fontWeight: 700,
                border: 'none',
                cursor: isValid && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
