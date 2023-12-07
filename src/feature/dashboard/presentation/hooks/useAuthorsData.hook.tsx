// import axios from 'axios';
import { useEffect, useState } from 'react';
import { IAuthor } from 'core/types/author.types';
import { authors as mockedAuthors } from '../../data/mockedData';

export const useAuthorsData = () => {
  const [authors, setAuthors] = useState<Array<IAuthor>>([]);

  const refreshAuthorsData = () => {
    setAuthors(mockedAuthors); // TODO: Only for mockup purposes. Remove this line before production.
  };

  useEffect(() => {
    refreshAuthorsData();
  }, []);

  const addAuthor = async (firstName: string, lastName: string) => {
    // TODO: add author to database
    refreshAuthorsData();
  };

  return { authors, addAuthor };
};
