import { Pressable, StyleSheet } from 'react-native';
import AppText from '../../../components/common/AppText';
import { colors, radius, spacing } from '../../../theme';

interface LogoutButtonProps {
  onPress: () => void;
}

export default function LogoutButton({ onPress }: LogoutButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AppText variant="body" style={styles.text}>
        Log out all devices
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  text: {
    color: colors.error,
    fontWeight: '700',
  },
});
