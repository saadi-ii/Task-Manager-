"use client";

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiFlag } from "react-icons/fi";
import { getTaskPriority } from "@/lib/api/task/getPriority";
import { setTaskPriority } from "@/lib/api/task/priority";
import { getSubtaskPriority } from "@/lib/api/subtask/getPriority";
import { setSubtaskPriority } from "@/lib/api/subtask/priority";
import { PRIORITY_OPTIONS } from "@/lib/constants/priority";
import { useClickOutside } from "@/hooks/useClickOutside";

type PriorityProps =
  | { mode: "task"; taskname: string; columnid: string; onPriorityChange?: (value: string) => void }
  | { mode: "subtask"; taskid: string; subtaskname: string; onPriorityChange?: (value: string) => void };

export const Priority = (props: PriorityProps) => {
  const [visible, setVisible] = useState(false);
  const [priority, setPriority] = useState("");
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLFormElement>(null);
  useClickOutside(panelRef, () => setVisible(false), triggerRef);

  const key = props.mode === "task" ? props.taskname : props.subtaskname;

  const fetchPriority = async () => {
    try {
      const res =
        props.mode === "task"
          ? await getTaskPriority(props.taskname, props.columnid)
          : await getSubtaskPriority(props.subtaskname, props.taskid);
      setPriority(res.data);
      props.onPriorityChange?.(res.data);
    } catch {
      // no-op
    }
  };

  useEffect(() => {
    fetchPriority();
  }, [key]);

  useLayoutEffect(() => {
    if (!visible || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + 4, left: rect.left });
  }, [visible]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPriority = new FormData(e.currentTarget).get("option") as string;
    try {
      if (props.mode === "task") {
        await setTaskPriority({ taskname: props.taskname, columnid: props.columnid, priority: newPriority });
      } else {
        await setSubtaskPriority({ subtaskname: props.subtaskname, taskid: props.taskid, priority: newPriority });
      }
      props.onPriorityChange?.(newPriority);
      setVisible(false);
      fetchPriority();
    } catch {
      // no-op
    }
  };


  const priorityBorder =
    priority === "urgent" ? "bg-red-500"
    : priority === "high" ? "bg-orange-500"
    : priority === "normal" ? "bg-yellow-500"
    : priority === "low" ? "bg-green-500"
    : "bg-transparent";


  return (
    <div className="border rounded-lg p-0.5 border-border relative">
      <div ref={triggerRef} className="cursor-pointer" onClick={() => setVisible((v) => !v)}>
        <FiFlag className="text-muted-foreground" />
      </div>
      {priority !== "" && (
        <div className={`${priorityBorder}  rounded-xl w-fit px-2 left-6 bottom-0 text-background text-sm mt-1 absolute`}>{priority}</div>
      )}
      {visible && coords && (
        <form
          onSubmit={handleSubmit}
          ref={panelRef}
          style={{ top: coords.top, left: coords.left }}
          className="fixed bg-primary text-primary-foreground w-32 flex flex-col rounded-xl p-2 z-50 shadow-lg"
        >
          {PRIORITY_OPTIONS.map((option) => (
            <div key={option}>
              <input type="radio" name="option" id={option} value={option} /> <label htmlFor={option}>{option}</label>
            </div>
          ))}
          <input type="submit" value="Submit" className="rounded-xl bg-foreground w-fit px-2 text-background mt-1 cursor-pointer" />
        </form>
      )}
    </div>
  );
};
