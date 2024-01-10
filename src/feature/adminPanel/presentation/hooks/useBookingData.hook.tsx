import { useMutation } from '@tanstack/react-query';
import { returnBook } from 'core/data/books';
import { IBook } from 'core/types';
import { createBooking } from 'feature/adminPanel/data';
import { useEffect, useState } from 'react';

export const useBookingData = () => {
  const {
    data: createBookingData,
    status: createBookingStatus,
    mutateAsync: mutateCreateBooking,
    isPending: isCreateBookingPending
  } = useMutation({
    mutationKey: ['removeBook'],
    mutationFn: ({ book, user }: { book: IBook; user: number }) => {
      if (book.id) {
        return createBooking(book, user);
      }

      throw new Error('Book ID is not defined.');
    }
  });
  const {
    data: returnBookData,
    status: returnBookStatus,
    mutateAsync: mutateReturnBook,
    isPending: isReturnBookPending
  } = useMutation({
    mutationKey: ['returnBook'],
    mutationFn: ({ bookingId, userId }: { bookingId: number; userId: number }) => {
      if (bookingId) {
        return returnBook(bookingId, userId);
      }

      throw new Error('Booking ID is not defined.');
    }
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (createBookingStatus === 'success') {
      switch (createBookingData) {
        case 'User not found':
          setStatusMessage('User not found');
          break;
        case 'Book not found':
          setStatusMessage('Book not found');
          break;
        case 'Book is not available':
          setStatusMessage('Book is not available');
          break;
        default:
          setStatusMessage('Book booked succesfully!');
          break;
      }
    }

    if (returnBookStatus === 'success') {
      switch (returnBookData) {
        case 'User not found':
          setStatusMessage('User not found');
          break;
        case 'Book not found':
          setStatusMessage('Book not found');
          break;
        case 'Book is not available':
          setStatusMessage('Book is not available');
          break;
        default:
          setStatusMessage('Book returned succesfully!');
          break;
      }
    }
  }, [createBookingData, returnBookData]);

  return {
    createBookingData,
    createBookingStatus,
    mutateCreateBooking,
    isCreateBookingPending,
    statusMessage,
    returnBookData,
    returnBookStatus,
    mutateReturnBook,
    isReturnBookPending
  };
};
