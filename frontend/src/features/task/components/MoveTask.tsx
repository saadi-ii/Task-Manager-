"use client";

import { useRef, useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { moveTask } from "@/lib/api/task/move";
import { Column } from "@/lib/types/column.types";
import { Task } from "@/lib/types/task.types";
import { useClickOutside } from "@/hooks/useClickOutside";

interface MoveTaskProps {
  taskId: string;
  taskName: string;
  currentColumnId: string;
  columns: Column[];
  tasks: Task[];
  onSuccess: () => void;
}

export const MoveTask = ({ taskId, taskName, currentColumnId, columns, tasks, onSuccess }: MoveTaskProps) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const columnsWithSameName = new Set(
    tasks
      .filter((task) => task._id !== taskId && task.taskname === taskName)
      .map((task) => task.columnid)
  );

  const otherColumns = columns.filter(
    (column) => column._id !== currentColumnId && !columnsWithSameName.has(column._id)
  );

  const handleMove = async (columnid: string) => {
    try {
      await moveTask({ taskid: taskId, columnid });
      setVisible(false);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <FiArrowRightCircle onClick={() => setVisible((v) => !v)} />
      <div
        ref={panelRef}
        className={`${visible ? "visible" : "hidden"} absolute top-6 right-0 bg-primary text-primary-foreground w-40 flex flex-col rounded-xl p-2 z-20 gap-1`}
      >
        {otherColumns.length > 0 ? (
          otherColumns.map((column) => (
            <div
              key={column._id}
              className="cursor-pointer hover:bg-foreground rounded px-1"
              onClick={() => handleMove(column._id)}
            >
              {column.columnname}
            </div>
          ))
        ) : (
          <div className="text-muted-foreground">No other columns</div>
        )}
      </div>
    </div>
  );
};
