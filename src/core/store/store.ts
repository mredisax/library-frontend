import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
