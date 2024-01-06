import axios from 'axios';
import { serverUrl } from 'core/config';
import { IAuthor } from 'core/types';

export const getAllAuthors = async (): Promise<IAuthor[]> => {
  const response = await axios.get(`${serverUrl}/author`);

  console.log(response.data);

  return response.data;
};

export const getAuthorById = async (id: number): Promise<IAuthor> => {
  const response = await axios.get(`${serverUrl}/author/${id}`);

  return response.data;
};

export const createAuthor = async (author: IAuthor): Promise<IAuthor> => {
  const response = await axios.post(`${serverUrl}/author`, author);

  console.log(response.data);

  return response.data;
};
