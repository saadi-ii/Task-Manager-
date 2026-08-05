"use client";

import { FormEvent, useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import { renameTask } from "@/lib/api/task/rename";
import { renameSubtask } from "@/lib/api/subtask/rename";
import { useClickOutside } from "@/hooks/useClickOutside";
import { toast } from "sonner";

type RenameButtonProps =
  | { mode: "task"; taskname: string; onSuccess: () => void }
  | { mode: "subtask"; taskid: string; subtaskname: string; onSuccess: () => void };

export const RenameButton = (props: RenameButtonProps) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLFormElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const currentName = props.mode === "task" ? props.taskname : props.subtaskname;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = new FormData(e.currentTarget).get("rename") as string;

    if (newName === currentName) {
      toast.error("New name is same as the original");
      return;
    }

    try {
      if (props.mode === "task") {
        await renameTask({ taskname: props.taskname, newtaskname: newName });
      } else {
        await renameSubtask({ subtaskname: props.subtaskname, taskid: props.taskid, newsubtaskname: newName });
      }
      setVisible(false);
      props.onSuccess();
    } catch (error) {
      const err = error as { message?: string };
      toast.error(err?.message ?? "Rename failed");
    }
  };

  return (
    <div  onClick={() => setVisible(true)}  className="relative flex justify-center items-center text-sm  text-gray-600 hover:text-black">
      <GoPencil/>
        <div>Rename</div>
      <form
        ref={panelRef}
        onSubmit={handleSubmit}
        className={`${visible ? "visible" : "hidden"} bg-muted p-2 rounded-2xl z-20 absolute top-5 right-0 flex flex-col justify-center items-center`}
      >
        <input
          type="text"
          name="rename"
          id="rename"
          placeholder="Rename"
          className="border px-2 rounded-xl border-border w-20 flex justify-center items-center"
        />
        <input type="submit" value="Submit" className="rounded-xl bg-foreground w-fit px-2 text-background mt-1" />
      </form>
    </div>
  );
};
