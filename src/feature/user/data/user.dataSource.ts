import axios from 'axios';
import { serverUrl } from 'core/config';
import { UserDatabase } from 'core/types';

export const getUser = async (userId: string): Promise<UserDatabase> => {
  console.log(`skurwysyn id: ${userId}`);
  const response = await axios.get(`${serverUrl}/users/${userId}`);

  if (response.data.statusCode === 404) {
    throw new Error('User does not exist');
  }

  return response.data;
};
