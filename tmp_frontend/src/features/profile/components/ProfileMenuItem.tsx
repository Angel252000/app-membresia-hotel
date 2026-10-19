import { Pressable, StyleSheet, View } from 'react-native';
import AppText from '../../../components/common/AppText';
import { colors, radius, spacing } from '../../../theme';
import { ProfileSection } from '../../../types/profile';

interface ProfileMenuItemProps {
  section: ProfileSection;
  active: boolean;
  onPress: () => void;
}

export default function ProfileMenuItem({ section, active, onPress }: ProfileMenuItemProps) {
  return (
    <Pressable
      style={[styles.item, active && styles.itemActive]}
      onPress={onPress}
    >
      <View style={styles.copy}>
        <AppText variant="body" style={active ? styles.activeText : undefined}>
          {section.label}
        </AppText>
        <AppText variant="small" style={active ? styles.activeSubtext : undefined}>
          {section.description}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 190,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  itemActive: {
    backgroundColor: '#DBEAFE',
    borderColor: colors.primary,
  },
  copy: {
    gap: spacing.xs,
  },
  activeText: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeSubtext: {
    color: '#1D4ED8',
  },
});
