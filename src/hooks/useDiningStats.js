export function useDiningStats(restaurants, menuItems, statConfig) {
  const totalReviews = restaurants.reduce((sum, restaurant) => sum + restaurant.totalReviews, 0);
  const averageRating = (
    restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) / restaurants.length
  ).toFixed(1);

  return [
    {
      label: statConfig.restaurantsLabel,
      value: restaurants.length,
      icon: 'restaurants',
    },
    {
      label: statConfig.menuItemsLabel,
      value: menuItems.length,
      icon: 'menu',
    },
    {
      label: statConfig.ratingLabel,
      value: `${averageRating} / 5`,
      icon: 'rating',
    },
    {
      label: statConfig.reviewsLabel,
      value: totalReviews,
      icon: 'reviews',
    },
  ];
}
