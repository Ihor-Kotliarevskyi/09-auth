import { Note } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";
import { cookies } from "next/headers";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  searchText: string,
  page: number,
  tag?: string,
): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params: {
      ...(searchText !== "" && { search: searchText }),
      tag,
      page,
      perPage: 12,
    },
    headers: {
      accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const response = await nextServer.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};

export const getMe = async () => {
  const cookieStore = await cookies();

  const response = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
