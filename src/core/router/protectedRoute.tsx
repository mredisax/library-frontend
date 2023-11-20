import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { useAppDispatch, useAppSelector } from 'core/store/hook';
import { setUser } from 'core/store/user';
import { UserProfile } from 'core/types';
import { type JSX, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const userStore = useAppSelector((state) => state.user.value);
  const [localUser, , refetchValue] = useLocalStorage<UserProfile | null>('user', null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localUser) {
      // TODO: Perform token validation here

      if (!userStore) dispatch(setUser(localUser));
    } else {
      navigate('/login');
    }
  }, [localUser]);

  useEffect(() => {
    if (!userStore) {
      refetchValue();
    }
  }, [userStore]);

  return children;
};
