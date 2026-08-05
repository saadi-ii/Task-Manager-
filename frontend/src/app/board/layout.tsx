

import { AppSidebar } from "@/components/app-sidebar"
import { BoardHeader } from "./BoardHeader";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactNode } from "react";
import "../globals.css";

import { Board } from "@/lib/types/board.types";
import { getBoardsServer } from "@/lib/api/board/server-get";



export default async function BoardLayout({
  children,
}: {
  children: ReactNode;
}) {
    let boards: Board[] = [];
    try {
      boards = await getBoardsServer();
    } catch (err) {
      console.error("Failed to fetch boards:", err);
    }
  return (
    <SidebarProvider>
      <AppSidebar boards={boards}/>

      <SidebarInset className="min-w-0 overflow-hidden">
        <header className="flex h-16 min-w-0 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 shrink-0" />

          <Separator
            orientation="vertical"
            className="mr-2 shrink-0 data-[orientation=vertical]:h-4"
          />

          <div className="min-w-0 flex-1">
            <BoardHeader />
          </div>
        </header>

        <div className="min-h-0 min-w-0 flex-1 overflow-hidden p-4">
          <main className="flex h-full min-h-0 min-w-0 flex-col">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
