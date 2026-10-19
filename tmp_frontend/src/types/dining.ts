export type DiningCategory =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'drinks'
  | 'desserts'
  | 'specials';

export type DietaryPreference =
  | 'vegan'
  | 'vegetarian'
  | 'gluten-free'
  | 'lactose-free'
  | 'halal'
  | 'kosher'
  | 'nut-free'
  | 'low-sodium'
  | 'keto-friendly'
  | 'chef-special';

export interface MenuCategory {
  id: DiningCategory;
  label: string;
  icon: string;
}

export interface Restaurant {
  id: string;
  restaurantName: string;
  cuisineType: string;
  location: string;
  rating: number;
  totalReviews: number;
  priceRange: string;
  openingHours: string;
  availableNow: boolean;
  dressCode?: string;
  featuredChef?: string;
  reservationAvailable: boolean;
  accentColor: string;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  itemName: string;
  description: string;
  ingredients: string[];
  category: DiningCategory;
  dietaryTags: DietaryPreference[];
  price: number;
  prepTime: string;
  available: boolean;
  popular: boolean;
  chefSpecial: boolean;
}

export interface DiningReservation {
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  selectedItemIds: string[];
}

export interface DiningReview {
  reservationId: string;
  rating: number;
  comment?: string;
  favoriteDish?: string;
  recommend: boolean;
}

export interface RoomServiceOrder {
  roomNumber: string;
  itemIds: string[];
  instructions?: string;
  billingMethod: 'room-charge' | 'card-on-file';
}
