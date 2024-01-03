import { useEffect, useState } from 'react';
import { IBook } from 'core/types/book.types';
import { books as mockedBooks } from '../../data/mockedData';

export const useBooksData = () => {
  const [books, setBooks] = useState<Array<IBook>>([]);

  useEffect(() => {
    setBooks(mockedBooks); // TODO: this is only mockup. Remove it later.
  }, []);

  return { books };
};
