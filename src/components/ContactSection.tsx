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
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
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
    minHeight: '48px', // Mobile touch requirement
    borderRadius: '12px',
    background: 'var(--bg-elevated, #1C2230)',
    border: `1px solid ${focused === field ? 'var(--accent-primary, #7C6CFF)' : 'var(--border-color, #2A3140)'}`,
    boxShadow: focused === field ? '0 0 0 3px rgba(124, 108, 255, 0.2)' : 'none',
    color: 'var(--text-primary, #F5F7FF)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.78rem',
    color: 'var(--text-primary, #F5F7FF)',
    marginBottom: '0.4rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        {/* Section Header */}
        <motion.div custom={0} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          <div className="section-eyebrow">
            <Mail size={15} />
            <span>08 — GET IN TOUCH</span>
          </div>
        </motion.div>

        <motion.h2 custom={1} variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT} className="section-title">
          Let's Build <span className="gradient-text">Something Impactful.</span>
        </motion.h2>

        <div className="bento-grid">
          {/* Left Column — Context & Verified Socials */}
          <motion.div
            custom={0}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="col-span-5"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}
          >
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Have an idea, project, venture opportunity, or collaboration in mind? I'm always open to discussing new engineering and entrepreneurial frontiers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {[
                { href: SOCIALS.linkedin, icon: <Linkedin size={18} style={{ color: '#0A66C2' }} />, label: 'LinkedIn Profile' },
                { href: SOCIALS.github,   icon: <Github   size={18} style={{ color: 'var(--text-primary)' }} />, label: 'GitHub Repositories' },
                { href: SOCIALS.email,    icon: <Mail     size={18} style={{ color: 'var(--color-primary)' }} />, label: 'Direct Email' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label !== 'Direct Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', minHeight: '48px', padding: '0.75rem 1.25rem' }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <div
              style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              Location: {SOCIALS.location}
            </div>
          </motion.div>

          {/* Right Column — Clean Contact Form */}
          <motion.div
            custom={1}
            variants={REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="glass-card col-span-7"
            style={{ minWidth: 0, background: 'var(--bg-card, #161A24)', border: '1px solid var(--border-color, #2A3140)' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name Field */}
              <div>
                <label style={labelStyle}>YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navas K. M."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('name')}
                />
              </div>

              {/* Email Field */}
              <div>
                <label style={labelStyle}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('email')}
                />
              </div>

              {/* Message Field */}
              <div>
                <label style={labelStyle}>MESSAGE / PROJECT BRIEF</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, idea, or how we might collaborate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  style={{
                    ...inputStyle('message'),
                    resize: 'vertical',
                    minHeight: '120px',
                  }}
                />
              </div>

              {/* Feedback Alerts */}
              {errorMsg && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(248, 113, 113, 0.12)',
                    border: '1px solid var(--error, #F87171)',
                    color: 'var(--error, #F87171)',
                    fontSize: '0.85rem',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {submitted && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(52, 211, 153, 0.12)',
                    border: '1px solid var(--success, #34D399)',
                    color: 'var(--success, #34D399)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Message delivered successfully! I will reply shortly.</span>
                </div>
              )}

              {/* Submit Button (Full Width on Mobile, Min 48px) */}
              <button
                type="submit"
                disabled={submitting || submitted}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  minHeight: '48px',
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? 'wait' : 'pointer',
                }}
              >
                <Send size={16} />
                <span>{submitting ? 'Delivering Message...' : submitted ? 'Message Sent' : 'Send Message'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
