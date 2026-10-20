import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Linkedin, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';
import { sendContactMessage } from '../services/supabase';
import { REVEAL, VIEWPORT } from '../hooks/useReveal';

export const ContactSection: React.FC = () => {
  const { socials: SOCIALS } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setErrorMsg(null);
    setSubmitting(true);

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to deliver message. Please try again or email directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({

    width: '100%',
    padding: '0.85rem 1.15rem',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === field ? 'rgba(0,240,255,0.5)' : 'var(--border-color)'}`,
    boxShadow: focused === field ? '0 0 0 3px rgba(0,240,255,0.1), 0 0 20px rgba(0,240,255,0.06)' : 'none',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    fontWeight: 600,
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <Mail size={16} />
            <span>10 — CONTACT</span>
          </div>
        </motion.div>
        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          LET'S BUILD <span className="gradient-text">SOMETHING.</span>
        </motion.h2>

        <div className="bento-grid">
          {/* Left column */}
          <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="col-span-5"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}
          >
            <p style={{ fontSize: '1.2rem', color: '#ffffff', lineHeight: 1.65, marginBottom: '2rem' }}>
              Have an idea, opportunity, project or collaboration in mind? Let's connect and turn it into reality.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { href: SOCIALS.linkedin, icon: <Linkedin size={20} style={{ color: 'var(--primary-cyan)' }} />, label: 'LINKEDIN PROFILE' },
                { href: SOCIALS.github,   icon: <Github   size={20} style={{ color: 'var(--secondary-violet)' }} />, label: 'GITHUB REPOSITORIES' },
                { href: SOCIALS.email,    icon: <Mail     size={20} style={{ color: 'var(--accent-emerald)' }} />, label: 'SEND DIRECT EMAIL' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label !== 'SEND DIRECT EMAIL' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ justifyContent: 'flex-start' }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
              LOCATION: {SOCIALS.location}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="glass-card col-span-7"
            style={{ minWidth: 0 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="contact-name" style={labelStyle}>YOUR NAME</label>
                <input
                  id="contact-name" type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Alex Morgan"
                  style={inputStyle('name')}
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={labelStyle}>YOUR EMAIL</label>
                <input
                  id="contact-email" type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="alex@company.com"
                  style={inputStyle('email')}
                />
              </div>

              <div>
                <label htmlFor="contact-message" style={labelStyle}>YOUR MESSAGE</label>
                <textarea
                  id="contact-message" required rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your idea, opportunity, or collaboration..."
                  style={{ ...inputStyle('message'), resize: 'vertical' }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{ width: '100%', marginTop: '0.5rem', opacity: submitting ? 0.7 : 1 }}
              >
                <span>{submitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                <Send size={18} />
              </motion.button>

              {errorMsg && (
                <div style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0,  scale: 1 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1rem 1.25rem', borderRadius: '12px',
                    background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)',
                    color: '#10b981', fontSize: '0.9rem', fontFamily: 'var(--font-mono)',
                  }}
                >
                  <CheckCircle2 size={20} />
                  <span>Message received! Thank you for reaching out. Let's turn ideas into reality.</span>
                </motion.div>
              )}

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
