import styles from '../../styles/dining.module.css';

const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

function ReservationTimeSelector({ value, onChange }) {
  return (
    <label className={styles.fieldBlock}>
      <span>Time</span>
      <select className={styles.select} value={value} onChange={(event) => onChange(event.target.value)}>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </label>
  );
}

export default ReservationTimeSelector;
