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
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import ScreenContainer from '../../src/components/common/ScreenContainer';
import AppText from '../../src/components/common/AppText';
import AppInput from '../../src/components/common/AppInput';
import AppButton from '../../src/components/common/AppButton';
import { useAuth } from '../../src/hooks/useAuth';
import { colors, radius, spacing } from '../../src/theme';

export default function LoginScreen() {
  const { signIn, configured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    const result = await signIn({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (result.error) {
      Alert.alert('Sign in failed', result.error);
      return;
    }

    router.replace('/(tabs)/home');
  }

  function handleSocialAuth(provider: 'Google' | 'Facebook') {
    Alert.alert(
      `${provider} coming next`,
      'Email/password is now connected first. Social login needs provider keys plus deep linking in Supabase and Expo.',
    );
  }

  return (
    <ScreenContainer style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <LinearGradient
            colors={['#3A2414', '#15110D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <AppText variant="small" style={styles.brand}>
              LUXESTAY
            </AppText>
            <AppText variant="title" style={styles.heroTitle}>
              Welcome back
            </AppText>
            <AppText variant="body" style={styles.heroText}>
              Sign in to manage your bookings, stays and rewards.
            </AppText>
          </LinearGradient>

          <View style={styles.card}>
            {!configured ? (
              <View style={styles.setupBanner}>
                <AppText variant="small" style={styles.setupBannerText}>
                  Supabase is not configured yet. Add your keys to `.env` before testing login.
                </AppText>
              </View>
            ) : null}

            <View style={styles.socialStack}>
              <Pressable style={styles.socialButton} onPress={() => handleSocialAuth('Google')}>
                <AppText variant="body">Continue with Google</AppText>
              </Pressable>
              <Pressable style={styles.socialButton} onPress={() => handleSocialAuth('Facebook')}>
                <AppText variant="body">Continue with Facebook</AppText>
              </Pressable>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <AppText variant="small">OR LOG IN WITH EMAIL</AppText>
              <View style={styles.divider} />
            </View>

            <View style={styles.form}>
              <View style={styles.labelRow}>
                <AppText variant="subtitle">Email Address</AppText>
              </View>
              <AppInput
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <View style={styles.labelRow}>
                <AppText variant="subtitle">Password</AppText>
                <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
                  <AppText variant="small" style={styles.linkText}>
                    Forgot password?
                  </AppText>
                </Pressable>
              </View>

              <View style={styles.passwordRow}>
                <View style={styles.passwordInputWrap}>
                  <AppInput
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
                <Pressable style={styles.eyeButton} onPress={() => setShowPassword((current) => !current)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.textLight}
                  />
                </Pressable>
              </View>

              <AppText variant="small">Your session stays saved on this device until you sign out.</AppText>

              <AppButton
                title={loading ? 'Signing in...' : 'Sign In'}
                onPress={handleLogin}
                disabled={loading}
              />
            </View>

            <View style={styles.footerRow}>
              <AppText variant="small">Don&apos;t have an account?</AppText>
              <Pressable onPress={() => router.push('/(auth)/register')}>
                <AppText variant="small" style={styles.linkText}>
                  Create account
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
    color: '#F8FAFC',
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 40,
  },
  heroText: {
    color: '#E5E7EB',
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
  socialStack: {
    gap: spacing.md,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  form: {
    gap: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
  },
  passwordRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInputWrap: {
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: spacing.md,
    padding: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
});
