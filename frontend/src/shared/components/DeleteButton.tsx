"use client";

import { MouseEvent, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteBoard } from "@/lib/api/board/delete";
import { deleteColumn } from "@/lib/api/column/delete";
import { deleteTask } from "@/lib/api/task/delete";
import { deleteSubtask } from "@/lib/api/subtask/delete";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AxiosError } from "axios";

type DeleteButtonProps =
  | { mode: "board"; boardId: string; onSuccess: () => void }
  | { mode: "column"; columnname: string; boardid: string; onSuccess: () => void }
  | { mode: "task"; taskname: string; columnid: string; onSuccess: () => void }
  | { mode: "subtask"; subtaskname: string; taskid: string; onSuccess: () => void };

export const DeleteButton = (props: DeleteButtonProps) => {
  const [visible, setVisible] = useState(false);
  const visibleDelete = props.mode === "column" ? "hidden" : "visible";


  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, () => { setVisible(false); setErrorMsg(null); });

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg(null);
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
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 403) {
        setErrorMsg(err.response.data?.message ?? "This cannot be deleted.");
      }
    }
  };

  return (
    <div onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setErrorMsg(null);
          setVisible(true);
        }}
         className="relative flex justify-center items-center text-sm  text-gray-600 hover:text-black">
      <MdDeleteOutline />
      <div className={`${visibleDelete}`}>Delete</div>
      <div
        ref={panelRef}
        className={`${visible ? "visible" : "hidden"} p-1 w-44 absolute top-7 right-0 rounded-2xl flex flex-col justify-center items-center border border-border bg-muted z-10`}
      >
        {errorMsg ? (
          <div className="text-sm text-center text-destructive px-1 py-1">{errorMsg}</div>
        ) : (
          <>
            <div className="text-xl">Are You Sure</div>
            <button onClick={handleDelete} className="bg-destructive text-xl text-destructive-foreground rounded-2xl px-2">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

