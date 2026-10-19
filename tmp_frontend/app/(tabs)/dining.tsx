import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AppText from '../../src/components/common/AppText';
import ScreenContainer from '../../src/components/common/ScreenContainer';
import { colors, radius, spacing } from '../../src/theme';
import {
  getDiningCategories,
  getMenuItems,
  getRestaurants,
} from '../../src/services/diningService';
import { FoodItem, MenuCategory, Restaurant } from '../../src/types/dining';

export default function DiningScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory['id']>('breakfast');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDiningData() {
      try {
        const [restaurantData, categoryData, menuData] = await Promise.all([
          getRestaurants(),
          getDiningCategories(),
          getMenuItems(),
        ]);

        setRestaurants(restaurantData);
        setCategories(categoryData);
        setMenuItems(menuData);
        setSelectedRestaurantId(restaurantData[0]?.id ?? '');
        setSelectedCategory(categoryData[0]?.id ?? 'breakfast');
      } finally {
        setLoading(false);
      }
    }

    loadDiningData();
  }, []);

  const selectedRestaurant = useMemo(
    () => restaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ?? restaurants[0],
    [restaurants, selectedRestaurantId],
  );

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatches = item.category === selectedCategory;
      const restaurantMatches = selectedRestaurantId ? item.restaurantId === selectedRestaurantId : true;
      return categoryMatches && restaurantMatches;
    });
  }, [menuItems, selectedCategory, selectedRestaurantId]);

  if (loading) {
    return (
      <ScreenContainer style={styles.centeredState}>
        <ActivityIndicator size="large" color={colors.primary} />
        <AppText variant="body">Loading dining experiences...</AppText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <AppText variant="small" style={styles.eyebrow}>
            PORTAL DINING
          </AppText>
          <AppText variant="title">Descubre, reserva y disfruta la experiencia gastronómica.</AppText>
          <AppText variant="body" style={styles.supportingText}>
            Restaurantes premium, menús por categoría y room service en un solo lugar.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle">Restaurantes destacados</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {restaurants.map((restaurant) => {
              const selected = restaurant.id === selectedRestaurantId;

              return (
                <Pressable
                  key={restaurant.id}
                  style={[
                    styles.restaurantCard,
                    selected && styles.restaurantCardSelected,
                    { borderColor: selected ? restaurant.accentColor : colors.border },
                  ]}
                  onPress={() => setSelectedRestaurantId(restaurant.id)}
                >
                  <View style={[styles.restaurantAccent, { backgroundColor: restaurant.accentColor }]} />
                  <AppText variant="subtitle">{restaurant.restaurantName}</AppText>
                  <AppText variant="small">{restaurant.cuisineType}</AppText>
                  <AppText variant="small">{restaurant.location}</AppText>
                  <AppText variant="small">
                    {restaurant.rating} stars · {restaurant.totalReviews} reviews
                  </AppText>
                  <AppText variant="small">
                    {restaurant.priceRange} · {restaurant.openingHours}
                  </AppText>
                  <AppText variant="small" style={{ color: restaurant.availableNow ? colors.success : colors.error }}>
                    {restaurant.availableNow ? 'Disponible ahora' : 'Disponibilidad limitada'}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle">Categorías del menú</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {categories.map((category) => {
              const active = category.id === selectedCategory;

              return (
                <Pressable
                  key={category.id}
                  style={[styles.categoryChip, active && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <AppText variant="body" style={active ? styles.categoryChipTextActive : undefined}>
                    {category.label}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <AppText variant="subtitle">
            {selectedRestaurant?.restaurantName ?? 'Dining'} · {categories.find((item) => item.id === selectedCategory)?.label}
          </AppText>

          {filteredMenuItems.length ? (
            filteredMenuItems.map((item) => (
              <View key={item.id} style={styles.menuCard}>
                <View style={styles.menuHeader}>
                  <View style={styles.menuCopy}>
                    <AppText variant="subtitle">{item.itemName}</AppText>
                    <AppText variant="body" style={styles.supportingText}>
                      {item.description}
                    </AppText>
                  </View>
                  <AppText variant="subtitle">${item.price}</AppText>
                </View>

                <AppText variant="small">Ingredientes: {item.ingredients.join(', ')}</AppText>
                <AppText variant="small">Preparación: {item.prepTime}</AppText>
                <AppText variant="small">
                  Tags: {item.dietaryTags.length ? item.dietaryTags.join(', ') : 'Sin etiquetas'}
                </AppText>
                <AppText variant="small" style={{ color: item.available ? colors.success : colors.error }}>
                  {item.available ? 'Disponible' : 'No disponible'}
                </AppText>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <AppText variant="subtitle">No hay platos en esta categoría</AppText>
              <AppText variant="small">Prueba otra categoría o cambia de restaurante.</AppText>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  centeredState: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heroCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  eyebrow: {
    color: '#B45309',
    fontWeight: '700',
  },
  supportingText: {
    color: colors.textLight,
  },
  section: {
    gap: spacing.md,
  },
  horizontalList: {
    gap: spacing.md,
    paddingRight: spacing.md,
  },
  restaurantCard: {
    width: 250,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  restaurantCardSelected: {
    backgroundColor: '#FFFBEB',
  },
  restaurantAccent: {
    width: 56,
    height: 6,
    borderRadius: 999,
    marginBottom: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipTextActive: {
    color: colors.primaryText,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  menuCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
