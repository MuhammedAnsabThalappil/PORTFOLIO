import { verifySession } from '../_utils';
import { getSupabaseServer } from '../_supabase';
import { inMemoryContactMessages } from '../contact';

// Local storage cache for admin operations during development
let localContentCache: Record<string, any> = {};

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // Verify Admin Session
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing session token' });
  }

  const token = authHeader.substring(7).trim();
  const session = verifySession(token);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Session invalid or expired' });
  }

  const supabase = getSupabaseServer();
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const action = body.action || req.query?.action;

  try {
    switch (action) {
      // 1. Get contact messages
      case 'get_messages': {
        if (supabase) {
          const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });
          if (!error && data) {
            return res.status(200).json({ success: true, messages: data });
          }
        }
        return res.status(200).json({ success: true, messages: inMemoryContactMessages });
      }

      // 2. Mark message as read/unread
      case 'mark_message_read': {
        const { id, isRead } = body;
        if (!id) return res.status(400).json({ error: 'Message ID is required' });

        if (supabase) {
          await supabase.from('contact_messages').update({ is_read: isRead }).eq('id', id);
        }

        const localMsg = inMemoryContactMessages.find(m => m.id === id);
        if (localMsg) localMsg.is_read = isRead;

        return res.status(200).json({ success: true, message: 'Message status updated' });
      }

      // 3. Delete contact message
      case 'delete_message': {
        const { id } = body;
        if (!id) return res.status(400).json({ error: 'Message ID is required' });

        if (supabase) {
          await supabase.from('contact_messages').delete().eq('id', id);
        }

        const idx = inMemoryContactMessages.findIndex(m => m.id === id);
        if (idx !== -1) inMemoryContactMessages.splice(idx, 1);

        return res.status(200).json({ success: true, message: 'Message deleted' });
      }

      // 4. Save/Update record across tables
      case 'save_item': {
        const { table, item } = body;
        if (!table || !item) return res.status(400).json({ error: 'Table and item are required' });

        if (!localContentCache[table]) localContentCache[table] = [];

        if (supabase) {
          const { data, error } = await supabase
            .from(table)
            .upsert(item, { onConflict: 'id' })
            .select();

          if (error) {
            console.error(`Supabase save error on ${table}:`, error);
            // Fallback: save locally
            upsertLocal(table, item);
            return res.status(200).json({ success: true, data: item, warning: 'Saved locally; database sync error: ' + error.message });
          }
          upsertLocal(table, item);
          return res.status(200).json({ success: true, data: data?.[0] || item });
        }

        upsertLocal(table, item);
        return res.status(200).json({ success: true, data: item });
      }

      // 5. Delete record from table
      case 'delete_item': {
        const { table, id } = body;
        if (!table || !id) return res.status(400).json({ error: 'Table and id are required' });

        if (supabase) {
          const { error } = await supabase.from(table).delete().eq('id', id);
          if (error) console.error(`Supabase delete error on ${table}:`, error);
        }

        if (localContentCache[table]) {
          localContentCache[table] = localContentCache[table].filter((i: any) => i.id !== id);
        }

        return res.status(200).json({ success: true, message: 'Item deleted' });
      }

      // 6. Reorder items
      case 'reorder_items': {
        const { table, orderedIds } = body;
        if (!table || !Array.isArray(orderedIds)) {
          return res.status(400).json({ error: 'Table and orderedIds array are required' });
        }

        if (supabase) {
          for (let i = 0; i < orderedIds.length; i++) {
            await supabase.from(table).update({ order_index: i + 1 }).eq('id', orderedIds[i]);
          }
        }

        return res.status(200).json({ success: true, message: 'Items reordered successfully' });
      }

      default:
        return res.status(400).json({ error: 'Unknown admin action: ' + action });
    }
  } catch (err: any) {
    console.error('Admin API error:', err);
    return res.status(500).json({ error: 'Admin API internal error: ' + err.message });
  }
}

function upsertLocal(table: string, item: any) {
  if (!localContentCache[table]) localContentCache[table] = [];
  const existingIndex = localContentCache[table].findIndex((i: any) => i.id === item.id);
  if (existingIndex >= 0) {
    localContentCache[table][existingIndex] = { ...localContentCache[table][existingIndex], ...item };
  } else {
    localContentCache[table].push(item);
  }
}
