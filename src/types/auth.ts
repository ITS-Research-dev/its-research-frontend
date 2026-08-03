export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  name: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: User;
}
