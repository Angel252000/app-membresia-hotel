import styles from '../../styles/dining.module.css';

function DiningStatusBadge({ available }) {
  return (
    <span className={`${styles.statusBadge} ${available ? styles.statusAvailable : styles.statusBusy}`}>
      {available ? 'Available Now' : 'Limited Seating'}
    </span>
  );
}

export default DiningStatusBadge;
