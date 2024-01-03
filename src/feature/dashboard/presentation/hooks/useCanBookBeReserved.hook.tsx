import { useEffect, useState } from 'react';
import { getCanBookBeReserved } from '../../services/reserveBook';
import { IBook } from 'core/types/book.types';

export const useCanBookBeReserved = (
  book: IBook | null,
  startDate: Date = new Date(Date.now())
) => {
  const [canBookBeReserved, setCanBookBeReserved] = useState<boolean | null>(
    null
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [reservationDueDate, setReservationDueDate] = useState<Date | null>();

  useEffect(() => {
    if (book) {
      setIsFetching(true);
      getCanBookBeReserved(book.id!, startDate)
        .then((res) => {
          setCanBookBeReserved(res.canBeReserved);
          setReservationDueDate(res.reservationDueDate);
          setIsFetching(false);
        })
        .catch(() => {
          setCanBookBeReserved(false);
          setReservationDueDate(null);
          setIsFetching(false);
        });
    }
  }, [book, startDate]);

  return { canBookBeReserved, isFetching, reservationDueDate };
};
