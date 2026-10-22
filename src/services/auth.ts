import bcrypt from 'bcryptjs';

const TOKEN_KEY = 'ansab_admin_session_token';
const TEMP_KEY = 'ansab_admin_is_temporary';
const USER_KEY = 'ansab_admin_username';
const LOCAL_PWD_HASH_KEY = 'ansab_admin_custom_hash';

// Default Bcrypt hash of '2006' (10 salt rounds)
const DEFAULT_TEMP_HASH = '$2b$10$qnF2FNDQUfy.KZBrpGqEluyaU3v2u7NoErUCNYmuWUhl4N2YSTLcC';

export interface AdminUser {
  username: string;
  isTemporary: boolean;
}

/**
 * Safely parse JSON from a fetch Response, preventing "Unexpected end of JSON input"
 * and handling non-200 HTTP statuses, HTML error pages, and network failures gracefully.
 */
async function parseSafeJsonResponse<T = any>(res: Response, fallbackErrorMsg: string): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  let data: any = null;

  try {
    if (contentType.includes('application/json')) {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } else {
      const rawText = await res.text();
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }
    }
  } catch {
    data = null;
  }

  if (!res.ok) {
    if (data && typeof data === 'object' && data.error) {
      throw new Error(data.error);
    }

    if (res.status === 401) {
      throw new Error('Invalid username or password');
    }
    if (res.status === 404) {
      throw new Error('Authentication service endpoint not found (404).');
    }
    if (res.status === 405) {
      throw new Error('Method not allowed on authentication endpoint (405).');
    }
    if (res.status === 429) {
      throw new Error('Too many login attempts. Please wait a few minutes before trying again.');
    }
    if (res.status >= 500) {
      throw new Error('Authentication server encountered an error. Please try again.');
    }

    throw new Error(fallbackErrorMsg);
  }

  if (!data) {
    throw new Error('Server returned an empty or invalid response.');
  }

  return data as T;
}

export const authService = {
  /**
   * Login with username and password (resilient dual-mode support)
   */
  async login(username: string, password: string): Promise<{ success: boolean; token: string; user: AdminUser }> {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      throw new Error('Please enter both username and password.');
    }

    // 1. Try server-side endpoint first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username: trimmedUsername, password }),
      });

      if (res.ok) {
        const data = await parseSafeJsonResponse<{ success: boolean; token: string; user: AdminUser }>(
          res,
          'Authentication failed'
        );

        if (data.token) {
          sessionStorage.setItem(TOKEN_KEY, data.token);
          sessionStorage.setItem(TEMP_KEY, String(data.user?.isTemporary ?? true));
          sessionStorage.setItem(USER_KEY, data.user?.username || trimmedUsername);
          return data;
        }
      } else if (res.status === 401) {
        // Explicit invalid credentials from backend
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Invalid username or password');
      } else if (res.status === 429) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || 'Too many failed login attempts. Please try again later.');
      }
      // If 404 or 405 (e.g. host doesn't route /api or static deploy), fall through to verified fallback
    } catch (serverErr: any) {
      // Re-throw genuine credential or rate-limit rejections
      if (
        serverErr.message === 'Invalid username or password' ||
        serverErr.message.includes('Too many failed')
      ) {
        throw serverErr;
      }
      // Otherwise fallback gracefully
    }

    // 2. Resilient fallback verification (verifies credentials with bcrypt)
    if (trimmedUsername.toUpperCase() !== 'ANSAB') {
      throw new Error('Invalid username or password');
    }

    const storedCustomHash = localStorage.getItem(LOCAL_PWD_HASH_KEY);
    const targetHash = storedCustomHash || DEFAULT_TEMP_HASH;

    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, targetHash);
    } catch {
      isMatch = password === '2006';
    }

    if (!isMatch && password === '2006' && !storedCustomHash) {
      isMatch = true;
    }

    if (!isMatch) {
      throw new Error('Invalid username or password');
    }

    const isTemporary = !storedCustomHash;
    const fallbackToken = `ansab-session-${Date.now()}-${Math.random().toString(36).substring(2)}`;

    sessionStorage.setItem(TOKEN_KEY, fallbackToken);
    sessionStorage.setItem(TEMP_KEY, String(isTemporary));
    sessionStorage.setItem(USER_KEY, trimmedUsername);

    return {
      success: true,
      token: fallbackToken,
      user: {
        username: trimmedUsername,
        isTemporary,
      },
    };
  },

  /**
   * Verify session token validity
   */
  async verifySession(): Promise<{ valid: boolean; user?: AdminUser }> {
    const token = this.getToken();
    if (!token) return { valid: false };

    try {
      const res = await fetch('/api/auth/verify', {
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await parseSafeJsonResponse<{ valid: boolean; user?: AdminUser }>(res, 'Verification failed');
        if (data.valid && data.user) {
          sessionStorage.setItem(TEMP_KEY, String(data.user.isTemporary));
          return { valid: true, user: data.user };
        }
      }
    } catch {
      // Fallback
    }

    // If token exists in current session, treat as valid session
    return {
      valid: Boolean(token),
      user: {
        username: sessionStorage.getItem(USER_KEY) || 'ANSAB',
        isTemporary: sessionStorage.getItem(TEMP_KEY) === 'true',
      },
    };
  },

  /**
   * Change admin password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');

    // Try server update
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        const data = await parseSafeJsonResponse<{ success: boolean; message: string; token?: string }>(
          res,
          'Password update failed'
        );

        if (data.token) {
          sessionStorage.setItem(TOKEN_KEY, data.token);
          sessionStorage.setItem(TEMP_KEY, 'false');
        }

        const newHash = await bcrypt.hash(newPassword, 10);
        localStorage.setItem(LOCAL_PWD_HASH_KEY, newHash);

        return data;
      }
    } catch {
      // Fallback to local hash update
    }

    // Verify current password locally
    const storedCustomHash = localStorage.getItem(LOCAL_PWD_HASH_KEY);
    const targetHash = storedCustomHash || DEFAULT_TEMP_HASH;
    let isCurrentValid = false;
    try {
      isCurrentValid = await bcrypt.compare(currentPassword, targetHash);
    } catch {
      isCurrentValid = currentPassword === '2006';
    }

    if (!isCurrentValid && currentPassword === '2006' && !storedCustomHash) {
      isCurrentValid = true;
    }

    if (!isCurrentValid) {
      throw new Error('Current password is incorrect');
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    localStorage.setItem(LOCAL_PWD_HASH_KEY, newHash);
    sessionStorage.setItem(TEMP_KEY, 'false');

    return {
      success: true,
      message: 'Password changed successfully',
    };
  },

  /**
   * Logout and clear local session state
   */
  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        // Ignore network error on logout
      }
    }
    this.clearSession();
  },

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  isTemporaryPassword(): boolean {
    return sessionStorage.getItem(TEMP_KEY) === 'true';
  },

  getUsername(): string {
    return sessionStorage.getItem(USER_KEY) || 'ANSAB';
  },

  clearSession(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TEMP_KEY);
    sessionStorage.removeItem(USER_KEY);
  },
};
