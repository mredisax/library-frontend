import { useMutation, useQuery } from '@tanstack/react-query';
import { getBookedBooksForUser } from 'core/data/books';
import { getAllUsers } from 'core/data/users/user.dataSource';

export const useUserDatabase = () => {
  const {
    data: usersData,
    status: usersDataStatus,
    error: usersDataError,
    isFetching: isUsersDataFetching,
    refetch: refetchUserDatabase
  } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => getAllUsers()
  });
  const {
    data: userBookedBooks,
    status: userBookedBooksStatus,
    error: userBookedBooksError,
    isPending: isUserBookedBooksPending,
    mutateAsync: mutateUserBookedBooks
  } = useMutation({
    mutationKey: ['userBookedBooks'],
    mutationFn: (userId: number) => getBookedBooksForUser(userId.toString())
  });

  return {
    usersData,
    usersDataStatus,
    usersDataError,
    isUsersDataFetching,
    refetchUserDatabase,
    userBookedBooks,
    userBookedBooksStatus,
    userBookedBooksError,
    isUserBookedBooksPending,
    mutateUserBookedBooks
  };
};
