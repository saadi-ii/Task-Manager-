"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBoards } from "@/lib/api/board/get";
import { Board } from "@/lib/types/board.types";
import { DeleteButton } from "@/shared/components/DeleteButton";

export const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchBoards = () => {
    getBoards()
      .then((res) => setBoards(res.data.boards))
      .catch((error) => console.error("Fetch error:", error));
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-2 p-4 justify-start items-center w-full overflow-y-auto min-h-0">
      {boards.length > 0 ? (
        boards.map((board) => (
          <Link
            href={`/${board._id}`}
            key={board._id}
            className="w-2/3 h-20 flex justify-between px-5 items-center text-2xl bg-slate-200 rounded-2xl"
          >
            <div>{board.boardname}</div>
            <DeleteButton mode="board" boardId={board._id} onSuccess={fetchBoards} />
          </Link>
        ))
      ) : (
        <p>No boards found</p>
      )}
    </div>
  );
};
