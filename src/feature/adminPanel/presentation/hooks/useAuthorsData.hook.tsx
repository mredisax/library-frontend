// import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAuthor, getAllAuthors, removeAuthor } from 'core/data/books/authors.dataSource';
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
    data: removeAuthorData,
    status: removeAuthorStatus,
    mutateAsync: mutateRemoveAuthor,
    isPending: isRemoveAuthorPending
  } = useMutation({
    mutationKey: ['removeAuthor'],
    mutationFn: (author: IAuthor) => removeAuthor(author.id ?? -1)
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
    if (newAuthorStatus === 'success' || removeAuthorStatus === 'success') {
      refreshAuthorsData();
    }
  }, [newAuthorStatus, removeAuthorStatus]);

  return {
    authors,
    newAuthorData,
    newAuthorStatus,
    mutateNewAuthor,
    isNewAuthorPending,
    authorsStatus,
    authorsError,
    isAuthorsFetching,
    refreshAuthorsData,
    removeAuthorData,
    removeAuthorStatus,
    mutateRemoveAuthor,
    isRemoveAuthorPending
  };
};
