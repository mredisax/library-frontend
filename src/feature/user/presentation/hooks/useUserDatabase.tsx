import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { UserProfile } from 'core/types';
import { getUser } from 'feature/user/data/user.dataSource';
import { useEffect } from 'react';

export const useUserDatabase = () => {
  const [localUser] = useLocalStorage<UserProfile | null>('user', null);
  const {
    data: userDatabase,
    status: userDatabaseStatus,
    error: userDatabaseError,
    isFetching: isUserDatabaseFetching,
    refetch: refetchUserDatabase
  } = useQuery({
    queryKey: ['userDatabase', localUser?.id],
    queryFn: () => getUser(localUser?.id ?? '')
  });

  useEffect(() => {
    refetchUserDatabase();
  }, [localUser]);

  return { userDatabase, userDatabaseStatus, userDatabaseError, isUserDatabaseFetching };
};
