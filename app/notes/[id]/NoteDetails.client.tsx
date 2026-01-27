"use client";

import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

function NoteDetailsClient() {
  const router = useRouter();

  const close = () => router.back();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
          <span className={css.tag}>{data?.tag}</span>
        </div>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
      <button onClick={close} type="button" className={css.backBtn}>
        Back
      </button>
    </div>
  );
}

export default NoteDetailsClient;
