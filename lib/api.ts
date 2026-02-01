import axios from "axios";
import type { CreateNote, Note } from "../types/note";
import { User } from "@/types/user";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

const MY_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: string,
): Promise<NotesHttpResponse> => {
  const options = {
    params: {
      ...(searchText !== "" && { search: searchText }),
      tag,
      page,
      perPage: 12,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await nextServer.get<NotesHttpResponse>("/notes", options);
  return response.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await nextServer.post<Note>("/notes", newNote, options);
  return response.data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await nextServer.delete<Note>(`/notes/${id}`, options);
  return response.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };
  const response = await nextServer.get<Note>(`/notes/${id}`, options);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
