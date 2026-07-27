"use client";

import { MouseEvent, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteBoard } from "@/lib/api/board/delete";
import { deleteColumn } from "@/lib/api/column/delete";
import { deleteTask } from "@/lib/api/task/delete";
import { deleteSubtask } from "@/lib/api/subtask/delete";
import { useClickOutside } from "@/hooks/useClickOutside";

type DeleteButtonProps =
  | { mode: "board"; boardId: string; onSuccess: () => void }
  | { mode: "column"; columnname: string; boardid: string; onSuccess: () => void }
  | { mode: "task"; taskname: string; columnid: string; onSuccess: () => void }
  | { mode: "subtask"; subtaskname: string; taskid: string; onSuccess: () => void };

export const DeleteButton = (props: DeleteButtonProps) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (props.mode === "board") {
        await deleteBoard(props.boardId);
      } else if (props.mode === "column") {
        await deleteColumn({ columnname: props.columnname, boardid: props.boardid });
      } else if (props.mode === "task") {
        await deleteTask({ taskname: props.taskname, columnid: props.columnid });
      } else {
        await deleteSubtask({ subtaskname: props.subtaskname, taskid: props.taskid });
      }
      setVisible(false);
      props.onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <MdDeleteOutline
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setVisible(true);
        }}
      />
      <div
        ref={panelRef}
        className={`${visible ? "visible" : "hidden"} p-1 w-40 absolute top-7 right-0 rounded-2xl flex flex-col justify-center items-center border border-border bg-muted z-10`}
      >
        <div className="text-xl">Are You Sure</div>
        <button onClick={handleDelete} className="bg-destructive text-xl text-destructive-foreground rounded-2xl px-2">
          Delete
        </button>
      </div>
    </div>
  );
};
