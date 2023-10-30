import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  title: "Solace Notes",
  description:
    "Represents Jeff Mather's solution to a programming exercise assigned to him by Solace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
