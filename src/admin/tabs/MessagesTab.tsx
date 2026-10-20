import React, { useState, useEffect } from 'react';
import { Mail, Search, Trash2, CheckCircle2, Circle, Reply, Eye, X, Filter } from 'lucide-react';
import { authService } from '../../services/auth';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = authService.getToken();
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'get_messages' }),
      });
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'mark_message_read', id, isRead: !currentStatus }),
      });

      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: !currentStatus });
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = authService.getToken();
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: 'delete_message', id }),
      });

      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filterType === 'unread' && m.is_read) return false;
    if (filterType === 'read' && !m.is_read) return false;
    if (!search.trim()) return true;

    const term = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(term) ||
      m.email.toLowerCase().includes(term) ||
      m.message.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>Contact Form Inquiries</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Messages received directly from public portfolio visitors
          </p>
        </div>
        <button
          onClick={fetchMessages}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: '#fff',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          Refresh Feed
        </button>
      </div>

      {/* Search & Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search by name, email, or message keywords..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem 0.6rem 2.4rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'unread', 'read'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                background: filterType === tab ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${filterType === tab ? 'rgba(0, 240, 255, 0.4)' : 'var(--border-color)'}`,
                color: filterType === tab ? 'var(--primary-cyan)' : 'var(--text-muted)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div style={{
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading messages...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-dim)' }}>
            No messages found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredMessages.map((msg, idx) => (
              <div
                key={msg.id}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: idx < filteredMessages.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: msg.is_read ? 'transparent' : 'rgba(0, 240, 255, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '260px' }}>
                  <button
                    type="button"
                    onClick={() => handleToggleRead(msg.id, msg.is_read)}
                    title={msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                    style={{ background: 'none', border: 'none', color: msg.is_read ? 'var(--text-dim)' : 'var(--primary-cyan)', cursor: 'pointer', paddingTop: '2px' }}
                  >
                    {msg.is_read ? <Circle size={18} /> : <CheckCircle2 size={18} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{msg.name}</span>
                      <a href={`mailto:${msg.email}`} style={{ fontSize: '0.8rem', color: 'var(--primary-cyan)', fontFamily: 'var(--font-mono)', textDecoration: 'none' }}>
                        {msg.email}
                      </a>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>

                    <p style={{
                      margin: 0,
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      maxWidth: '700px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {msg.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={14} />
                    <span>View</span>
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Reply to your portfolio message&body=Hi ${msg.name},%0D%0A%0D%0A`}
                    style={{
                      background: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      color: 'var(--primary-cyan)',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textDecoration: 'none',
                    }}
                  >
                    <Reply size={14} />
                    <span>Reply</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', padding: '0.45rem', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Modal Preview */}
      {selectedMessage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          padding: '1rem',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '560px',
            background: '#0c0d14',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            position: 'relative',
          }}>
            <button
              onClick={() => setSelectedMessage(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                SUBMITTED: {new Date(selectedMessage.created_at).toLocaleString()}
              </div>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.3rem', color: '#fff' }}>{selectedMessage.name}</h3>
              <a href={`mailto:${selectedMessage.email}`} style={{ color: 'var(--primary-cyan)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                {selectedMessage.email}
              </a>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              fontSize: '0.95rem',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              marginBottom: '1.5rem',
              maxHeight: '320px',
              overflowY: 'auto',
            }}>
              {selectedMessage.message}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.is_read)}
                className="btn btn-secondary"
                style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
              >
                {selectedMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
              </button>

              <a
                href={`mailto:${selectedMessage.email}?subject=Reply to your portfolio message&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                className="btn btn-primary"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Reply size={16} />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
