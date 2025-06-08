import { publicFetchClient } from '@/shared/api/instance';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

type Session = {
  userId: string;
  email: string;
  name?: string;
  exp: number;
  iat: number;
};

interface SessionStore {
  token: string | null;
  session: Session | null;
  login: (token: string) => void;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
  updateUser: (userData: Partial<Session>) => void;
}

const TOKEN_KEY = 'token';
let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = create<SessionStore>((set, get) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const session = token ? jwtDecode<Session>(token) : null;

  return {
    token,
    session,

    login: (newToken: string) => {
      localStorage.setItem(TOKEN_KEY, newToken);
      const session = jwtDecode<Session>(newToken);
      set({ token: newToken, session });
    },

    logout: async () => {
      try {
        await publicFetchClient.post('/api/auth/logout');
      } catch {
        // ignore
      }
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, session: null });
    },

    refreshToken: async () => {
      const { token, login, logout } = get();
      if (!token) return null;

      const decoded = jwtDecode<Session>(token);
      const isExpired = decoded.exp < Date.now() / 1000;
      if (!isExpired) return token;

      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .get('/auth/refresh')
          .then((res) => res.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .catch((error) => {
            console.error('Refresh token failed:', error);
            logout();
            return null;
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return await refreshTokenPromise;
    },

    updateUser: (userData) => {
      set((state) => {
        if (!state.session) return state;
        return {
          session: {
            ...state.session,
            ...userData,
          },
        };
      });
    },
  };
});
