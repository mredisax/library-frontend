import axios from 'axios';
import { serverUrl } from 'core/config';
import { UserDatabase } from 'core/types';

export const getUser = async (userId: string): Promise<UserDatabase> => {
  const response = await axios.get(`${serverUrl}/users/${userId}`);

  if (response.data.statusCode === 404) {
    throw new Error('User does not exist');
  }

  return response.data;
};

export const getAllUsers = async (): Promise<UserDatabase[]> => {
  const response = await axios.get(`${serverUrl}/users`);

  return response.data;
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
