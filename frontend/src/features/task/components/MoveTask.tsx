"use client";

import { useRef, useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { moveTask } from "@/lib/api/task/move";
import { Column } from "@/lib/types/column.types";
import { Task } from "@/lib/types/task.types";
import { useClickOutside } from "@/hooks/useClickOutside";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface MoveTaskProps {
  taskId: string;
  taskName: string;
  currentColumnId: string;
  columns: Column[];
  tasks: Task[];
  onSuccess: () => void;
}

export const MoveTask = ({ taskId, taskName, currentColumnId, columns, tasks, onSuccess }: MoveTaskProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const columnsWithSameName = new Set(
    tasks
      .filter((task) => task._id !== taskId && task.taskname === taskName)
      .map((task) => task.columnid)
  );

  const otherColumns = columns.filter(
    (column) => column._id !== currentColumnId && !columnsWithSameName.has(column._id)
  );

  const handleMove = async (columnid: string, columnname: string) => {
    try {
      await moveTask({ taskid: taskId, columnid, columnname });
      onSuccess();
    } catch(err) {
      console.error(err)
    }
  };
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="text-muted-foreground cursor-pointer flex items-center justify-center"
      >
        <FiArrowRightCircle />
        <span>Move</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={panelRef}
        align="end"
        className="flex flex-col p-2 gap-1 items-start justify-center "
        onClick={stop}
      >
        {otherColumns.length > 0 ? (
          otherColumns.map((column) => (
            <div
              key={column._id}
              className="cursor-pointer opacity-50 hover:opacity-100 rounded px-1"
              onClick={() => handleMove(column._id, column.columnname)}
            >
              {column.columnname}
            </div>
          ))
        ) : (
          <div className="text-muted-foreground">No other columns</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>


  );
};


