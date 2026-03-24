"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteNote } from "@/lib/api/clientApi";

interface NoteListProps {
  readonly notes: Note[];
}

function NoteList({ notes = [] }: NoteListProps) {
  const queryClient = useQueryClient();

  const deletionM = useMutation<void, Error, Note["_id"]>({
    mutationFn: async (_id: Note["_id"]) => {
      await deleteNote(_id);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete note",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ _id, title, content, tag }) => (
        <li className={css.listItem} key={_id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <Link className={css.link} href={`/notes/${_id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => {
                deletionM.mutate(_id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
