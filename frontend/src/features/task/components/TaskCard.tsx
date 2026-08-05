"use client";

import { useLayoutEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Subtask } from "@/lib/types/subtask.types";
import { Task } from "@/lib/types/task.types";
import { Column } from "@/lib/types/column.types";
import { ItemName } from "@/shared/components/task-subtask/ItemName";
import { RenameButton } from "@/shared/components/task-subtask/RenameButton";
import { DeleteButton } from "@/shared/components/task-subtask/DeleteButton";
import { DueDate } from "@/shared/components/task-subtask/DueDate";
import { Priority } from "@/shared/components/task-subtask/Priority";
import { SubtaskIcon } from "@/shared/components/SubtaskIcon";
import { MoveTask } from "./MoveTask";
import { AdvanceTaskButton } from "./AdvanceTaskButton";
import { AddSubtask } from "@/features/subtask/components/AddSubtask";
import { SubtaskCard } from "@/features/subtask/components/SubtaskCard";
import { Menu } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



interface TaskCardProps {
  boardid: string,
  task: Task;
  columns: Column[];
  tasks: Task[];
  subtasks: Subtask[];
  currentColumn: Column;
  onChanged: () => void;
}

export const TaskCard = ({ boardid, task, columns, tasks, subtasks, currentColumn, onChanged }: TaskCardProps) => {
  const router = useRouter();
  const [priority, setPriority] = useState(task.priority ?? "");
  const [subtasksVisible, setSubtasksVisible] = useState(false);


  const subtasksForTask = subtasks.filter((subtask) => subtask.taskid === task._id);

  const priorityBorder =
    priority === "urgent" ? "border-l-red-500"
      : priority === "high" ? "border-l-orange-500"
        : priority === "normal" ? "border-l-yellow-500"
          : priority === "low" ? "border-l-green-500"
            : "border-l-gray-200";

  const openDetail = () => router.push(`/board/${boardid}/${task._id}`);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={openDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail();
        }
      }}
      className={`bg-card text-card-foreground h-fit p-2 rounded-2xl flex flex-col gap-2 border-l-4 cursor-pointer hover:bg-accent/40 transition-colors ${priorityBorder}`}
    >
      <header className="flex justify-between items-center">
        <ItemName name={task.taskname} />
        <div onClick={stop}>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground cursor-pointer flex items-center justify-center">
              <Menu className="size-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="flex flex-col p-2 gap-1 items-start justify-center "
              onClick={stop}
            >
              <AdvanceTaskButton
                taskId={task._id}
                currentColumn={currentColumn}
                columns={columns}
                onSuccess={onChanged}
              />

              <MoveTask
                taskId={task._id}
                taskName={task.taskname}
                currentColumnId={task.columnid}
                columns={columns}
                tasks={tasks}
                onSuccess={onChanged}
              />

              <AddSubtask
                taskid={task._id}
                onSuccess={onChanged}
              />

              <RenameButton
                mode="task"
                taskname={task.taskname}
                onSuccess={onChanged}
              />

              <DeleteButton
                mode="task"
                taskname={task.taskname}
                columnid={task.columnid}
                onSuccess={onChanged}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex gap-0.5" onClick={stop}>
        <DueDate mode="task" taskname={task.taskname} columnid={task.columnid} date={task.date} />
        <Priority mode="task" taskname={task.taskname} columnid={task.columnid} priority={task.priority} onPriorityChange={setPriority} />
      </main>

      <footer className="flex items-center justify-between" onClick={stop}>
        <button
          type="button"
          onClick={() => setSubtasksVisible((v) => !v)}
          className={`${subtasksForTask.length === 1 ? "opacity-100" : "opacity-50"} w-full hover:text-foreground cursor-pointer flex justify-between items-center gap-1 text-xs transition-colors`}
          aria-expanded={subtasksVisible}
        >
          <div className="flex justify-center items-center">
            <SubtaskIcon />
            <div>{subtasksForTask.length === 1 || subtasksForTask.length === 0 ? "subtask" : "subtasks"} </div>
          </div>
          <div>{subtasksForTask.length} </div>
        </button>
      </footer>

      {subtasksVisible && subtasksForTask.length > 0 && (
        <div className="flex flex-col gap-2" onClick={stop}>
          {subtasksForTask.map((subtask) => (
            <SubtaskCard key={subtask._id} subtask={subtask} onChanged={onChanged} />
          ))}
        </div>
      )}
    </div>
  );
};



