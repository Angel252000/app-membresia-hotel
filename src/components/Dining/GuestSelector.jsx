import styles from '../../styles/dining.module.css';

function GuestSelector({ value, onChange }) {
  return (
    <label className={styles.fieldBlock}>
      <span>Guests</span>
      <input
        className={styles.input}
        type="number"
        min="1"
        max="12"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export default GuestSelector;
