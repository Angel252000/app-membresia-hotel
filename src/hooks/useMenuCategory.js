import { useState } from 'react';
import { menuCategories } from '../constants/menuData';

export function useMenuCategory(initialCategory = menuCategories[0].id) {
  return useState(initialCategory);
}
