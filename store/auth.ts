import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  accessToken: null,
  username: null,
  login: (token: string, username: string) => set({ isLoggedIn: true, accessToken: token, username }),
  logout: () => set({ isLoggedIn: false, accessToken: null, username: null }),
}));
