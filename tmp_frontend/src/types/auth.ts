import { Session, User } from '@supabase/supabase-js';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  fullName: string;
}

export interface AuthActionResult {
  error: string | null;
  requiresEmailConfirmation?: boolean;
}

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  configured: boolean;
  signIn: (payload: SignInPayload) => Promise<AuthActionResult>;
  signUp: (payload: SignUpPayload) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
  resetPassword: (email: string) => Promise<AuthActionResult>;
}
