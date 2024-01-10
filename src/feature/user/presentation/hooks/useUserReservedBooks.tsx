import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchReservations, removeReservation } from 'core/data/books';
import { useEffect, useState } from 'react';

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
  const {
    mutateAsync: mutateCancelReservation,
    isPending: isCancelReservationPending,
    status: cancelReservationStatus,
    data: cancelReservationData
  } = useMutation({
    mutationKey: ['cancelReservation'],
    mutationFn: (reservationId: number) => removeReservation(reservationId)
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (userId === '') return;

    refetchUserReservations();
  }, [userId]);

  useEffect(() => {
    if (cancelReservationStatus === 'success') {
      setStatusMessage('Reservation cancelled succesfully!');
      refetchUserReservations();
    }
  }, [cancelReservationStatus]);

  return {
    userReservations,
    userReservationsStatus,
    userReservationsError,
    isUserReservationsFetching,
    refetchUserReservations,
    mutateCancelReservation,
    isCancelReservationPending,
    cancelReservationStatus,
    cancelReservationData,
    statusMessage
  };
};
