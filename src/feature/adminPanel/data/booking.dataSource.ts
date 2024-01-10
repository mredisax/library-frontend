import axios from 'axios';
import { serverUrl } from 'core/config';
import { IBook } from 'core/types';

export const createBooking = async (book: IBook, userId: number) => {
  const response = await axios.post(`${serverUrl}/booking`, {
    booksId: [book.id],
    userId
  });

  console.log(response);

  return response.data;
};
