import { IBook } from 'core/types/book.types';
import { UserDatabase } from 'core/types/user.types';

export type IBooked = {
  book: IBook;
  user: UserDatabase;
  uid: string;
  borrowAt: string;
  returnTo: string;
  returnedAt: string;
  id: number;
  wasReturned: boolean;
};