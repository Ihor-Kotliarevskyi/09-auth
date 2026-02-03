import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New note",
  description: "Create own a new note",
  openGraph: {
    title: "New note",
    description: "Create your own new note",
    url: "https://09-auth-six-gamma.vercel.app/action/create",
    images: [
      {
        url: "https://chatgpt.com/s/m_6971b723ea4c8191a1496962fa999a34",
        width: 1200,
        height: 630,
        alt: "Poster with logo",
      },
    ],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {<NoteForm />}
      </div>
    </main>
  );
}

export default CreateNote;
