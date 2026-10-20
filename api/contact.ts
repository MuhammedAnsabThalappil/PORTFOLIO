import { checkRateLimit, getClientIp, hashIp } from './_utils';
import { getSupabaseServer } from './_supabase';

// Fallback in-memory storage for dev contact messages
export const inMemoryContactMessages: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}> = [];

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = getClientIp(req);
    // Rate limit: 5 messages per hour per IP
    const rateCheck = checkRateLimit(`contact_${ip}`, 5, 60 * 60 * 1000);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: 'Too many submissions from your connection. Please wait before sending another message.',
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, message, honeypot } = body;

    // Honeypot spam check (if filled, silently pretend success)
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({ error: 'Please enter a valid name (2–100 characters)' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.trim().length > 120) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 3000) {
      return res.status(400).json({ error: 'Please enter a message between 5 and 3000 characters' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const ipHashed = hashIp(ip);

    const supabase = getSupabaseServer();
    let savedInDb = false;

    if (supabase) {
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        is_read: false,
        ip_hash: ipHashed,
        created_at: new Date().toISOString(),
      });

      if (!dbError) {
        savedInDb = true;
      } else {
        console.warn('Could not insert to Supabase contact_messages, falling back to local memory:', dbError.message);
      }
    }

    // Always keep in local memory for dev/fallback view
    inMemoryContactMessages.unshift({
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      is_read: false,
      created_at: new Date().toISOString(),
    });

    // Optional email dispatch via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const targetEmail = process.env.NOTIFICATION_EMAIL || 'ansabthalappil@gmail.com';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Ansab Portfolio <portfolio@resend.dev>',
            to: [targetEmail],
            subject: `New Portfolio Message from ${trimmedName}`,
            text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
          }),
        });
      } catch (mailErr) {
        console.warn('Resend notification dispatch failed:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Message received! Thank you for reaching out. Let\'s turn ideas into reality.',
    });
  } catch (err: any) {
    console.error('Contact endpoint error:', err);
    return res.status(500).json({ error: 'Failed to process message submission. Please try again.' });
  }
}
