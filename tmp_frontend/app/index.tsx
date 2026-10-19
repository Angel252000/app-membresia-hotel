import { Redirect, router } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ScreenContainer from '../src/components/common/ScreenContainer';
import AppText from '../src/components/common/AppText';
import AppButton from '../src/components/common/AppButton';
import { colors, spacing } from '../src/theme';
import { useAuth } from '../src/hooks/useAuth';

export default function IndexScreen() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <ScreenContainer style={styles.loadingState}>
        <ActivityIndicator size="large" color={colors.primary} />
        <AppText variant="small">Checking your session...</AppText>
      </ScreenContainer>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <AppText variant="title">Bienvenido a Hotel App</AppText>
        <AppText variant="small">
          Reserva, administra y consulta todo desde un solo lugar.
        </AppText>

        <View style={styles.actions}>
          <AppButton title="Iniciar sesion" onPress={() => router.push('/(auth)/login')} />
          <AppButton title="Registrarse" onPress={() => router.push('/(auth)/register')} />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loadingState: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  actions: {
    gap: spacing.md,
  },
});
