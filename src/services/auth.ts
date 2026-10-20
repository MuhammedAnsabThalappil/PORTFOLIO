const TOKEN_KEY = 'ansab_admin_session_token';
const TEMP_KEY = 'ansab_admin_is_temporary';
const USER_KEY = 'ansab_admin_username';

export interface AdminUser {
  username: string;
  isTemporary: boolean;
}

export const authService = {
  /**
   * Login with username and password
   */
  async login(username: string, password: string): Promise<{ success: boolean; token: string; user: AdminUser }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(TEMP_KEY, String(data.user.isTemporary));
    sessionStorage.setItem(USER_KEY, data.user.username);

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
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        this.clearSession();
        return { valid: false };
      }

      const data = await res.json();
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

    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Password update failed');
    }

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
          headers: { Authorization: `Bearer ${token}` },
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
