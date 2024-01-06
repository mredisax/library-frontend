import axios from 'axios';
import { serverUrl } from 'core/config/config';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { UserDatabase, UserProfile } from 'core/types';
import { useEffect, useState } from 'react';

export const useUserDatabase = () => {
  const [userDatabase, setUserDatabase] = useState<UserDatabase | null>(null);
  const [localUser] = useLocalStorage<UserProfile | null>('user', null);

  const getUser = async (userId: string): Promise<UserDatabase> => {
    const response = await axios.get(`${serverUrl}/users/${userId}`);

    if (response.data.statusCode === 404) {
      throw new Error('User does not exist');
    }

    return response.data;
  };

  useEffect(() => {
    getUser(localUser?.id ?? '').then((_user) => {
      setUserDatabase(_user);
    });
  }, [localUser]);

  return { userDatabase };
};
