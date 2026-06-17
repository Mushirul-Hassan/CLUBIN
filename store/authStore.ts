import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Admin } from '@/types';

interface AuthState {
  accessToken: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
 
  
  setAuth: (token: string, admin: Admin) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      admin: null,
      isAuthenticated: false,
 
      setAuth: (token, admin) =>
        set({
          accessToken: token,
          admin,
          isAuthenticated: true,
        }),
 
      setAccessToken: (token) =>
        set({ accessToken: token }),
 
      logout: () =>
        set({
          accessToken: null,
          admin: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'clubin-auth',
      partialize: (state) => ({ admin: state.admin, isAuthenticated: state.isAuthenticated }),
    }
  )
);