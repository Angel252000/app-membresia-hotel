import {
  DiningReservation,
  FoodItem,
  MenuCategory,
  Restaurant,
  RoomServiceOrder,
} from '../types/dining';

const menuCategories: MenuCategory[] = [
  { id: 'breakfast', label: 'Breakfast', icon: 'sunrise' },
  { id: 'lunch', label: 'Lunch', icon: 'salad' },
  { id: 'dinner', label: 'Dinner', icon: 'moon' },
  { id: 'drinks', label: 'Drinks', icon: 'glass' },
  { id: 'desserts', label: 'Desserts', icon: 'cake' },
  { id: 'specials', label: 'Specials', icon: 'star' },
];

const restaurants: Restaurant[] = [
  {
    id: 'aurora-room',
    restaurantName: 'Aurora Room',
    cuisineType: 'Modern Coastal',
    location: 'Sky Terrace - Level 12',
    rating: 4.9,
    totalReviews: 328,
    priceRange: '$$$$',
    openingHours: '18:00 - 23:00',
    availableNow: true,
    dressCode: 'Elegant evening',
    featuredChef: 'Lucia Verano',
    reservationAvailable: true,
    accentColor: '#B45309',
  },
  {
    id: 'citrus-atelier',
    restaurantName: 'Citrus Atelier',
    cuisineType: 'Mediterranean Garden',
    location: 'Poolside Pavilion',
    rating: 4.7,
    totalReviews: 214,
    priceRange: '$$$',
    openingHours: '12:00 - 22:00',
    availableNow: true,
    dressCode: 'Resort chic',
    featuredChef: 'Matteo Sol',
    reservationAvailable: true,
    accentColor: '#16A34A',
  },
  {
    id: 'ember-oak',
    restaurantName: 'Ember & Oak',
    cuisineType: 'Fire Kitchen',
    location: 'Garden Court',
    rating: 4.8,
    totalReviews: 271,
    priceRange: '$$$',
    openingHours: '17:30 - 22:30',
    availableNow: false,
    dressCode: 'Smart casual',
    featuredChef: 'Noah Vale',
    reservationAvailable: true,
    accentColor: '#BE185D',
  },
];

const foodItems: FoodItem[] = [
  {
    id: 'sunrise-citrus-bowl',
    restaurantId: 'citrus-atelier',
    itemName: 'Sunrise Citrus Bowl',
    description: 'Seasonal fruit, coconut yogurt, toasted pistachio, and mint syrup.',
    ingredients: ['Mango', 'Papaya', 'Coconut yogurt'],
    category: 'breakfast',
    dietaryTags: ['vegetarian', 'gluten-free'],
    price: 18,
    prepTime: '10 min',
    available: true,
    popular: true,
    chefSpecial: false,
  },
  {
    id: 'garden-mezze-table',
    restaurantId: 'citrus-atelier',
    itemName: 'Garden Mezze Table',
    description: 'Whipped feta, olives, marinated vegetables, and warm flatbread.',
    ingredients: ['Feta', 'Olives', 'Flatbread'],
    category: 'lunch',
    dietaryTags: ['vegetarian'],
    price: 24,
    prepTime: '15 min',
    available: true,
    popular: false,
    chefSpecial: false,
  },
  {
    id: 'oakfire-tenderloin',
    restaurantId: 'ember-oak',
    itemName: 'Oakfire Tenderloin',
    description: 'Prime beef with smoked jus, charred leek, and truffle potato pave.',
    ingredients: ['Beef', 'Leek', 'Truffle potato'],
    category: 'dinner',
    dietaryTags: ['chef-special'],
    price: 54,
    prepTime: '28 min',
    available: true,
    popular: true,
    chefSpecial: true,
  },
  {
    id: 'reserve-negroni',
    restaurantId: 'aurora-room',
    itemName: 'Reserve Negroni',
    description: 'Barrel-rested negroni finished with orange blossom vapor.',
    ingredients: ['Gin', 'Vermouth', 'Campari'],
    category: 'drinks',
    dietaryTags: ['chef-special'],
    price: 19,
    prepTime: '6 min',
    available: true,
    popular: false,
    chefSpecial: true,
  },
  {
    id: 'vanilla-fig-millefeuille',
    restaurantId: 'aurora-room',
    itemName: 'Vanilla Fig Millefeuille',
    description: 'Crisp pastry layers with vanilla cream and caramelized fig.',
    ingredients: ['Vanilla', 'Fig', 'Butter pastry'],
    category: 'desserts',
    dietaryTags: ['vegetarian'],
    price: 16,
    prepTime: '12 min',
    available: true,
    popular: true,
    chefSpecial: false,
  },
  {
    id: 'chef-tasting-prelude',
    restaurantId: 'aurora-room',
    itemName: 'Chef Tasting Prelude',
    description: 'Five seasonal bites previewing the signature tasting menu.',
    ingredients: ['Daily market selection'],
    category: 'specials',
    dietaryTags: ['chef-special'],
    price: 38,
    prepTime: '20 min',
    available: false,
    popular: false,
    chefSpecial: true,
  },
];

const wait = async (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDiningCategories(): Promise<MenuCategory[]> {
  await wait();
  return menuCategories;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  await wait();
  return restaurants;
}

export async function getMenuItems(): Promise<FoodItem[]> {
  await wait();
  return foodItems;
}

export async function getMenuItemsByCategory(categoryId: MenuCategory['id']): Promise<FoodItem[]> {
  await wait();
  return foodItems.filter((item) => item.category === categoryId);
}

export async function createDiningReservation(reservation: DiningReservation): Promise<{
  success: boolean;
  message: string;
  reservation: DiningReservation;
}> {
  await wait();
  return {
    success: true,
    message: `Reservation confirmed for ${reservation.guests} guests at ${reservation.time}.`,
    reservation,
  };
}

export async function createRoomServiceOrder(order: RoomServiceOrder): Promise<{
  success: boolean;
  message: string;
  order: RoomServiceOrder;
}> {
  await wait();
  return {
    success: true,
    message: `Room service scheduled for room ${order.roomNumber}.`,
    order,
  };
}
