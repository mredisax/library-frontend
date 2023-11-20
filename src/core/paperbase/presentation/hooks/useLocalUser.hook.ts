import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { useAppDispatch } from 'core/store/hook';
import { logout } from 'core/store/user';
import { UserProfile } from 'core/types';

export const useLocalUser = () => {
  const [localUser, setLocalUser] = useLocalStorage<UserProfile | null>('user', null);
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    setLocalUser(null);
    dispatch(logout());
  };

  return {
    localUser,
    setLocalUser,
    logoutUser
  };
};
