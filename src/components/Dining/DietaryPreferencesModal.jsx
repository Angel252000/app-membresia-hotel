import { useState } from 'react';
import { dietaryPreferencesOptions } from '../../constants/diningConfig';
import styles from '../../styles/dining.module.css';

function DietaryPreferencesModal({ selectedPreferences, onClose, onApply }) {
  const [draft, setDraft] = useState(selectedPreferences);

  const togglePreference = (value) => {
    setDraft((current) => (
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    ));
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.sectionLabel}>Dietary Preferences</p>
            <h3>Refine the menu to fit every guest.</h3>
          </div>
          <button className={styles.textButton} type="button" onClick={onClose}>Close</button>
        </div>

        <div className={styles.preferenceGrid}>
          {dietaryPreferencesOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.preferenceChip} ${draft.includes(option) ? styles.preferenceChipActive : ''}`}
              onClick={() => togglePreference(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className={styles.modalActions}>
          <button className={styles.secondaryButton} type="button" onClick={() => setDraft([])}>Clear</button>
          <button className={styles.primaryButton} type="button" onClick={() => onApply(draft)}>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default DietaryPreferencesModal;
