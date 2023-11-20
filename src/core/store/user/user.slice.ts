import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from 'core/types';

const initialState: { value: UserProfile | null } = {
  value: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      return { value: action.payload };
    },
    logout: () => {
      return { value: null };
    }
  }
});

export const { setUser, logout } = userSlice.actions;
