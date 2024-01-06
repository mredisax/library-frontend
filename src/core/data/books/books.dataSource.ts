import axios from 'axios';
import { serverUrl } from 'core/config';
import { IBook, INewBook } from 'core/types';
import { IBooked } from 'feature/user/data/types/borrow';
import { IReservation } from 'feature/user/data/types/reservation';

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

export const fetchBooked = async (id: string): Promise<IBooked[]> => {
  const res = await axios.get(`${serverUrl}/booking/user/${id}`, {
    validateStatus: (status) => status < 500
  });

  if (res.status === 200) return res.data;

  return [];
};

export const fetchReservations = async (id: string): Promise<IReservation[]> => {
  const res = await axios.get(`${serverUrl}/reservation/user/${id}`, {
    validateStatus: (status) => status < 500
  });

  console.log(res.data);

  if (res.status === 200) return res.data;

  return [];
};
