import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Linkedin, Github, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SOCIALS } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // TODO: Integrate with an email service before going to production.
    // Options: EmailJS (emailjs.com), Resend (resend.com), Formspree (formspree.io).
    // Example with EmailJS:
    //   emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData, 'PUBLIC_KEY')
    //     .then(() => { /* success */ })
    //     .catch((err) => { console.error('EmailJS error:', err); });

    setSubmitted(true);
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-eyebrow">
          <Mail size={16} />
          <span>10 — CONTACT</span>
        </div>
        <h2 className="section-title">
          LET'S BUILD <span className="gradient-text">SOMETHING.</span>
        </h2>

        <div className="bento-grid">
          {/* Left Direct Connect Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-5"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <p style={{ fontSize: '1.2rem', color: '#ffffff', lineHeight: 1.65, marginBottom: '2rem' }}>
              Have an idea, opportunity, project or collaboration in mind? Let's connect and turn it into reality.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
              >
                <Linkedin size={20} style={{ color: 'var(--primary-cyan)' }} />
                <span>LINKEDIN PROFILE</span>
              </a>

              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
              >
                <Github size={20} style={{ color: 'var(--secondary-violet)' }} />
                <span>GITHUB REPOSITORIES</span>
              </a>

              <a
                href={SOCIALS.email}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start' }}
              >
                <Mail size={20} style={{ color: 'var(--accent-emerald)' }} />
                <span>SEND DIRECT EMAIL</span>
              </a>
            </div>

            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
              LOCATION: {SOCIALS.location}
            </div>
          </motion.div>

          {/* Right Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card col-span-7"
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  YOUR EMAIL
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  YOUR MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your idea, opportunity, or collaboration..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <span>SEND MESSAGE</span>
                <Send size={18} />
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#10b981',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
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
