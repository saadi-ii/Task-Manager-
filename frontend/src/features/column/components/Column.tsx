

import { Task } from "@/lib/types/task.types";
import { Column as ColumnType } from "@/lib/types/column.types";
import { DeleteButton } from "@/shared/components/DeleteButton";
import { AddTask } from "@/features/task/components/AddTask";
import { TaskCard } from "@/features/task/components/TaskCard";

interface ColumnProps {
  boardid: string,
  column: ColumnType;
  columns: ColumnType[];
  tasks: Task[];
  onTasksChanged: () => void;
  onDeleted: () => void;
}

export const Column = ({ boardid,column, columns, tasks, onTasksChanged, onDeleted }: ColumnProps) => {
  const tasksInColumn = tasks.filter((task) => task.columnid === column._id);
   const dotColor =
    column.columnname === "TO DO" ? "bg-white"
    : column.columnname === "In Progress" ? "bg-blue-700"
    : column.columnname === "Completed" ? "bg-green-700"
    : "bg-transparent";
  return (
    <div className="relative w-50 h-fit min-w-50 bg-muted p-2 rounded-2xl flex flex-col gap-2  overflow-y-clip ">
      <header className="flex justify-between items-center">
        <div className="text-secondary-foreground w-fit px-2 py-1 rounded-lg text-sm flex items-center justify-center">
          <div className="max-w-40 truncate"><div className={`w-3 h-3 ${dotColor} inline-block rounded-full m-auto mr-2`}></div>{column.columnname}</div>
        </div>
        <div className="flex items-center justify-center gap-1">
          <AddTask boardid={boardid} columnid={column._id} onSuccess={onTasksChanged} columnname={column.columnname}/>
          {!column.isDefault && (
            <DeleteButton mode="column" columnname={column.columnname} boardid={column.boardid} onSuccess={onDeleted} />
          )}
        </div>
      </header>
      <main className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
        {tasksInColumn.map((task) => (
          <TaskCard boardid={boardid} key={task._id} task={task} columns={columns} tasks={tasks} currentColumn={column} onChanged={onTasksChanged} />
        ))}
      </main>
      <footer>
        <AddTask boardid={boardid} columnid={column._id} label="Add Task" onSuccess={onTasksChanged} columnname={column.columnname}/>
      </footer>
    </div>
  );
};
