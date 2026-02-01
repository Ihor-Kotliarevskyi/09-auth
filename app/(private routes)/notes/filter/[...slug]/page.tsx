import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";

type Props = {
  readonly params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Tag: ${slug[0]}`,
    description: `Notes filtered by ${slug[0]} tag`,
    openGraph: {
      title: "Memo",
      description: `Notes filtered by ${slug[0]} tag`,
      url: `https://08-zustand-seven-amber.vercel.app/notes/filter/${slug[0]}`,
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
}

async function NotesByTag({ params }: Props) {
  const { slug } = await params;

  const searchText = "";
  const tag = slug[0] === "all" ? undefined : slug[0];
  const currentPage = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchText, currentPage, tag],
    queryFn: () => fetchNotes(searchText, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesByTag;
