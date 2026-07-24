"use client";

import { Task } from "@/lib/types/task.types";
import { Column as ColumnType } from "@/lib/types/column.types";
import { DeleteButton } from "@/shared/components/DeleteButton";
import { AddTask } from "@/features/task/components/AddTask";
import { TaskCard } from "@/features/task/components/TaskCard";

interface ColumnProps {
  column: ColumnType;
  columns: ColumnType[];
  tasks: Task[];
  onTasksChanged: () => void;
  onDeleted: () => void;
}

export const Column = ({ column, columns, tasks, onTasksChanged, onDeleted }: ColumnProps) => {
  const tasksInColumn = tasks.filter((task) => task.columnid === column._id);

  return (
    <div className="w-70 min-w-70 bg-gray-100 h-fit max-h-full p-2 rounded-2xl flex flex-col gap-2">
      <header className="flex justify-between items-center">
        <div className="bg-gray-300 w-fit px-2 py-1 rounded-lg text-sm flex items-center justify-center">
          <div>{column.columnname}</div>
        </div>
        <div className="flex items-center justify-center gap-1">
          <AddTask columnid={column._id} onSuccess={onTasksChanged} />
          <DeleteButton mode="column" columnname={column.columnname} boardid={column.boardid} onSuccess={onDeleted} />
        </div>
      </header>
      <main className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
        {tasksInColumn.map((task) => (
          <TaskCard key={task._id} task={task} columns={columns} onChanged={onTasksChanged} />
        ))}
      </main>
      <footer>
        <AddTask columnid={column._id} label="Add Task" onSuccess={onTasksChanged} />
      </footer>
    </div>
  );
};
