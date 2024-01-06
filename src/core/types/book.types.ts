import { IAuthor } from './author.types';

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
