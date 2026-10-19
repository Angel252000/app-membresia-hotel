import { Coffee, Martini, Salad, Soup, Sparkles, Sunset } from 'lucide-react';
import styles from '../../styles/dining.module.css';

const iconMap = {
  breakfast: Coffee,
  lunch: Salad,
  dinner: Sunset,
  drinks: Martini,
  desserts: Soup,
  specials: Sparkles,
};

function MenuCategoryTabs({ categories, activeCategory, itemCounts, onChange }) {
  return (
    <div className={styles.tabScroller}>
      {categories.map((category) => {
        const Icon = iconMap[category.id] ?? Sparkles;
        const totalItems = itemCounts.filter((item) => item.category === category.id).length;

        return (
          <button
            key={category.id}
            type="button"
            className={`${styles.menuTab} ${activeCategory === category.id ? styles.menuTabActive : ''}`}
            onClick={() => onChange(category.id)}
          >
            <Icon size={16} />
            <span>{category.label}</span>
            <small>{totalItems}</small>
          </button>
        );
      })}
    </div>
  );
}

export default MenuCategoryTabs;
