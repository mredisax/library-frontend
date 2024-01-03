import { IAuthor } from 'core/types/author.types';
import { IBook } from 'core/types/book.types';

export const books: IBook[] = [
  {
    id: 1,
    title: 'Hari Pota',
    author_id: 1,
    year: 2021,
    category: 'Doe',
    isbn: '12345678'
  },
  {
    id: 2,
    title: 'Hungry Games',
    author_id: 2,
    year: 2021,
    category: 'Doe',
    isbn: '12345678'
  }
];

export const authors: IAuthor[] = [
  {
    id: 1,
    name: 'John',
    lastname: 'Doe'
  },
  {
    id: 2,
    name: 'Jane',
    lastname: 'Doe'
  }
];
