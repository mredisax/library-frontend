import { IBook } from 'core/types';
import { useEffect, useState } from 'react';

export const useBooksData = () => {
  const [books] = useState<Array<IBook>>([]);

  useEffect(() => {
    // setBooks(mockedBooks); // TODO: this is only mockup. Remove it later.
  }, []);

  return { books };
};
