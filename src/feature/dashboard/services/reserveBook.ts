import axios from 'axios';
import { serverUrl } from 'core/config';
import { IBookReservation } from 'feature/dashboard/data/types/reservations';

const resetTime = (date: Date): Date => {
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setHours(0);
  date.setMinutes(0);

  return date;
};

export const getCanBookBeReserved = async (
  bookId: number,
  startDate: Date
): Promise<{ canBeReserved: boolean; reservationDueDate: Date }> => {
  const fetchBookReservation = async (): Promise<IBookReservation | null> => {
    const res = await axios.get(`${serverUrl}/reservation/book/${bookId}`, {
      validateStatus: (status) => status < 500
    });

    if (res.status === 200) return res.data;

    return null;
  };

  const bookReservation = await fetchBookReservation();

  if (bookReservation === null || bookReservation.reservedAt === null)
    return {
      canBeReserved: true,
      reservationDueDate: new Date()
    };

  const reservedAt = new Date(bookReservation.reservedAt);
  let reservationEndDate = new Date(reservedAt.setMonth(reservedAt.getMonth() + 1));

  let reservationStartDate = new Date(
    reservationEndDate.getFullYear(),
    reservationEndDate.getMonth() - 1,
    reservationEndDate.getDate()
  );
  let endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
  let startDateLocal = new Date(startDate);

  endDate = resetTime(endDate);
  reservationStartDate = resetTime(reservationStartDate);
  reservationEndDate = resetTime(reservationEndDate);
  startDateLocal = resetTime(startDateLocal);

  if (
    (reservationStartDate.getTime() <= endDate.getTime() &&
      reservationStartDate.getTime() >= startDateLocal.getTime()) ||
    (reservationEndDate.getTime() >= startDateLocal.getTime() &&
      reservationEndDate.getTime() <= endDate.getTime())
  )
    return {
      canBeReserved: false,
      reservationDueDate: reservationEndDate
    };
  return {
    canBeReserved: true,
    reservationDueDate: reservationEndDate
  };
};
