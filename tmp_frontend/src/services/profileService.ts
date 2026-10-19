import { ProfileSection, UserProfile } from '../types/profile';

const profileSections: ProfileSection[] = [
  { id: 'overview', label: 'Overview', description: 'Quick stats and account pulse.' },
  { id: 'personal', label: 'Personal Info', description: 'Identity, language and contact details.' },
  { id: 'security', label: 'Security', description: '2FA, devices and account protection.' },
  { id: 'payments', label: 'Payments', description: 'Cards, wallets and billing addresses.' },
  { id: 'travel', label: 'Travel Preferences', description: 'Room, bed and stay preferences.' },
  { id: 'dining', label: 'Dining Preferences', description: 'Cuisine, allergies and celebration moments.' },
  { id: 'notifications', label: 'Notifications', description: 'Control every communication channel.' },
  { id: 'loyalty', label: 'Loyalty Program', description: 'Tier progress and unlocked rewards.' },
  { id: 'guests', label: 'Saved Guests', description: 'Frequent travelers linked to the account.' },
  { id: 'documents', label: 'Travel Documents', description: 'Documents and expiration reminders.' },
  { id: 'billing', label: 'Billing & Invoices', description: 'Invoices, refunds and export history.' },
  { id: 'privacy', label: 'Privacy', description: 'Data sharing and retention controls.' },
  { id: 'danger', label: 'Danger Zone', description: 'Sensitive account actions and resets.' },
];

const profileData: UserProfile = {
  id: 'guest-001',
  fullName: 'Valentina Rosales',
  firstName: 'Valentina',
  lastName: 'Rosales',
  avatar: '',
  email: 'valentina.rosales@example.com',
  alternateEmail: 'v.rosales@workmail.com',
  phone: '+506 8888 1234',
  secondaryPhone: '+506 2222 8899',
  memberNumber: 'HTL-PLT-904512',
  membershipTier: 'Platinum',
  loyaltyPoints: 28450,
  totalStays: 19,
  totalNights: 63,
  totalSpent: '$18,940',
  preferredHotel: 'Aurora Grand Resort',
  nationality: 'Costa Rica',
  gender: 'Female',
  birthDate: '1992-08-14',
  address: 'Escazu Village, Torre Norte',
  city: 'San Jose',
  country: 'Costa Rica',
  postalCode: '10203',
  preferredLanguage: 'Espanol',
  preferredCurrency: 'USD',
  timezone: 'America/Costa_Rica',
  emergencyContact: {
    name: 'Daniel Rosales',
    relationship: 'Brother',
    phone: '+506 8765 4321',
  },
  travelPreferences: {
    favoriteRoomType: 'Suite with balcony',
    preferredFloor: 'High floor',
    preferredView: 'Ocean view',
    smokingPreference: 'Non-smoking',
    earlyCheckIn: true,
    lateCheckout: true,
    pillowType: 'Memory foam',
    bedType: 'King',
    accessibilityNeeds: 'None',
    quietRoom: true,
    highFloor: true,
    petFriendly: false,
    familyTravel: true,
  },
  diningPreferences: {
    dietaryRestrictions: ['Gluten free'],
    favoriteCuisines: ['Mediterranean', 'Japanese', 'Fine dining'],
    allergies: ['Peanuts'],
    preferredDiningTimes: ['Breakfast 08:00', 'Dinner 19:30'],
    alcoholPreference: 'Wine pairings',
    favoriteDrinks: ['Negroni', 'Sparkling water', 'Pinot noir'],
    chefRecommendations: true,
    celebrationMoments: ['Birthdays', 'Anniversaries'],
  },
  paymentMethods: [
    {
      id: 'card-1',
      brand: 'Visa',
      last4: '4242',
      expiry: '08/28',
      holderName: 'Valentina Rosales',
      isPrimary: true,
      billingAddress: 'Escazu Village, Torre Norte',
    },
    {
      id: 'card-2',
      brand: 'Amex',
      last4: '1008',
      expiry: '11/27',
      holderName: 'Valentina Rosales',
      isPrimary: false,
      billingAddress: 'Corporate HQ, Sabana',
    },
  ],
  savedGuests: [
    {
      id: 'guest-01',
      fullName: 'Daniel Rosales',
      relationship: 'Family',
      notes: 'Quiet room and late checkout preferred.',
    },
    {
      id: 'guest-02',
      fullName: 'Lucia Morales',
      relationship: 'Executive Assistant',
      notes: 'Usually travels for corporate stays.',
    },
  ],
  notifications: {
    bookingConfirmations: true,
    paymentAlerts: true,
    cancellationAlerts: true,
    promotions: false,
    loyaltyUpdates: true,
    diningOffers: true,
    specialEvents: false,
    pushNotifications: true,
    smsNotifications: false,
    whatsappAlerts: true,
    marketingConsent: false,
  },
  securitySettings: {
    twoFactorEnabled: true,
    biometricEnabled: true,
    verifiedIdentity: true,
    recoveryMethods: ['Backup email', 'Phone verification'],
    activeDevices: 3,
    lastLogin: '2026-04-20 09:45',
    securityAlerts: 1,
  },
  loyaltyRewards: [
    {
      id: 'reward-1',
      title: 'Suite Upgrade',
      description: 'Eligible on your next qualifying stay.',
      unlocked: true,
    },
    {
      id: 'reward-2',
      title: 'Exclusive Dining Access',
      description: 'Priority access to chef tasting events.',
      unlocked: true,
    },
    {
      id: 'reward-3',
      title: 'Black Tier Preview',
      description: '7,550 points away from the next status.',
      unlocked: false,
    },
  ],
  invoices: [
    { id: 'INV-1001', date: '2026-03-14', amount: '$1,280', status: 'Paid', type: 'Stay invoice' },
    { id: 'INV-0948', date: '2026-01-08', amount: '$640', status: 'Refunded', type: 'Dining adjustment' },
    { id: 'INV-0875', date: '2025-12-21', amount: '$2,940', status: 'Paid', type: 'Holiday package' },
  ],
  travelDocuments: [
    { id: 'doc-1', type: 'Passport', identifier: 'CR908812', expiryDate: '2028-09-16', status: 'Valid' },
    { id: 'doc-2', type: 'Visa', identifier: 'US-B1-7782', expiryDate: '2027-02-10', status: 'Renew soon' },
  ],
  privacySettings: {
    gdprConsent: true,
    cookiePreferences: 'Essential + analytics',
    thirdPartySharing: false,
    dataRetention: 'Standard hospitality retention',
  },
};

const wait = async (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProfileData(): Promise<UserProfile> {
  await wait();
  return profileData;
}

export async function getProfileSections(): Promise<ProfileSection[]> {
  await wait();
  return profileSections;
}
