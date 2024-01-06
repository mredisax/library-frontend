import axios from 'axios';
import { serverUrl } from 'core/config/config';
import { useEffect, useState } from 'react';

import { IBooked } from '../../data/types/borrow';

export const useUserBookedBooks = (userId: string) => {
  const [bookedBooks, setBookedBooks] = useState<IBooked[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBooked = async (): Promise<IBooked[]> => {
    const res = await axios.get(`${serverUrl}/booking/user/${userId}`, {
      validateStatus: (status) => status < 500
    });

    if (res.status === 200) return res.data;

    return [];
  };

  useEffect(() => {
    if (userId === '') return;
    setIsLoading(true);

    fetchBooked().then((res) => {
      setBookedBooks(res);
      setIsLoading(false);
    });
  }, [userId]);

  return { bookedBooks, isLoading };
};
