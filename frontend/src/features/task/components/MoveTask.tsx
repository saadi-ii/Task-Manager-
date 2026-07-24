"use client";

import { useRef, useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { moveTask } from "@/lib/api/task/move";
import { Column } from "@/lib/types/column.types";
import { useClickOutside } from "@/hooks/useClickOutside";

interface MoveTaskProps {
  taskname: string;
  currentColumnId: string;
  columns: Column[];
  onSuccess: () => void;
}

export const MoveTask = ({ taskname, currentColumnId, columns, onSuccess }: MoveTaskProps) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const otherColumns = columns.filter((column) => column._id !== currentColumnId);

  const handleMove = async (columnid: string) => {
    try {
      await moveTask({ taskname, columnid });
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
        className={`${visible ? "visible" : "hidden"} absolute top-6 right-0 bg-gray-500 text-white w-40 flex flex-col rounded-xl p-2 z-20 gap-1`}
      >
        {otherColumns.length > 0 ? (
          otherColumns.map((column) => (
            <div
              key={column._id}
              className="cursor-pointer hover:bg-gray-600 rounded px-1"
              onClick={() => handleMove(column._id)}
            >
              {column.columnname}
            </div>
          ))
        ) : (
          <div className="text-gray-300">No other columns</div>
        )}
      </div>
    </div>
  );
};
