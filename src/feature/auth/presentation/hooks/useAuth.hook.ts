import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { useAppDispatch } from 'core/store/hook';
import { setUser } from 'core/store/user';
import { UserCredentials, UserProfile } from 'core/types';
import { login } from 'feature/auth/data';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [localUser, setLocalUser] = useLocalStorage<UserProfile | null>('user', null);
  const {
    data: loginData,
    status: loginStatus,
    mutateAsync: mutateLogin,
    isPending: isLoginPending
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: (userCredentials: UserCredentials) => login(userCredentials)
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localUser) {
      // TODO: Perform a validation of the token

      dispatch(setUser(localUser));
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (loginData) {
      setLocalUser(loginData);
      dispatch(setUser(loginData));
      navigate('/');
    }
  }, [loginData]);

  const loginUser = async (credentials: UserCredentials) => {
    await mutateLogin(credentials);
  };

  return {
    loginData,
    loginStatus,
    loginUser,
    isLoginPending
  };
};
