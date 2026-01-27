import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Memo",
  description: "Memo is a web app for creating and organizing notes with ease.",
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
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (<html lang='en'>
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>);
}
