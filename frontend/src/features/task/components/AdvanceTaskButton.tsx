"use client";

import { useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { moveTask } from "@/lib/api/task/move";
import { Column } from "@/lib/types/column.types";

const DEFAULT_ORDER = ["TO DO", "In Progress", "Completed"];

interface AdvanceTaskButtonProps {
  taskId: string;
  currentColumn: Column;
  columns: Column[];
  onSuccess: () => void;
}

export const AdvanceTaskButton = ({ taskId, currentColumn, columns, onSuccess }: AdvanceTaskButtonProps) => {
  const [loading, setLoading] = useState(false);

  if (!currentColumn.isDefault) return null;

  const currentIndex = DEFAULT_ORDER.indexOf(currentColumn.columnname);
  if (currentIndex === -1 || currentIndex === DEFAULT_ORDER.length - 1) {
    return null; // Not a default column we recognize, or already at the end
  }

  const nextColumnName = DEFAULT_ORDER[currentIndex + 1];
  const nextColumn = columns.find(c => c.columnname === nextColumnName && c.isDefault);

  if (!nextColumn) return null;

  const handleAdvance = async () => {
    setLoading(true);
    try {
      await moveTask({ taskid: taskId, columnid: nextColumn._id, columnname: nextColumn.columnname });
      onSuccess();
    } catch {
      // no-op
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdvance}
      disabled={loading}
      className="text-muted-foreground hover:text-foreground disabled:opacity-50 flex items-center justify-center text-sm"
      title={`Advance to ${nextColumnName}`}
    >
      <FiChevronsRight />
      <div>Next</div>
    </button>
  );
};
