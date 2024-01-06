import { IBook } from 'core/types/book.types';
import { UserDatabase } from 'core/types/user.types';

export type IReservation = {
  book: IBook;
  user: UserDatabase;
  id: number;
  uid: string;
  reservedAt: string;
  reservedUntil: Date;
};
