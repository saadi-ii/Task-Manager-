"use client";

import { usePathname, useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CreateBoardIcon } from "@/features/board/components/CreateBoardIcon";
import { CreateColumnIcon } from "@/features/column/components/CreateColumnIcon";
import { Drawer } from "@/shared/components/Drawer";
import { useEffect, useState } from "react";
import { getBoards } from "@/lib/api/board/get";

export function BoardHeader() {
  const pathname = usePathname();
  const params = useParams();
  
  const [boardName, setBoardName] = useState("");

  const boardId = params?.id as string | undefined;
  const isSingleBoard = !!boardId && pathname.includes(`/board/${boardId}`);



  useEffect(() => {
    if (isSingleBoard && boardId) {
      getBoards()
        .then((res) => {
          const board = res.data.boards.find((b) => b._id === boardId);
          if (board){
            setBoardName(board.boardname);
          }

        })
        .catch(() => {});
    }
  }, [isSingleBoard, boardId]);

  return (
    <Breadcrumb className="flex w-full min-w-0 flex-1 items-center justify-between">
      <BreadcrumbList className="min-w-0 flex-1">
        <BreadcrumbItem className="shrink-0">
          <BreadcrumbLink href="/board">My Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        {isSingleBoard && (
          <>
            <BreadcrumbSeparator className="hidden shrink-0 md:block" />
            <BreadcrumbItem className="min-w-0">
              <span className="block truncate font-medium text-foreground">
                {boardName || "Loading..."}
              </span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>

      <div className="ml-3 shrink-0 flex items-center gap-2">
        {isSingleBoard ? (
          <CreateColumnIcon boardid={boardId} />
        ) : (
          <CreateBoardIcon />
        )}
        <Drawer />
      </div>
    </Breadcrumb>
  );
}
