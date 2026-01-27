import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  description:
    "404 - Page not found. Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Memo",
    description: "Welcome to Memo - web app for creating notes",
    url: "https://08-zustand-seven-amber.vercel.app",
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

function NotFound() {
  return (
    <div>
      <h1 className="not-found">404 - Page not found</h1>
      <p className="not-found">
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFound;
