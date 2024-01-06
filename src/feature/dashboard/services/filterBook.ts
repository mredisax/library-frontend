import { IAuthor, IBook } from 'core/types';

export const filterBook = (book: IBook, author: IAuthor | undefined, filter: string): boolean => {
  if (filter === '') return true;

  const filterLower = filter.toLowerCase();

  if (book.title.toLowerCase().includes(filterLower)) return true;
  if (`${author?.name} ${author?.lastName}`.toLowerCase().includes(filterLower)) return true;
  if (book.isbn.toLowerCase().includes(filterLower)) return true;

  return false;
};
