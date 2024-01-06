import { UserDatabase } from 'core/types/user.types';

export type IBookReservation = {
  user: UserDatabase;
  id: number;
  uid: string;
  reservedAt: string;
};
