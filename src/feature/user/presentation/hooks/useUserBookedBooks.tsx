import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchBooked, prolongueBooking } from 'core/data/books';
import { useEffect, useState } from 'react';

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
  const {
    data: prolongueBookData,
    status: prolongueBookStatus,
    error: prolongueBookError,
    isPending: isProlongueBookPending,
    mutateAsync: mutateProlongueBook
  } = useMutation({
    mutationKey: ['prolongueBook'],
    mutationFn: (bookingId: number) => prolongueBooking(bookingId, userId)
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (userId === '') return;

    refetchBookedBooks();
  }, [userId]);

  useEffect(() => {
    if (prolongueBookStatus === 'success') {
      switch (prolongueBookData) {
        case 'You can prolong only if you have less than 14 days to return':
          setStatusMessage('You can prolong only if you have less than 14 days to return');
          break;
        case 'Booking not found':
          setStatusMessage('Booking not found');
          break;
        default:
          setStatusMessage('Book prolonged succesfully!');
          refetchBookedBooks();
          break;
      }
    }
  }, [prolongueBookStatus]);

  return {
    bookedBooks,
    bookedBooksStatus,
    bookedBooksError,
    isBookedBooksFetching,
    refetchBookedBooks,
    prolongueBookData,
    prolongueBookStatus,
    prolongueBookError,
    isProlongueBookPending,
    mutateProlongueBook,
    statusMessage
  };
};
