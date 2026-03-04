export interface AuthState {
  token: string | null;
  userId: number | null;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken?: string;
}
