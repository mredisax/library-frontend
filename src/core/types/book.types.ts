import { IAuthor } from './author.types';
import { UserDatabase } from './user.types';

export interface INewBook {
  id?: number;
  title: string;
  author: number;
  year: number;
  category: string;
  isbn: string;
  description: string;
  cover: string;
}

export interface IBook extends Omit<INewBook, 'author'> {
  author: IAuthor;
}

export interface IBooking {
  id: number;
  borrowAt: Date;
  returnTo: Date;
  wasReturned: boolean;
  book: IBook;
  user: UserDatabase;
}
