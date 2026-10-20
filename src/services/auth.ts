const TOKEN_KEY = 'ansab_admin_session_token';
const TEMP_KEY = 'ansab_admin_is_temporary';
const USER_KEY = 'ansab_admin_username';

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
      // Endpoint returned HTML (e.g. 404 or Cloudflare error page) or text
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
      throw new Error('Authentication service endpoint not found (404). Please ensure server functions are running.');
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
   * Login with username and password
   */
  async login(username: string, password: string): Promise<{ success: boolean; token: string; user: AdminUser }> {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      throw new Error('Please enter both username and password.');
    }

    let res: Response;
    try {
      res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username: trimmedUsername, password }),
      });
    } catch (netErr: any) {
      throw new Error('Unable to connect to authentication server. Please check your network connection.');
    }

    const data = await parseSafeJsonResponse<{ success: boolean; token: string; user: AdminUser }>(
      res,
      'Authentication failed'
    );

    if (!data.token) {
      throw new Error('No session token received from server.');
    }

    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(TEMP_KEY, String(data.user?.isTemporary ?? true));
    sessionStorage.setItem(USER_KEY, data.user?.username || trimmedUsername);

    return data;
  },

  /**
   * Verify session token validity with the backend
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

      if (!res.ok) {
        this.clearSession();
        return { valid: false };
      }

      const data = await parseSafeJsonResponse<{ valid: boolean; user?: AdminUser }>(res, 'Verification failed');
      if (data.valid && data.user) {
        sessionStorage.setItem(TEMP_KEY, String(data.user.isTemporary));
        return { valid: true, user: data.user };
      }

      this.clearSession();
      return { valid: false };
    } catch {
      // In case of network glitch during verification, allow current session if unexpired
      return {
        valid: Boolean(token),
        user: {
          username: sessionStorage.getItem(USER_KEY) || 'ANSAB',
          isTemporary: sessionStorage.getItem(TEMP_KEY) === 'true',
        },
      };
    }
  },

  /**
   * Change admin password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');

    let res: Response;
    try {
      res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch {
      throw new Error('Unable to connect to server to update password.');
    }

    const data = await parseSafeJsonResponse<{ success: boolean; message: string; token?: string }>(
      res,
      'Password update failed'
    );

    if (data.token) {
      sessionStorage.setItem(TOKEN_KEY, data.token);
      sessionStorage.setItem(TEMP_KEY, 'false');
    }

    return data;
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
