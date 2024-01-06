import axios from 'axios';
import { serverUrl } from 'core/config';
import { IBook, INewBook } from 'core/types';

export const getAllBooks = async (): Promise<IBook[]> => {
  const response = await axios.get(`${serverUrl}/book`);

  console.log(response.data);

  return response.data;
};

export const getBookById = async (id: number): Promise<IBook> => {
  const response = await axios.get(`${serverUrl}/book/${id}`);

  return response.data;
};

export const createBook = async (book: INewBook): Promise<IBook> => {
  console.log('book', book);
  const response = await axios.post(`${serverUrl}/book`, book);

  console.log(response.data);

  return response.data;
};

export const removeBook = async (id: number): Promise<void> => {
  const response = await axios.delete(`${serverUrl}/book/${id}`);

  console.log(response.data);
};
