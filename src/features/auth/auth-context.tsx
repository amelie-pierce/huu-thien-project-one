'use client';

import type { AuthView, User } from './types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { currentUserRequest, signInRequest, signOutRequest, signUpRequest } from './actions';

type AuthContextValue = {
  user: User | null;
  view: AuthView | null;
  openAuth: (view: AuthView) => void;
  closeAuth: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AuthView | null>(null);

  useEffect(() => {
    currentUserRequest().then(setUser);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      view,
      openAuth: setView,
      closeAuth: () => setView(null),
      async signIn(email, password) {
        setUser(await signInRequest(email, password));
        setView(null);
      },
      async signUp(email, password) {
        setUser(await signUpRequest(email, password));
        setView(null);
      },
      async signOut() {
        await signOutRequest();
        setUser(null);
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
