import { ChefHat, Clock3, MapPin, Star } from 'lucide-react';
import DiningStatusBadge from './DiningStatusBadge';
import styles from '../../styles/dining.module.css';

function DiningCard({ restaurant, selected, onSelect }) {
  return (
    <article className={`${styles.diningCard} ${selected ? styles.diningCardSelected : ''}`}>
      <div className={styles.diningCardVisual} style={{ background: restaurant.gradient }}>
        <DiningStatusBadge available={restaurant.availableNow} />
        <div className={styles.diningCardOverlay}>
          <p>{restaurant.cuisineType}</p>
          <h3>{restaurant.restaurantName}</h3>
        </div>
      </div>

      <div className={styles.diningCardBody}>
        <div className={styles.inlineMeta}>
          <span><MapPin size={15} /> {restaurant.location}</span>
          <span><Clock3 size={15} /> {restaurant.openingHours}</span>
        </div>

        <div className={styles.inlineMeta}>
          <span><Star size={15} /> {restaurant.rating} ({restaurant.totalReviews} reviews)</span>
          <span>{restaurant.priceRange}</span>
        </div>

        <p className={styles.cardSubtleText}>
          Dress code: {restaurant.dressCode ?? 'Smart casual'} {restaurant.featuredChef ? `• Chef ${restaurant.featuredChef}` : ''}
        </p>

        <button className={styles.primaryButton} type="button" onClick={onSelect} disabled={!restaurant.reservationAvailable}>
          {restaurant.reservationAvailable ? 'Reserve Table' : 'Waitlist Only'}
        </button>

        {restaurant.featuredChef ? (
          <div className={styles.signatureStrip}>
            <ChefHat size={15} />
            Signature by {restaurant.featuredChef}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default DiningCard;
