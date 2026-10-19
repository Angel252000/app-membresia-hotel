import styles from '../../styles/dining.module.css';

function DiningReviewForm({ review, onClose, onChange }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.sectionLabel}>Dining Review</p>
            <h3>Capture post-dining feedback for future guests.</h3>
          </div>
          <button className={styles.textButton} type="button" onClick={onClose}>Close</button>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.fieldBlock}>
            <span>Rating</span>
            <input
              className={styles.input}
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={(event) => onChange({ ...review, rating: Number(event.target.value) })}
            />
          </label>

          <label className={styles.fieldBlock}>
            <span>Favorite Dish</span>
            <input
              className={styles.input}
              value={review.favoriteDish}
              onChange={(event) => onChange({ ...review, favoriteDish: event.target.value })}
            />
          </label>

          <label className={styles.fieldBlock}>
            <span>Comment</span>
            <textarea
              className={styles.textarea}
              maxLength={500}
              rows={4}
              value={review.comment}
              onChange={(event) => onChange({ ...review, comment: event.target.value })}
            />
          </label>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={review.recommend}
              onChange={(event) => onChange({ ...review, recommend: event.target.checked })}
            />
            <span>Recommend this experience to other guests</span>
          </label>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.secondaryButton} type="button" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default DiningReviewForm;
