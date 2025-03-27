import axios from "axios";
import Cookies from "js-cookie";
import { LoginCredentials, RegisterCredentials, Todo, User } from "../types";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (data: RegisterCredentials) => {
  const response = await api.post("/auth/register", data);
  const { access_token } = response.data;
  Cookies.set("token", access_token);
  return response.data;
};

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post("/auth/login", credentials);
  const { access_token } = response.data;
  Cookies.set("token", access_token);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
  Cookies.remove("token");
};

export const getUser = async (): Promise<User> => {
  const response = await api.post("/auth/me");
  return response.data;
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get("/tasks");
  return response.data.tasks;
};

export const getTodo = async (id: number): Promise<Todo> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const response = await api.post("/tasks", todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await api.put(`/tasks/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
