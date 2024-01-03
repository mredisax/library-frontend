export interface UserProfile {
  email: string;
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegisterCredentials {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserDatabase {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}
