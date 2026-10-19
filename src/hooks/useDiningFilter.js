export function useDiningFilter(menuItems, selectedCategory, dietaryPreferences) {
  return menuItems.filter((item) => {
    const categoryMatches = item.category === selectedCategory;
    const dietaryMatches = dietaryPreferences.length
      ? dietaryPreferences.every((preference) => item.dietaryTags.includes(preference))
      : true;

    return categoryMatches && dietaryMatches;
  });
}
