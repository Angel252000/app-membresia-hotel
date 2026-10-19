import { useState } from 'react';
import { validateReservation } from '../utils/reservationHelpers';

export function useDiningReservation({ initialRestaurantId = '' }) {
  const [reservation, setReservation] = useState({
    restaurantId: initialRestaurantId,
    date: '',
    time: '19:00',
    guests: 2,
    specialRequests: '',
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [submittedMessage, setSubmittedMessage] = useState('');

  const setReservationField = (field, value) => {
    setReservation((current) => ({ ...current, [field]: value }));
    setSubmittedMessage('');
  };

  const addItemToReservation = (item) => {
    setSelectedItems((current) => [...current, item]);
    setSubmittedMessage('');
  };

  const clearReservation = () => {
    setSelectedItems([]);
    setSubmittedMessage('');
  };

  const submitReservation = () => {
    const validation = validateReservation(reservation);

    if (!validation.valid) {
      setSubmittedMessage(validation.message);
      return;
    }

    setSubmittedMessage(`Table reserved for ${reservation.guests} guests at ${reservation.time}.`);
  };

  const submitRoomService = ({ roomNumber }) => {
    if (!roomNumber) {
      setSubmittedMessage('Room number is required for room service.');
      return;
    }

    setSubmittedMessage(`Room service request confirmed for room ${roomNumber}.`);
  };

  return {
    reservation,
    selectedItems,
    submittedMessage,
    setReservationField,
    addItemToReservation,
    clearReservation,
    submitReservation,
    submitRoomService,
  };
}
