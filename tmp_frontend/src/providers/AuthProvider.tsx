import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContextValue } from '../types/auth';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  getCurrentSession,
  sendPasswordReset,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  subscribeToAuthChanges,
} from '../services/authService';
import { Session, User } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrapAuth() {
      const currentSession = await getCurrentSession();

      if (!mounted) {
        return;
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    }

    bootstrapAuth();

    const {
      data: { subscription },
    } = subscribeToAuthChanges((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      configured: isSupabaseConfigured,
      signIn: signInWithEmail,
      signUp: signUpWithEmail,
      signOut: signOutUser,
      resetPassword: sendPasswordReset,
    }),
    [loading, session, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
