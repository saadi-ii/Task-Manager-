import type { Metadata } from "next";
import "./globals.css";
import { NavbarWrapper } from "@/shared/components/home/navbar/NavbarWrapper";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { getUserServer } from "@/lib/api/auth/server-get";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Management Application",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let user:string = "";
  try {
    const res = await getUserServer();
    user = res.data?.username || res.username || "";
  } catch (error) {
    console.log("no user");
  }
  
  return (
    <html
      lang="en"
    >
      <body className="flex flex-col min-h-screen w-full">
        <NavbarWrapper  username = {user}/>
        <main className="flex-1 w-full">
          {children}
        </main>
        <Toaster/>
      </body>
    </html>
  );
}