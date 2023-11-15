export interface UserProfile {
  id: number;
  name: string;
  lastname: string;
  email: string;
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserDatabase {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}
