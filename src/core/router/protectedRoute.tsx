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
  const [localUser] = useLocalStorage<UserProfile | null>('user', null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore) {
      if (localUser) {
        // TODO: Perform token validation here
        dispatch(setUser(localUser));
      } else {
        navigate('/login');
      }
    }
  }, []);

  return children;
};
