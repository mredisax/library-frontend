export interface UserProfile {
  id: string;
  email: string;
  token: string;
  is_admin: boolean;
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
  phone: string;
  password: string;
  is_admin: boolean;
}
