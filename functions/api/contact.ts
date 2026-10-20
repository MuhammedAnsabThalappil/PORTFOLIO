import {
  checkRateLimit,
  getClientIp,
  getEnv,
  jsonResponse,
  corsResponse,
} from './_utils';
import { getSupabaseServer } from './_supabase';

export const inMemoryContactMessages: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}> = [];

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;
  const env = getEnv(context);

  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const ip = getClientIp(request);
    // Rate limit: 5 submissions per hour per IP
    const rateCheck = checkRateLimit(`contact_${ip}`, 5, 60 * 60 * 1000);
    if (!rateCheck.allowed) {
      return jsonResponse(
        {
          error: 'Too many submissions from your connection. Please wait before sending another message.',
        },
        429
      );
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON request payload' }, 400);
    }

    const { name, email, message, honeypot } = body || {};

    // Silent reject for honeypot spam bot detection
    if (honeypot) {
      return jsonResponse({ success: true, message: 'Message sent successfully' });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return jsonResponse({ error: 'Please enter a valid name (2–100 characters)' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || email.trim().length > 120) {
      return jsonResponse({ error: 'Please enter a valid email address' }, 400);
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 3000) {
      return jsonResponse({ error: 'Please enter a message between 5 and 3000 characters' }, 400);
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const supabase = getSupabaseServer(env);
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('contact_messages').insert({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          is_read: false,
          created_at: new Date().toISOString(),
        });

        if (!dbError) {
          return jsonResponse({
            success: true,
            message: 'Thank you for reaching out! Your message has been sent to Ansab.',
          });
        }
        console.warn('Supabase contact insert warning:', dbError.message);
      } catch (dbErr: any) {
        console.warn('Supabase DB connection error:', dbErr.message);
      }
    }

    // Fallback store in memory
    inMemoryContactMessages.unshift({
      id: String(Date.now()),
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      is_read: false,
      created_at: new Date().toISOString(),
    });

    return jsonResponse({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent to Ansab.',
    });
  } catch (err: any) {
    console.error('Contact error:', err);
    return jsonResponse({ error: 'An unexpected error occurred while sending your message.' }, 500);
  }
}

export const onRequestPost = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
