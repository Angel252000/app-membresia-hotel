import { useState } from 'react';
import styles from '../../styles/dining.module.css';

function RoomServiceForm({ selectedItems, onClose, onSubmit }) {
  const [payload, setPayload] = useState({
    roomNumber: '',
    instructions: '',
    billingMethod: 'room-charge',
  });

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.sectionLabel}>Room Service</p>
            <h3>Deliver selected dishes directly to the suite.</h3>
          </div>
          <button className={styles.textButton} type="button" onClick={onClose}>Close</button>
        </div>

        <div className={styles.summaryMini}>
          <strong>{selectedItems.length} selected items</strong>
          <span>Active order required for room service confirmation.</span>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.fieldBlock}>
            <span>Room Number</span>
            <input
              className={styles.input}
              value={payload.roomNumber}
              onChange={(event) => setPayload((current) => ({ ...current, roomNumber: event.target.value }))}
            />
          </label>

          <label className={styles.fieldBlock}>
            <span>Billing Method</span>
            <select
              className={styles.select}
              value={payload.billingMethod}
              onChange={(event) => setPayload((current) => ({ ...current, billingMethod: event.target.value }))}
            >
              <option value="room-charge">Charge to room</option>
              <option value="card-on-file">Card on file</option>
            </select>
          </label>

          <label className={styles.fieldBlock}>
            <span>Special Instructions</span>
            <textarea
              className={styles.textarea}
              rows={4}
              value={payload.instructions}
              onChange={(event) => setPayload((current) => ({ ...current, instructions: event.target.value }))}
            />
          </label>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.secondaryButton} type="button" onClick={onClose}>Cancel</button>
          <button className={styles.primaryButton} type="button" onClick={() => onSubmit(payload)} disabled={!selectedItems.length}>
            Confirm Room Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomServiceForm;
