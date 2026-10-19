export function getRestaurantById(restaurants, restaurantId) {
  return restaurants.find((restaurant) => restaurant.id === restaurantId) ?? null;
}
