import type { Metadata } from "next";
import { Teko, Roboto } from "next/font/google";
import "./globals.css";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin-ext"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Wouter de Bruijn",
  description: "Personal website of Wouter de Bruijn",
  authors : [{name: "Wouter de Bruijn"}],
  keywords: ["Wouter de Bruijn", "Personal website", "Wouter", "de Bruijn"],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${teko.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
