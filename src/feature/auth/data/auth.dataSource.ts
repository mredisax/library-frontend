import axios from 'axios';
import { serverUrl } from 'core/config';
import { UserCredentials, UserProfile, UserRegisterCredentials } from 'core/types';

export const login = async ({ email, password }: UserCredentials): Promise<UserProfile> => {
  const response = await axios.post(`${serverUrl}/auth/login`, {
    email,
    password
  });

  if (response.data.statusCode === 401) {
    throw new Error('Invalid credentials');
  }

  return {
    email,
    token: response.data.access_token
  };
};

export const register = async ({
  name,
  lastname,
  email,
  password,
  phone
}: UserRegisterCredentials): Promise<void> => {
  const response = await axios.post(`${serverUrl}/auth/register`, {
    name,
    lastname,
    email,
    password,
    phone
  });

  if (response.data.statusCode === 401) {
    throw new Error('Invalid credentials');
  }
};
