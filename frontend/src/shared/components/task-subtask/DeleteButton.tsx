"use client";

import { MouseEvent } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AxiosError } from "axios";

import { deleteBoard } from "@/lib/api/board/delete";
import { deleteColumn } from "@/lib/api/column/delete";
import { deleteTask } from "@/lib/api/task/delete";
import { deleteSubtask } from "@/lib/api/subtask/delete";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type DeleteButtonProps =
  | { mode: "board"; boardId: string; onSuccess: () => void }
  | { mode: "column"; columnname: string; boardid: string; onSuccess: () => void }
  | { mode: "task"; taskname: string; columnid: string; onSuccess: () => void }
  | { mode: "subtask"; subtaskname: string; taskid: string; onSuccess: () => void };

export const DeleteButton = (props: DeleteButtonProps) => {
  const visibleDelete = props.mode === "column" ? "hidden" : "visible";

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let errorMsg:string;
    try {
      if (props.mode === "board") {
        await deleteBoard(props.boardId);
      } else if (props.mode === "column") {
        await deleteColumn({
          columnname: props.columnname,
          boardid: props.boardid,
        });
      } else if (props.mode === "task") {
        await deleteTask({
          taskname: props.taskname,
          columnid: props.columnid,
        });
      } else {
        await deleteSubtask({
          subtaskname: props.subtaskname,
          taskid: props.taskid,
        });
      }

      
      props.onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MdDeleteOutline />
            <span className={visibleDelete}>Delete</span>
          </Button>
        }
      />

      <AlertDialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};