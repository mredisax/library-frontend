import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { useAppDispatch } from 'core/store/hook';
import { setUser } from 'core/store/user';
import { UserCredentials, UserProfile, UserRegisterCredentials } from 'core/types';
import { login, register } from 'feature/auth/data';
import { useEffect, useState } from 'react';
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
  const {
    data: registerData,
    status: registerStatus,
    mutateAsync: mutateRegister,
    isPending: isRegisterPending
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: (userCredentials: UserRegisterCredentials) => register(userCredentials)
  });
  const [isRegisterSnackbarOpen, setIsRegisterSnackbarOpen] = useState<boolean>(false);
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

  useEffect(() => {
    if (registerStatus === 'success') {
      setIsRegisterSnackbarOpen(true);

      setTimeout(() => {
        setIsRegisterSnackbarOpen(false);
        navigate('/login');
      }, 3000);
    }
  }, [registerStatus]);

  const loginUser = async (credentials: UserCredentials) => {
    await mutateLogin(credentials);
  };

  const registerUser = async (credentials: UserRegisterCredentials) => {
    await mutateRegister(credentials);
  };

  return {
    loginData,
    loginStatus,
    loginUser,
    isLoginPending,
    registerUser,
    registerStatus,
    isRegisterPending,
    registerData,
    isRegisterSnackbarOpen
  };
};
