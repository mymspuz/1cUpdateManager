export interface User {
  uid: string;
  loginName: string;
  email: string;
  photoUrl: string;
  providerIn: string;
  isNewUser?: boolean;
  isAdmin?: boolean;
  isOnline?: boolean;
}

export interface RegUser {
  login: string;
  email: string;
  password: string
}
