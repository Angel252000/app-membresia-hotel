import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';

import ScreenContainer from '../../src/components/common/ScreenContainer';
import AppText from '../../src/components/common/AppText';
import AppInput from '../../src/components/common/AppInput';
import AppButton from '../../src/components/common/AppButton';
import { useAuth } from '../../src/hooks/useAuth';
import { colors, radius, spacing } from '../../src/theme';

export default function ForgotPasswordScreen() {
  const { resetPassword, configured } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!email.trim()) {
      Alert.alert('Missing email', 'Enter the email tied to your account.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(email.trim());
    setLoading(false);

    if (result.error) {
      Alert.alert('Reset failed', result.error);
      return;
    }

    Alert.alert(
      'Instructions sent',
      'Check your email from Supabase. For a full in-app reset flow later, we can add deep linking too.',
    );
    router.replace('/(auth)/login');
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.headerCard}>
            <AppText variant="title">Recover password</AppText>
            <AppText variant="small">
              Enter your email and Supabase will send a recovery message.
            </AppText>
          </View>

          {!configured ? (
            <View style={styles.banner}>
              <AppText variant="small" style={styles.bannerText}>
                Add your Supabase credentials to `.env` first or this request cannot be sent.
              </AppText>
            </View>
          ) : null}

          <View style={styles.form}>
            <AppInput
              placeholder="Correo electronico"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <AppButton
              title={loading ? 'Sending...' : 'Send reset email'}
              onPress={handleReset}
              disabled={loading}
            />
          </View>

          <Pressable onPress={() => router.back()}>
            <AppText variant="small" style={styles.backText}>
              Back to login
            </AppText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  headerCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  banner: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  bannerText: {
    color: '#92400E',
  },
  form: {
    gap: spacing.md,
  },
  backText: {
    color: colors.primary,
    fontWeight: '700',
  },
});
