// import axios from 'axios';
import { IAuthor } from 'core/types/author.types';
import { useEffect, useState } from 'react';

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
    console.log(firstName, lastName);

    // TODO: add author to database
    refreshAuthorsData();
  };

  return { authors, addAuthor };
};
