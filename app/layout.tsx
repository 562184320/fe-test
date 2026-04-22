import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FE Test - Panels",
  description: "Draggable, closable panels with Next.js + DnD Kit + motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
