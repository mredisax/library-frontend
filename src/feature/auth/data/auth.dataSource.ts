import { UserCredentials, UserProfile } from 'core/types';

import { users } from './mockedData';

export const login = async ({ email, password }: UserCredentials): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (mockedUser) => mockedUser.email === email && mockedUser.password === password
      );

      if (user) {
        resolve({
          email: user.email,
          id: user.id,
          lastname: user.lastname,
          name: user.name,
          token: '1234567890'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};
