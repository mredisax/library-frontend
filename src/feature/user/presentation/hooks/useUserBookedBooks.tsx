import { useQuery } from '@tanstack/react-query';
import { fetchBooked } from 'core/data/books';
import { useEffect } from 'react';

export const useUserBookedBooks = (userId: string) => {
  const {
    data: bookedBooks,
    status: bookedBooksStatus,
    error: bookedBooksError,
    isFetching: isBookedBooksFetching,
    refetch: refetchBookedBooks
  } = useQuery({
    queryKey: ['bookedBooks', userId],
    queryFn: () => fetchBooked(userId)
  });

  useEffect(() => {
    if (userId === '') return;

    refetchBookedBooks();
  }, [userId]);

  return { bookedBooks, bookedBooksStatus, bookedBooksError, isBookedBooksFetching };
};
