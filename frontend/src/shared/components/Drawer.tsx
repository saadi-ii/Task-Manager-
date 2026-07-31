"use client";

import { useEffect, useState } from "react";
import { PanelRightOpen } from "lucide-react";
import {
  Drawer as UIDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/lib/api/task/get";
import { getAllColumns } from "@/lib/api/column/getAll";
import { getBoards } from "@/lib/api/board/get";
import { Task } from "@/lib/types/task.types";
import { todayYMD } from "@/lib/utils/date";

const COMPLETED_COLUMN = "Completed";

interface TodayItem {
  task: Task;
  boardName: string;
}

export const Drawer = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<TodayItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    Promise.all([getTasks(), getAllColumns(), getBoards()])
      .then(([tasksRes, colsRes, boardsRes]) => {
        const today = todayYMD();
        const columnToBoard = new Map(colsRes.data.columns.map((c) => [c._id, c.boardid]));
        const boardName = new Map(boardsRes.data.boards.map((b) => [b._id, b.boardname]));
        const filtered: TodayItem[] = tasksRes.data.tasks
          .filter((t) => t.date === today)
          .map((t) => ({
            task: t,
            boardName: boardName.get(columnToBoard.get(t.columnid) ?? "") ?? "—",
          }));
        setItems(filtered);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [open]);

  return (
    <UIDrawer swipeDirection="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        render={
          <button
            aria-label="Open panel"
            className="flex justify-center items-center gap-1 bg-accent text-xs max-sm:text-[10px] rounded-xl px-2.5 py-1"
          >
            <PanelRightOpen className="text-foreground size-4 max-sm:size-3" />
          </button>
        }
      />
      <DrawerContent className="w-80 max-w-[90vw]">
        <DrawerHeader>
          <DrawerTitle>Today&apos;s Tasks</DrawerTitle>
          <DrawerDescription>
            {loading ? "Loading..." : `${items.length} task${items.length === 1 ? "" : "s"} due today`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 flex-1 min-h-0 overflow-auto flex flex-col gap-2">
          {!loading && items.length === 0 && (
            <div className="text-sm text-muted-foreground">Nothing scheduled for today.</div>
          )}
          {items.map(({ task, boardName }) => {
            const isCompleted = task.columnname === COMPLETED_COLUMN;
            return (
              <div
                key={task._id}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-sm">{task.taskname}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {boardName} · {task.columnname}
                  </div>
                </div>
                <span
                  className={
                    "shrink-0 text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 " +
                    (isCompleted
                      ? "bg-green-500/15 text-green-600 dark:text-green-400"
                      : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400")
                  }
                >
                  {isCompleted ? "Completed" : "Pending"}
                </span>
              </div>
            );
          })}
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </UIDrawer>
  );
};
