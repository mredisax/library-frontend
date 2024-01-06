import axios from 'axios';
import { serverUrl } from 'core/config/config';
import { useEffect, useState } from 'react';

import { IReservation } from '../../data/types/reservation';

export const useUserReservations = (userId: string) => {
  const [userReservations, setReservations] = useState<IReservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchReservations = async (): Promise<IReservation[]> => {
    const res = await axios.get(`${serverUrl}/reservation/user/${userId}`, {
      validateStatus: (status) => status < 500
    });

    if (res.status === 200) return res.data;

    return [];
  };

  useEffect(() => {
    if (userId === '') return;
    setIsLoading(true);

    fetchReservations().then((res) => {
      const edited: IReservation[] = res.map((reservation) => {
        const reservedAt = new Date(reservation.reservedAt);
        const reservedUntil = new Date(reservedAt.setMonth(reservedAt.getMonth() + 1));
        return {
          ...reservation,
          reservedUntil
        };
      });
      setReservations(edited);
      setIsLoading(false);
    });
  }, [userId]);

  return { userReservations, isLoading };
};
