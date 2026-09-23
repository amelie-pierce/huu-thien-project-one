'use client';

import type { AuthView, User } from './types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { signInRequest, signUpRequest } from './api';

import { storage } from '@/lib/storage';

const STORAGE_KEY = 'user';

type AuthContextValue = {
  user: User | null;
  view: AuthView | null;
  openAuth: (view: AuthView) => void;
  closeAuth: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AuthView | null>(null);

  useEffect(() => {
    setUser(storage.get<User | null>(STORAGE_KEY, null));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      view,
      openAuth: setView,
      closeAuth: () => setView(null),
      async signIn(email, password) {
        const next = await signInRequest(email, password);
        setUser(next);
        storage.set(STORAGE_KEY, next);
        setView(null);
      },
      async signUp(email, password) {
        const next = await signUpRequest(email, password);
        setUser(next);
        storage.set(STORAGE_KEY, next);
        setView(null);
      },
      signOut() {
        setUser(null);
        storage.remove(STORAGE_KEY);
      },
    }),
    [user, view]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
