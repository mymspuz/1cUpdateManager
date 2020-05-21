import {User} from "../models/user.models";

export interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: any
}

export const authInitialState: AuthState = {
  user: null,
  isAdmin: false,
  isLoggedIn: false,
  isLoading: false,
  error: null
}
