
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/Navbar";
import { Sidebar } from "@/shared/components/Sidebar";
import { ReactNode, useEffect } from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Task Manager",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased `}>
      <body className="h-screen w-full overflow-hidden">
        <div className="flex flex-col h-full w-full">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <Navbar />
          <motion.main
            animate={{
              marginLeft: isMobile ? 0 : isOpen ? 200 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-h-0 overflow-hidden max-sm:"
          >
            {children}
          </motion.main>
        </div>
      </body>
    </html>
  );
}


