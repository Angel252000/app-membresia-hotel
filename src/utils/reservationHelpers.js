export function validateReservation(reservation) {
  if (!reservation.date) {
    return { valid: false, message: 'Please select a reservation date.' };
  }

  if (reservation.guests < 1) {
    return { valid: false, message: 'At least one guest is required.' };
  }

  return { valid: true, message: '' };
}
