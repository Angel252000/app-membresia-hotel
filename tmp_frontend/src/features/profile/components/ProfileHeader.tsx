import { Pressable, StyleSheet, View } from 'react-native';
import AppText from '../../../components/common/AppText';
import { colors, radius, spacing } from '../../../theme';
import { ProfileStat, UserProfile } from '../../../types/profile';

interface ProfileHeaderProps {
  profile: UserProfile;
  stats: ProfileStat[];
}

function getInitials(fullName: string) {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((value) => value[0])
    .join('')
    .toUpperCase();
}

export default function ProfileHeader({ profile, stats }: ProfileHeaderProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.identityRow}>
          <View style={styles.avatar}>
            <AppText variant="subtitle" style={styles.avatarText}>
              {getInitials(profile.fullName)}
            </AppText>
          </View>

          <View style={styles.identityCopy}>
            <AppText variant="title">{profile.fullName}</AppText>
            <AppText variant="small">{profile.email}</AppText>
            <AppText variant="small">Member #{profile.memberNumber}</AppText>
          </View>
        </View>

        <Pressable style={styles.editButton}>
          <AppText variant="small" style={styles.editButtonText}>
            Edit profile
          </AppText>
        </Pressable>
      </View>

      <View style={styles.badgeRow}>
        <View style={styles.tierBadge}>
          <AppText variant="small" style={styles.tierBadgeText}>
            {profile.membershipTier}
          </AppText>
        </View>
        <AppText variant="small">Preferred hotel: {profile.preferredHotel}</AppText>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <AppText variant="subtitle">{stat.value}</AppText>
            <AppText variant="small">{stat.label}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EFF6FF',
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  identityRow: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primaryText,
    fontWeight: '700',
  },
  identityCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  editButtonText: {
    color: colors.primaryText,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
  },
  tierBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  tierBadgeText: {
    color: '#111827',
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    minWidth: 110,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
});
