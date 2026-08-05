"use client";

import { ChangeEvent, useState } from "react";
import { setTaskPriority } from "@/lib/api/task/priority";
import { setSubtaskPriority } from "@/lib/api/subtask/priority";
import { PRIORITY_OPTIONS } from "@/lib/constants/priority";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type PriorityProps =
  | { mode: "task"; taskname: string; columnid: string; priority?: string; onPriorityChange?: (value: string) => void }
  | { mode: "subtask"; taskid: string; subtaskname: string; priority?: string; onPriorityChange?: (value: string) => void };

export const Priority = (props: PriorityProps) => {
  const [priority, setPriority] = useState(props.priority ?? "");

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    if (!newPriority) return;
    const previous = priority;
    setPriority(newPriority);
    try {
      if (props.mode === "task") {
        await setTaskPriority({ taskname: props.taskname, columnid: props.columnid, priority: newPriority });
      } else {
        await setSubtaskPriority({ subtaskname: props.subtaskname, taskid: props.taskid, priority: newPriority });
      }
      props.onPriorityChange?.(newPriority);
    } catch {
      setPriority(previous);
    }
  };

  return (
    <NativeSelect size="sm" value={priority} onChange={handleChange} className="border-border">
      <NativeSelectOption value="">Priority</NativeSelectOption>
      {PRIORITY_OPTIONS.map((option) => (
        <NativeSelectOption key={option} value={option}>
          {option}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
