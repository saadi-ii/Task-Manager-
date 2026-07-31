import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/shared/components/RootLayout";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Management Application",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
    >
      <body className="flex flex-col h-screen w-full overflow-hidden">
        <NavbarWrapper />
        <main className="flex-1 overflow-auto h-full w-full">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}