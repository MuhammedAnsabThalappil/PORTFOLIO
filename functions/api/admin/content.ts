import { verifySession, getEnv, jsonResponse, corsResponse } from '../_utils';
import { getSupabaseServer } from '../_supabase';
import { inMemoryContactMessages } from '../contact';

const localContentCache: Record<string, any[]> = {};

function upsertLocal(table: string, item: any) {
  if (!localContentCache[table]) localContentCache[table] = [];
  const existingIndex = localContentCache[table].findIndex((i: any) => i.id === item.id);
  if (existingIndex >= 0) {
    localContentCache[table][existingIndex] = { ...localContentCache[table][existingIndex], ...item };
  } else {
    localContentCache[table].push(item);
  }
}

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;
  const env = getEnv(context);

  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  // Verify Admin Session
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized: Missing session token' }, 401);
  }

  const token = authHeader.substring(7).trim();
  const secret = env.ADMIN_JWT_SECRET || 'ansab-super-secret-jwt-key-2026-production';
  const session = await verifySession(token, secret);
  if (!session) {
    return jsonResponse({ error: 'Unauthorized: Session invalid or expired' }, 401);
  }

  const supabase = getSupabaseServer(env);
  const url = new URL(request.url);

  let body: any = {};
  if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  const action = body.action || url.searchParams.get('action');

  try {
    switch (action) {
      // 1. Get contact messages
      case 'get_messages': {
        if (supabase) {
          try {
            const { data, error } = await supabase
              .from('contact_messages')
              .select('*')
              .order('created_at', { ascending: false });
            if (!error && data) {
              return jsonResponse({ success: true, messages: data });
            }
          } catch {
            // DB failed, fallback
          }
        }
        return jsonResponse({ success: true, messages: inMemoryContactMessages });
      }

      // 2. Mark message as read/unread
      case 'mark_message_read': {
        const { id, isRead } = body;
        if (!id) return jsonResponse({ error: 'Message ID is required' }, 400);

        if (supabase) {
          try {
            await supabase.from('contact_messages').update({ is_read: isRead }).eq('id', id);
          } catch {
            // Fallback
          }
        }

        const localMsg = inMemoryContactMessages.find(m => m.id === id);
        if (localMsg) localMsg.is_read = isRead;

        return jsonResponse({ success: true, message: 'Message status updated' });
      }

      // 3. Delete contact message
      case 'delete_message': {
        const { id } = body;
        if (!id) return jsonResponse({ error: 'Message ID is required' }, 400);

        if (supabase) {
          try {
            await supabase.from('contact_messages').delete().eq('id', id);
          } catch {
            // Fallback
          }
        }

        const idx = inMemoryContactMessages.findIndex(m => m.id === id);
        if (idx !== -1) inMemoryContactMessages.splice(idx, 1);

        return jsonResponse({ success: true, message: 'Message deleted' });
      }

      // 4. Save/Update record across tables
      case 'save_item': {
        const { table, item } = body;
        if (!table || !item) return jsonResponse({ error: 'Table and item are required' }, 400);

        if (supabase) {
          try {
            const { data, error } = await supabase
              .from(table)
              .upsert(item, { onConflict: 'id' })
              .select();

            if (error) {
              console.warn(`Supabase save note on ${table}:`, error.message);
              upsertLocal(table, item);
              return jsonResponse({ success: true, data: item, warning: 'Saved locally; database sync note: ' + error.message });
            }
            upsertLocal(table, item);
            return jsonResponse({ success: true, data: data?.[0] || item });
          } catch (dbErr: any) {
            upsertLocal(table, item);
            return jsonResponse({ success: true, data: item });
          }
        }

        upsertLocal(table, item);
        return jsonResponse({ success: true, data: item });
      }

      // 5. Delete record from table
      case 'delete_item': {
        const { table, id } = body;
        if (!table || !id) return jsonResponse({ error: 'Table and id are required' }, 400);

        if (supabase) {
          try {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) console.warn(`Supabase delete note on ${table}:`, error.message);
          } catch {
            // Fallback
          }
        }

        if (localContentCache[table]) {
          localContentCache[table] = localContentCache[table].filter((i: any) => i.id !== id);
        }

        return jsonResponse({ success: true, message: 'Item deleted' });
      }

      // 6. Reorder items
      case 'reorder_items': {
        const { table, orderedIds } = body;
        if (!table || !Array.isArray(orderedIds)) {
          return jsonResponse({ error: 'Table and orderedIds array are required' }, 400);
        }

        if (supabase) {
          try {
            for (let i = 0; i < orderedIds.length; i++) {
              await supabase.from(table).update({ order_index: i + 1 }).eq('id', orderedIds[i]);
            }
          } catch {
            // Fallback
          }
        }

        return jsonResponse({ success: true, message: 'Items reordered successfully' });
      }

      default:
        return jsonResponse({ error: 'Unknown admin action: ' + action }, 400);
    }
  } catch (err: any) {
    console.error('Admin API error:', err);
    return jsonResponse({ error: 'Admin API internal error' }, 500);
  }
}

export const onRequestGet = onRequest;
export const onRequestPost = onRequest;
export const onRequestPut = onRequest;
export const onRequestDelete = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
