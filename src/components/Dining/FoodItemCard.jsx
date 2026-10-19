import { Clock3, Flame, Leaf, Sparkles } from 'lucide-react';
import styles from '../../styles/dining.module.css';

function FoodItemCard({ item, onAdd }) {
  return (
    <article className={styles.foodCard}>
      <div className={styles.foodCardVisual} style={{ background: item.gradient }}>
        <div className={styles.foodCardBadges}>
          {item.popular ? <span className={styles.badgeWarm}><Flame size={13} /> Popular</span> : null}
          {item.chefSpecial ? <span className={styles.badgeGold}><Sparkles size={13} /> Chef Special</span> : null}
        </div>
      </div>

      <div className={styles.foodCardBody}>
        <div className={styles.foodCardHeader}>
          <div>
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>
          </div>
          <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</strong>
        </div>

        <p className={styles.ingredientsText}>{item.ingredients.join(' • ')}</p>

        <div className={styles.tagRow}>
          {item.dietaryTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              <Leaf size={12} />
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.foodCardFooter}>
          <span><Clock3 size={14} /> {item.prepTime}</span>
          <button className={styles.secondaryButton} type="button" disabled={!item.available} onClick={onAdd}>
            {item.available ? 'Add to Reservation' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodItemCard;
