import { CalendarDays, Users } from 'lucide-react';
import styles from '../../styles/dining.module.css';

function ReservationSummary({
  restaurant,
  reservation,
  selectedItems,
  reservationTotal,
  submittedMessage,
  onClear,
  onReserve,
}) {
  return (
    <aside className={styles.summaryCard}>
      <p className={styles.sectionLabel}>Reservation Summary</p>
      <h3>{restaurant?.restaurantName ?? 'Select a restaurant'}</h3>

      <div className={styles.summaryMeta}>
        <span><CalendarDays size={15} /> {reservation.date || 'Choose date'}</span>
        <span><Users size={15} /> {reservation.guests} guests</span>
      </div>

      <div className={styles.selectedItemsList}>
        {selectedItems.length ? (
          selectedItems.map((item) => (
            <div key={item.id} className={styles.selectedItemRow}>
              <span>{item.itemName}</span>
              <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</strong>
            </div>
          ))
        ) : (
          <p className={styles.cardSubtleText}>No dishes added yet. Build the experience from the menu above.</p>
        )}
      </div>

      <div className={styles.summaryTotals}>
        <span>Estimated dining total</span>
        <strong>{reservationTotal}</strong>
      </div>

      {submittedMessage ? <p className={styles.successMessage}>{submittedMessage}</p> : null}

      <div className={styles.summaryActions}>
        <button className={styles.secondaryButton} type="button" onClick={onClear}>
          Clear
        </button>
        <button className={styles.primaryButton} type="button" onClick={onReserve}>
          Confirm Reservation
        </button>
      </div>
    </aside>
  );
}

export default ReservationSummary;
