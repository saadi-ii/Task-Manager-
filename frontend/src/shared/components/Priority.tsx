"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FiFlag } from "react-icons/fi";
import { getTaskPriority } from "@/lib/api/task/getPriority";
import { setTaskPriority } from "@/lib/api/task/priority";
import { getSubtaskPriority } from "@/lib/api/subtask/getPriority";
import { setSubtaskPriority } from "@/lib/api/subtask/priority";
import { PRIORITY_OPTIONS } from "@/lib/constants/priority";
import { useClickOutside } from "@/hooks/useClickOutside";

type PriorityProps =
  | { mode: "task"; taskname: string; columnid: string }
  | { mode: "subtask"; taskid: string; subtaskname: string };

export const Priority = (props: PriorityProps) => {
  const [visible, setVisible] = useState(false);
  const [priority, setPriority] = useState("");
  const panelRef = useRef<HTMLFormElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const key = props.mode === "task" ? props.taskname : props.subtaskname;

  const fetchPriority = async () => {
    try {
      const res =
        props.mode === "task"
          ? await getTaskPriority(props.taskname, props.columnid)
          : await getSubtaskPriority(props.subtaskname, props.taskid);
      setPriority(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPriority();
  }, [key]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPriority = new FormData(e.currentTarget).get("option") as string;

    try {
      if (props.mode === "task") {
        await setTaskPriority({ taskname: props.taskname, columnid: props.columnid, priority: newPriority });
      } else {
        await setSubtaskPriority({ subtaskname: props.subtaskname, taskid: props.taskid, priority: newPriority });
      }
      setVisible(false);
      fetchPriority();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-lg p-0.5 border-gray-400 relative">
      <FiFlag className="text-gray-600" onClick={() => setVisible((v) => !v)} />
      {priority !== "" && (
        <div className="rounded-xl bg-gray-600 w-fit px-2 left-6 bottom-0 text-white mt-1 absolute">{priority}</div>
      )}
      <form
        onSubmit={handleSubmit}
        ref={panelRef}
        className={`${visible ? "visible" : "hidden"} absolute left-5 top-2 bg-gray-500 text-white w-30 flex flex-col rounded-xl p-2 z-10`}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <div key={option}>
            <input type="radio" name="option" id={option} value={option} /> <label htmlFor={option}>{option}</label>
          </div>
        ))}
        <input type="submit" value="Submit" className="rounded-xl bg-gray-600 w-fit px-2 text-white mt-1" />
      </form>
    </div>
  );
};
