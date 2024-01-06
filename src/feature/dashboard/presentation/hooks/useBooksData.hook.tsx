import { useMutation, useQuery } from '@tanstack/react-query';
import { createBook, getAllBooks, removeBook } from 'core/data/books';
import { IBook, INewBook } from 'core/types';
import { useEffect } from 'react';

export const useBooksData = () => {
  const {
    data: newBookData,
    status: newBookStatus,
    mutateAsync: mutateNewBook,
    isPending: isNewBookPending
  } = useMutation({
    mutationKey: ['newBook'],
    mutationFn: (book: INewBook) => createBook(book)
  });
  const {
    data: removeBookData,
    status: removeBookStatus,
    mutateAsync: mutateRemoveBook,
    isPending: isRemoveBookPending
  } = useMutation({
    mutationKey: ['removeBook'],
    mutationFn: (book: IBook) => {
      if (book.id) {
        return removeBook(book.id);
      }

      throw new Error('Book ID is not defined.');
    }
  });
  const {
    data: books,
    status: booksStatus,
    error: booksError,
    isFetching: isBooksFetching,
    refetch: refetchBooks
  } = useQuery({
    queryKey: ['books'],
    queryFn: () => getAllBooks()
  });

  useEffect(() => {
    if (newBookStatus === 'success' || removeBookStatus === 'success') {
      refetchBooks();
    }
  }, [newBookStatus, removeBookStatus]);

  return {
    books,
    newBookData,
    newBookStatus,
    mutateNewBook,
    isNewBookPending,
    booksStatus,
    booksError,
    isBooksFetching,
    refetchBooks,
    removeBookData,
    removeBookStatus,
    mutateRemoveBook,
    isRemoveBookPending
  };
};
