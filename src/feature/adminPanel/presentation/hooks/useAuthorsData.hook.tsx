// import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAuthor, getAllAuthors } from 'core/data/books/authors.dataSource';
import { IAuthor } from 'core/types';
import { useEffect } from 'react';

export const useAuthorsData = () => {
  const {
    data: newAuthorData,
    status: newAuthorStatus,
    mutateAsync: mutateNewAuthor,
    isPending: isNewAuthorPending
  } = useMutation({
    mutationKey: ['newAuthor'],
    mutationFn: (author: IAuthor) => createAuthor(author)
  });
  const {
    data: authors,
    status: authorsStatus,
    error: authorsError,
    isFetching: isAuthorsFetching,
    refetch: refetchAuthors
  } = useQuery({
    queryKey: ['authors'],
    queryFn: () => getAllAuthors()
  });

  const refreshAuthorsData = () => {
    refetchAuthors();
  };

  useEffect(() => {
    refreshAuthorsData();
  }, []);

  useEffect(() => {
    if (newAuthorStatus === 'success') {
      refreshAuthorsData();
    }
  }, [newAuthorStatus]);

  return {
    authors,
    newAuthorData,
    newAuthorStatus,
    mutateNewAuthor,
    isNewAuthorPending,
    authorsStatus,
    authorsError,
    isAuthorsFetching
  };
};
