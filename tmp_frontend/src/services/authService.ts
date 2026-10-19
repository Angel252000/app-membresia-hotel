import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AuthActionResult, SignInPayload, SignUpPayload } from '../types/auth';

const missingConfigMessage =
  'Supabase is not configured yet. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your .env file.';

function getClient() {
  if (!supabase) {
    return null;
  }

  return supabase;
}

export async function signInWithEmail(payload: SignInPayload): Promise<AuthActionResult> {
  const client = getClient();

  if (!client) {
    return { error: missingConfigMessage };
  }

  const { error } = await client.auth.signInWithPassword(payload);
  return { error: error?.message ?? null };
}

export async function signUpWithEmail(payload: SignUpPayload): Promise<AuthActionResult> {
  const client = getClient();

  if (!client) {
    return { error: missingConfigMessage };
  }

  const {
    data: { session },
    error,
  } = await client.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName,
      },
    },
  });

  return {
    error: error?.message ?? null,
    requiresEmailConfirmation: !session,
  };
}

export async function sendPasswordReset(email: string): Promise<AuthActionResult> {
  const client = getClient();

  if (!client) {
    return { error: missingConfigMessage };
  }

  const { error } = await client.auth.resetPasswordForEmail(email);
  return { error: error?.message ?? null };
}

export async function signOutUser(): Promise<AuthActionResult> {
  const client = getClient();

  if (!client) {
    return { error: missingConfigMessage };
  }

  const { error } = await client.auth.signOut();
  return { error: error?.message ?? null };
}

export async function getCurrentSession(): Promise<Session | null> {
  const client = getClient();

  if (!client) {
    return null;
  }

  const {
    data: { session },
  } = await client.auth.getSession();

  return session;
}

export function subscribeToAuthChanges(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  const client = getClient();

  if (!client) {
    return {
      data: {
        subscription: {
          unsubscribe: () => undefined,
        },
      },
    };
  }

  return client.auth.onAuthStateChange(callback);
}
