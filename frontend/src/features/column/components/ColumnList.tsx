import { revalidatePath } from "next/cache";
import { getColumnsServer } from "@/lib/api/column/server-get";
import { getTasksServer } from "@/lib/api/task/server-get";
import { getSubtasksServer } from "@/lib/api/subtask/server-get";
import { Column as ColumnType } from "@/lib/types/column.types";
import { Task } from "@/lib/types/task.types";
import { Subtask } from "@/lib/types/subtask.types";
import { Column } from "./Column";

interface ColumnListProps {
  boardid: string,
  columns : ColumnType[],
  tasks : Task[],
  subtasks : Subtask[]
}

export const ColumnList = async ({ boardid,columns, tasks,subtasks}: ColumnListProps) => {
  const refreshData = async () => {
    "use server";
    revalidatePath(`/board/${boardid}`);
  };

  return (
    <div className="flex flex-1 gap-5 min-h-0 p-5 overflow-x-auto overflow-y-hidden">
      {columns.map((column) => (
        <Column
          boardid={boardid}
          key={column._id}
          column={column}
          columns={columns}
          tasks={tasks}
          subtasks={subtasks}
          onTasksChanged={refreshData}
          onDeleted={refreshData}
        />
      ))}
    </div>
  );
};
