export interface LoginRequest {
  username: string;
  password: string;
}

export interface Class {
  class: {
    id: string;
    title: string;
    waliKelas: string;
  };
  state: string;
}
export interface User {
  name: string;
  role: string;
  classId: Class[];
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: User;
}
