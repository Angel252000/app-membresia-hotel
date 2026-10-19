import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import ScreenContainer from '../../src/components/common/ScreenContainer';
import AppText from '../../src/components/common/AppText';
import AppInput from '../../src/components/common/AppInput';
import AppButton from '../../src/components/common/AppButton';
import { useAuth } from '../../src/hooks/useAuth';
import { colors, radius, spacing } from '../../src/theme';

export default function RegisterScreen() {
  const { signUp, configured } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing fields', 'Complete your name, email and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Use at least 6 characters for now.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please confirm the same password in both fields.');
      return;
    }

    setLoading(true);
    const result = await signUp({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (result.error) {
      Alert.alert('Account creation failed', result.error);
      return;
    }

    if (result.requiresEmailConfirmation) {
      Alert.alert(
        'Check your email',
        'Your account was created. Confirm your email from the Supabase message, then sign in.',
      );
      router.replace('/(auth)/login');
      return;
    }

    router.replace('/(tabs)/home');
  }

  return (
    <ScreenContainer style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <LinearGradient
            colors={['#1D4ED8', '#0F172A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <AppText variant="small" style={styles.brand}>
              LUXESTAY MEMBERSHIP
            </AppText>
            <AppText variant="title" style={styles.heroTitle}>
              Create your guest account
            </AppText>
            <AppText variant="body" style={styles.heroText}>
              Save preferences, manage bookings and build your loyalty profile from day one.
            </AppText>
          </LinearGradient>

          <View style={styles.card}>
            {!configured ? (
              <View style={styles.setupBanner}>
                <AppText variant="small" style={styles.setupBannerText}>
                  Add your Supabase keys to `.env` first. The registration form is ready, but it needs your project credentials.
                </AppText>
              </View>
            ) : null}

            <View style={styles.form}>
              <AppText variant="subtitle">Full name</AppText>
              <AppInput
                placeholder="Your full name"
                value={fullName}
                onChangeText={setFullName}
              />

              <AppText variant="subtitle">Email address</AppText>
              <AppInput
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <AppText variant="subtitle">Password</AppText>
              <AppInput
                placeholder="Create a password"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />

              <AppText variant="subtitle">Confirm password</AppText>
              <AppInput
                placeholder="Repeat your password"
                secureTextEntry
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <AppText variant="small">
                We will create the auth user in Supabase and the profile row will be generated automatically by SQL.
              </AppText>

              <AppButton
                title={loading ? 'Creating account...' : 'Create account'}
                onPress={handleRegister}
                disabled={loading}
              />
            </View>

            <View style={styles.footerRow}>
              <AppText variant="small">Already have an account?</AppText>
              <Pressable onPress={() => router.replace('/(auth)/login')}>
                <AppText variant="small" style={styles.linkText}>
                  Sign in
                </AppText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 0,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F4F7FB',
  },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: 72,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  brand: {
    color: '#E0E7FF',
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 38,
  },
  heroText: {
    color: '#E2E8F0',
  },
  card: {
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.lg,
    minHeight: 620,
  },
  setupBanner: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  setupBannerText: {
    color: '#92400E',
  },
  form: {
    gap: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
