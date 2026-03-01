import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PaperTalk",
  description: "Talk to research papers in real time."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
