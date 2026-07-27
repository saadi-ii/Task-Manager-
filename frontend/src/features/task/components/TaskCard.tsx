"use client";

import { useEffect, useState } from "react";
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
import { AddSubtask } from "@/features/subtask/components/AddSubtask";
import { SubtaskCard } from "@/features/subtask/components/SubtaskCard";

interface TaskCardProps {
  boardid:string,
  task: Task;
  columns: Column[];
  tasks: Task[];
  onChanged: () => void;
}

export const TaskCard = ({ boardid,task, columns, tasks, onChanged }: TaskCardProps) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [subtasksVisible, setSubtasksVisible] = useState(false);

  const fetchSubtasks = () => {
    getSubtasks().then((res) => setSubtasks(res.data.subtasks));
  };

  useEffect(() => {
    fetchSubtasks();
  }, []);

  const subtasksForTask = subtasks.filter((subtask) => subtask.taskid === task._id);

  return (
    <div className="bg-card text-card-foreground h-fit p-2 rounded-2xl flex flex-col gap-2">
      <header className="flex justify-between items-center">
        <ItemName name={task.taskname} />
        <div className="flex gap-0.5 border rounded-lg p-1 border-border">
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
      </header>

      <main className="flex gap-0.5">
        <DueDate mode="task" taskname={task.taskname} columnid={task.columnid} />
        <Priority mode="task" taskname={task.taskname} columnid={task.columnid} />
      </main>

      <footer className="flex items-center gap-2">
        <SubtaskIcon />
        <div className="text-muted-foreground cursor-pointer" onClick={() => setSubtasksVisible((v) => !v)}>
          subtask
        </div>
      </footer>

      <div className={`${subtasksVisible ? "flex" : "hidden"} flex-col gap-2`}>
        {subtasksForTask.map((subtask) => (
          <SubtaskCard key={subtask._id} subtask={subtask} onChanged={fetchSubtasks} />
        ))}
      </div>
    </div>
  );
};
