"use client";

import type { CreateNote, Note } from "../../types/note";
import { User } from "@/types/user";
import axios from "axios";

const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

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

export type updateUserRequest = {
  email?: string;
  username: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

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
    },
  };
  const response = await nextServer.get<NotesHttpResponse>("/notes", options);
  return response.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
    },
  };
  const response = await nextServer.post<Note>("/notes", newNote, options);
  return response.data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
    },
  };
  const response = await nextServer.delete<Note>(`/notes/${id}`, options);
  return response.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const options = {
    headers: {
      accept: "application/json",
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
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

export const getMe = async () => {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (data: updateUserRequest) => {
  const response = await nextServer.patch<User>("/users/me", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
