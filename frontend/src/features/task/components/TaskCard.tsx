"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSubtasks } from "@/lib/api/subtask/get";
import { Subtask } from "@/lib/types/subtask.types";
import { Task } from "@/lib/types/task.types";
import { Column } from "@/lib/types/column.types";
import { ItemName } from "@/shared/components/ItemName";
import { RenameButton } from "@/shared/components/RenameButton";
import { DeleteButton } from "@/shared/components/DeleteButton";
import { DueDate } from "@/shared/components/DueDate";
import { Priority } from "@/shared/components/Priority";
import { SubtaskIcon } from "@/shared/components/SubtaskIcon";
import { MoveTask } from "./MoveTask";
import { AdvanceTaskButton } from "./AdvanceTaskButton";
import { AddSubtask } from "@/features/subtask/components/AddSubtask";
import { SubtaskCard } from "@/features/subtask/components/SubtaskCard";
import { Menu } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface TaskCardProps {
  boardid: string,
  task: Task;
  columns: Column[];
  tasks: Task[];
  currentColumn: Column;
  onChanged: () => void;
}

export const TaskCard = ({ boardid, task, columns, tasks, currentColumn, onChanged }: TaskCardProps) => {
  const router = useRouter();
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [priority, setPriority] = useState("");
  const [subtasksVisible, setSubtasksVisible] = useState(false);
  const [headVisible, setheadVisible] = useState(false);
  const [menuCoords, setMenuCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => setheadVisible(false), triggerRef);

  useLayoutEffect(() => {
    if (!headVisible || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuCoords({ top: rect.bottom + 4, left: rect.right - 80 });
  }, [headVisible]);


  const fetchSubtasks = () => {
    getSubtasks().then((res) => setSubtasks(res.data.subtasks));
  };

  useEffect(() => {
    fetchSubtasks();
  }, []);

  const subtasksForTask = subtasks.filter((subtask) => subtask.taskid === task._id);

  const priorityBorder =
    priority === "urgent" ? "border-l-red-500"
    : priority === "high" ? "border-l-orange-500"
    : priority === "normal" ? "border-l-yellow-500"
    : priority === "low" ? "border-l-green-500"
    : "border-l-gray-200";

  const openDetail = () => router.push(`/board/${boardid}/task/${task._id}`);
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
          <div ref={triggerRef} className="text-muted-foreground cursor-pointer" onClick={() => setheadVisible((v) => !v)}>
            <Menu className="size-4" />
          </div>
          {headVisible && menuCoords && (
            <div
              ref={panelRef}
              style={{ top: menuCoords.top, left: menuCoords.left }}
              className="fixed bg-accent w-24 flex flex-col items-start pl-1 gap-0.5 border rounded-lg p-1 border-border z-50 shadow-lg"
              onClick={stop}
            >
              <AdvanceTaskButton taskId={task._id} currentColumn={currentColumn} columns={columns} onSuccess={onChanged} />
              <MoveTask
                taskId={task._id}
                taskName={task.taskname}
                currentColumnId={task.columnid}
                columns={columns}
                tasks={tasks}
                onSuccess={onChanged}
              />
              <AddSubtask boardid={boardid} taskid={task._id} onSuccess={fetchSubtasks} />
              <RenameButton mode="task" taskname={task.taskname} onSuccess={onChanged} />
              <DeleteButton mode="task" taskname={task.taskname} columnid={task.columnid} onSuccess={onChanged} />
            </div>
          )}
        </div>
      </header>

      <main className="flex gap-0.5" onClick={stop}>
        <DueDate mode="task" taskname={task.taskname} columnid={task.columnid} />
        <Priority mode="task" taskname={task.taskname} columnid={task.columnid} onPriorityChange={setPriority} />
      </main>

      {subtasksForTask.length > 0 && (
        <footer className="flex items-center gap-2" onClick={stop}>
          <div className="text-muted-foreground cursor-pointer flex items-center gap-1" onClick={() => setSubtasksVisible((v) => !v)}>
            <SubtaskIcon />
            <span>{subtasksForTask.length} subtask{subtasksForTask.length > 1 ? "s" : ""}</span>
          </div>
        </footer>
      )}

      <div className={`${subtasksVisible ? "flex" : "hidden"} flex-col gap-2`} onClick={stop}>
        {subtasksForTask.map((subtask) => (
          <SubtaskCard key={subtask._id} subtask={subtask} onChanged={fetchSubtasks} />
        ))}
      </div>
    </div>
  );
};
