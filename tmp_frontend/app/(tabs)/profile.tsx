import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';

import ScreenContainer from '../../src/components/common/ScreenContainer';
import AppText from '../../src/components/common/AppText';
import AppButton from '../../src/components/common/AppButton';
import LogoutButton from '../../src/features/profile/components/LogoutButton';
import ProfileHeader from '../../src/features/profile/components/ProfileHeader';
import ProfileMenuItem from '../../src/features/profile/components/ProfileMenuItem';
import { useAuth } from '../../src/hooks/useAuth';
import { getProfileData, getProfileSections } from '../../src/services/profileService';
import { colors, radius, spacing } from '../../src/theme';
import {
  ProfileSection,
  ProfileSectionId,
  ProfileStat,
  UserProfile,
} from '../../src/types/profile';

function renderBoolean(value: boolean) {
  return value ? 'Enabled' : 'Disabled';
}

function renderList(title: string, items: string[]) {
  return (
    <View style={styles.infoCard}>
      <AppText variant="subtitle">{title}</AppText>
      <AppText variant="small">{items.join(', ')}</AppText>
    </View>
  );
}

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sections, setSections] = useState<ProfileSection[]>([]);
  const [activeSection, setActiveSection] = useState<ProfileSectionId>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfilePortal() {
      try {
        const [profileData, sectionData] = await Promise.all([
          getProfileData(),
          getProfileSections(),
        ]);

        setProfile(profileData);
        setSections(sectionData);
      } finally {
        setLoading(false);
      }
    }

    loadProfilePortal();
  }, []);

  const headerStats = useMemo<ProfileStat[]>(() => {
    if (!profile) {
      return [];
    }

    return [
      { label: 'Loyalty points', value: profile.loyaltyPoints.toLocaleString() },
      { label: 'Completed stays', value: `${profile.totalStays}` },
      { label: 'Nights hosted', value: `${profile.totalNights}` },
      { label: 'Lifetime spend', value: profile.totalSpent },
    ];
  }, [profile]);

  const activeSectionMeta = useMemo(
    () => sections.find((section) => section.id === activeSection),
    [sections, activeSection],
  );

  async function handleSignOut() {
    const result = await signOut();

    if (result.error) {
      Alert.alert('Sign out failed', result.error);
      return;
    }

    router.replace('/(auth)/login');
  }

  if (loading || !profile) {
    return (
      <ScreenContainer style={styles.loadingState}>
        <ActivityIndicator size="large" color={colors.primary} />
        <AppText variant="body">Loading your profile portal...</AppText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <ProfileHeader profile={profile} stats={headerStats} />

        <View style={styles.sectionBlock}>
          <AppText variant="subtitle">Control center</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuRow}>
            {sections.map((section) => (
              <ProfileMenuItem
                key={section.id}
                section={section}
                active={section.id === activeSection}
                onPress={() => setActiveSection(section.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.panelCard}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHeaderCopy}>
              <AppText variant="subtitle">{activeSectionMeta?.label ?? 'Profile'}</AppText>
              <AppText variant="small">{activeSectionMeta?.description}</AppText>
            </View>
            <Pressable style={styles.inlineButton} onPress={() => setActiveSection('overview')}>
              <AppText variant="small" style={styles.inlineButtonText}>
                Back to overview
              </AppText>
            </Pressable>
          </View>

          {activeSection === 'overview' ? (
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Membership status</AppText>
                <AppText variant="small">{profile.membershipTier} tier member</AppText>
                <AppText variant="small">{profile.loyaltyRewards.filter((reward) => reward.unlocked).length} active rewards unlocked</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Security posture</AppText>
                <AppText variant="small">2FA: {renderBoolean(profile.securitySettings.twoFactorEnabled)}</AppText>
                <AppText variant="small">Biometrics: {renderBoolean(profile.securitySettings.biometricEnabled)}</AppText>
                <AppText variant="small">Devices: {profile.securitySettings.activeDevices}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Payment control</AppText>
                <AppText variant="small">{profile.paymentMethods.length} payment methods saved</AppText>
                <AppText variant="small">
                  Primary card: {profile.paymentMethods.find((method) => method.isPrimary)?.brand} ending in {profile.paymentMethods.find((method) => method.isPrimary)?.last4}
                </AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Guest memory</AppText>
                <AppText variant="small">{profile.savedGuests.length} frequent travelers stored</AppText>
                <AppText variant="small">Preferred hotel: {profile.preferredHotel}</AppText>
              </View>
            </View>
          ) : null}

          {activeSection === 'personal' ? (
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Contact details</AppText>
                <AppText variant="small">Primary email: {profile.email}</AppText>
                <AppText variant="small">Alternate email: {profile.alternateEmail}</AppText>
                <AppText variant="small">Phone: {profile.phone}</AppText>
                <AppText variant="small">Secondary phone: {profile.secondaryPhone}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Identity</AppText>
                <AppText variant="small">Birth date: {profile.birthDate}</AppText>
                <AppText variant="small">Nationality: {profile.nationality}</AppText>
                <AppText variant="small">Gender: {profile.gender}</AppText>
                <AppText variant="small">Timezone: {profile.timezone}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Address</AppText>
                <AppText variant="small">{profile.address}</AppText>
                <AppText variant="small">{profile.city}, {profile.country}</AppText>
                <AppText variant="small">Postal code: {profile.postalCode}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Emergency contact</AppText>
                <AppText variant="small">{profile.emergencyContact.name}</AppText>
                <AppText variant="small">{profile.emergencyContact.relationship}</AppText>
                <AppText variant="small">{profile.emergencyContact.phone}</AppText>
              </View>
            </View>
          ) : null}

          {activeSection === 'security' ? (
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Protection status</AppText>
                <AppText variant="small">2FA: {renderBoolean(profile.securitySettings.twoFactorEnabled)}</AppText>
                <AppText variant="small">Biometric login: {renderBoolean(profile.securitySettings.biometricEnabled)}</AppText>
                <AppText variant="small">Identity verification: {renderBoolean(profile.securitySettings.verifiedIdentity)}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Session activity</AppText>
                <AppText variant="small">Active devices: {profile.securitySettings.activeDevices}</AppText>
                <AppText variant="small">Last login: {profile.securitySettings.lastLogin}</AppText>
                <AppText variant="small">Security alerts: {profile.securitySettings.securityAlerts}</AppText>
              </View>
              {renderList('Recovery methods', profile.securitySettings.recoveryMethods)}
            </View>
          ) : null}

          {activeSection === 'payments' ? (
            <View style={styles.grid}>
              {profile.paymentMethods.map((method) => (
                <View key={method.id} style={styles.infoCard}>
                  <AppText variant="subtitle">{method.brand} ending in {method.last4}</AppText>
                  <AppText variant="small">Holder: {method.holderName}</AppText>
                  <AppText variant="small">Expiry: {method.expiry}</AppText>
                  <AppText variant="small">Billing: {method.billingAddress}</AppText>
                  <AppText variant="small">{method.isPrimary ? 'Primary payment method' : 'Backup payment method'}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {activeSection === 'travel' ? (
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Stay setup</AppText>
                <AppText variant="small">Room: {profile.travelPreferences.favoriteRoomType}</AppText>
                <AppText variant="small">View: {profile.travelPreferences.preferredView}</AppText>
                <AppText variant="small">Floor: {profile.travelPreferences.preferredFloor}</AppText>
                <AppText variant="small">Smoking: {profile.travelPreferences.smokingPreference}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Comfort profile</AppText>
                <AppText variant="small">Pillow: {profile.travelPreferences.pillowType}</AppText>
                <AppText variant="small">Bed: {profile.travelPreferences.bedType}</AppText>
                <AppText variant="small">Accessibility: {profile.travelPreferences.accessibilityNeeds}</AppText>
              </View>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Flex preferences</AppText>
                <AppText variant="small">Early check-in: {renderBoolean(profile.travelPreferences.earlyCheckIn)}</AppText>
                <AppText variant="small">Late checkout: {renderBoolean(profile.travelPreferences.lateCheckout)}</AppText>
                <AppText variant="small">Quiet room: {renderBoolean(profile.travelPreferences.quietRoom)}</AppText>
                <AppText variant="small">High floor: {renderBoolean(profile.travelPreferences.highFloor)}</AppText>
              </View>
            </View>
          ) : null}

          {activeSection === 'dining' ? (
            <View style={styles.grid}>
              {renderList('Dietary restrictions', profile.diningPreferences.dietaryRestrictions)}
              {renderList('Favorite cuisines', profile.diningPreferences.favoriteCuisines)}
              {renderList('Allergies', profile.diningPreferences.allergies)}
              {renderList('Favorite drinks', profile.diningPreferences.favoriteDrinks)}
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Dining rhythm</AppText>
                <AppText variant="small">Preferred times: {profile.diningPreferences.preferredDiningTimes.join(', ')}</AppText>
                <AppText variant="small">Alcohol preference: {profile.diningPreferences.alcoholPreference}</AppText>
                <AppText variant="small">Chef recommendations: {renderBoolean(profile.diningPreferences.chefRecommendations)}</AppText>
              </View>
            </View>
          ) : null}

          {activeSection === 'notifications' ? (
            <View style={styles.grid}>
              {Object.entries(profile.notifications).map(([key, value]) => (
                <View key={key} style={styles.infoCard}>
                  <AppText variant="subtitle">{key}</AppText>
                  <AppText variant="small">{renderBoolean(value)}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {activeSection === 'loyalty' ? (
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Current progress</AppText>
                <AppText variant="small">Tier: {profile.membershipTier}</AppText>
                <AppText variant="small">Points: {profile.loyaltyPoints.toLocaleString()}</AppText>
                <AppText variant="small">Preferred hotel: {profile.preferredHotel}</AppText>
              </View>
              {profile.loyaltyRewards.map((reward) => (
                <View key={reward.id} style={styles.infoCard}>
                  <AppText variant="subtitle">{reward.title}</AppText>
                  <AppText variant="small">{reward.description}</AppText>
                  <AppText variant="small">{reward.unlocked ? 'Unlocked' : 'Locked'}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {activeSection === 'guests' ? (
            <View style={styles.grid}>
              {profile.savedGuests.map((guest) => (
                <View key={guest.id} style={styles.infoCard}>
                  <AppText variant="subtitle">{guest.fullName}</AppText>
                  <AppText variant="small">{guest.relationship}</AppText>
                  <AppText variant="small">{guest.notes}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {activeSection === 'documents' ? (
            <View style={styles.grid}>
              {profile.travelDocuments.map((document) => (
                <View key={document.id} style={styles.infoCard}>
                  <AppText variant="subtitle">{document.type}</AppText>
                  <AppText variant="small">ID: {document.identifier}</AppText>
                  <AppText variant="small">Expiry: {document.expiryDate}</AppText>
                  <AppText variant="small">Status: {document.status}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {activeSection === 'billing' ? (
            <View style={styles.grid}>
              {profile.invoices.map((invoice) => (
                <View key={invoice.id} style={styles.infoCard}>
                  <AppText variant="subtitle">{invoice.id}</AppText>
                  <AppText variant="small">Date: {invoice.date}</AppText>
                  <AppText variant="small">Amount: {invoice.amount}</AppText>
                  <AppText variant="small">Status: {invoice.status}</AppText>
                  <AppText variant="small">Type: {invoice.type}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {activeSection === 'privacy' ? (
            <View style={styles.grid}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Consent and sharing</AppText>
                <AppText variant="small">GDPR: {renderBoolean(profile.privacySettings.gdprConsent)}</AppText>
                <AppText variant="small">Third-party sharing: {renderBoolean(profile.privacySettings.thirdPartySharing)}</AppText>
                <AppText variant="small">Cookies: {profile.privacySettings.cookiePreferences}</AppText>
                <AppText variant="small">Retention: {profile.privacySettings.dataRetention}</AppText>
              </View>
            </View>
          ) : null}

          {activeSection === 'danger' ? (
            <View style={styles.dangerZone}>
              <View style={styles.infoCard}>
                <AppText variant="subtitle">Sensitive actions</AppText>
                <AppText variant="small">Reset preferences, revoke devices, or begin account deletion review.</AppText>
              </View>
              <LogoutButton onPress={handleSignOut} />
            </View>
          ) : null}
        </View>

        <View style={styles.actionsRow}>
          <AppButton title="View my stays" onPress={() => router.push('/(tabs)/stays')} style={styles.flexButton} />
          <AppButton title="Go to dining" onPress={() => router.push('/(tabs)/dining')} style={styles.flexButton} />
        </View>
      </ScrollView>
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
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionBlock: {
    gap: spacing.md,
  },
  menuRow: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  panelCard: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  panelHeaderCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  inlineButton: {
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inlineButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  grid: {
    gap: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  dangerZone: {
    gap: spacing.md,
  },
  actionsRow: {
    gap: spacing.md,
  },
  flexButton: {
    width: '100%',
  },
});
