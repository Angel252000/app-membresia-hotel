export type MembershipTier = 'Silver' | 'Gold' | 'Platinum' | 'Black';

export type ProfileSectionId =
  | 'overview'
  | 'personal'
  | 'security'
  | 'payments'
  | 'travel'
  | 'dining'
  | 'notifications'
  | 'loyalty'
  | 'guests'
  | 'documents'
  | 'billing'
  | 'privacy'
  | 'danger';

export interface ProfileStat {
  label: string;
  value: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface TravelPreferences {
  favoriteRoomType: string;
  preferredFloor: string;
  preferredView: string;
  smokingPreference: string;
  earlyCheckIn: boolean;
  lateCheckout: boolean;
  pillowType: string;
  bedType: string;
  accessibilityNeeds: string;
  quietRoom: boolean;
  highFloor: boolean;
  petFriendly: boolean;
  familyTravel: boolean;
}

export interface DiningPreferences {
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  allergies: string[];
  preferredDiningTimes: string[];
  alcoholPreference: string;
  favoriteDrinks: string[];
  chefRecommendations: boolean;
  celebrationMoments: string[];
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  holderName: string;
  isPrimary: boolean;
  billingAddress: string;
}

export interface SavedGuest {
  id: string;
  fullName: string;
  relationship: string;
  notes: string;
}

export interface NotificationSettings {
  bookingConfirmations: boolean;
  paymentAlerts: boolean;
  cancellationAlerts: boolean;
  promotions: boolean;
  loyaltyUpdates: boolean;
  diningOffers: boolean;
  specialEvents: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  whatsappAlerts: boolean;
  marketingConsent: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  verifiedIdentity: boolean;
  recoveryMethods: string[];
  activeDevices: number;
  lastLogin: string;
  securityAlerts: number;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
  type: string;
}

export interface TravelDocument {
  id: string;
  type: string;
  identifier: string;
  expiryDate: string;
  status: string;
}

export interface PrivacySettings {
  gdprConsent: boolean;
  cookiePreferences: string;
  thirdPartySharing: boolean;
  dataRetention: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  alternateEmail: string;
  phone: string;
  secondaryPhone: string;
  memberNumber: string;
  membershipTier: MembershipTier;
  loyaltyPoints: number;
  totalStays: number;
  totalNights: number;
  totalSpent: string;
  preferredHotel: string;
  nationality: string;
  gender: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  preferredLanguage: string;
  preferredCurrency: string;
  timezone: string;
  emergencyContact: EmergencyContact;
  travelPreferences: TravelPreferences;
  diningPreferences: DiningPreferences;
  paymentMethods: PaymentMethod[];
  savedGuests: SavedGuest[];
  notifications: NotificationSettings;
  securitySettings: SecuritySettings;
  loyaltyRewards: LoyaltyReward[];
  invoices: Invoice[];
  travelDocuments: TravelDocument[];
  privacySettings: PrivacySettings;
}

export interface ProfileSection {
  id: ProfileSectionId;
  label: string;
  description: string;
}
