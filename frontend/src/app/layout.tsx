"use client";

import type { Metadata } from "next";
import { Antic, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/shared/components/Navbar";
import { Sidebar } from "@/shared/components/Sidebar";

import { ReactNode, useState } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

const fontSans = Antic({
    weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// export const metadata: Metadata = {
//   title: "Task Manager",
//   description: "Task Management Application",
// };

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body className="h-screen w-full overflow-hidden">
        <div className="flex flex-col h-full w-full">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

          <Navbar />

          <motion.main
            animate={{
              marginLeft: isMobile ? 0 : isOpen ? 200 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-h-0 overflow-hidden"
          >
            {children}
          </motion.main>
        </div>
      </body>
    </html>
  );
}