export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}