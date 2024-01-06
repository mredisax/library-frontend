import { useQuery } from '@tanstack/react-query';
import { fetchReservations } from 'core/data/books';
import { useEffect } from 'react';

export const useUserReservations = (userId: string) => {
  // const [userReservations, setReservations] = useState<IReservation[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    data: userReservations,
    status: userReservationsStatus,
    error: userReservationsError,
    isFetching: isUserReservationsFetching,
    refetch: refetchUserReservations
  } = useQuery({
    queryKey: ['userReservations', userId],
    queryFn: () => fetchReservations(userId)
  });

  useEffect(() => {
    if (userId === '') return;

    refetchUserReservations();
  }, [userId]);

  return {
    userReservations,
    userReservationsStatus,
    userReservationsError,
    isUserReservationsFetching
  };
};
