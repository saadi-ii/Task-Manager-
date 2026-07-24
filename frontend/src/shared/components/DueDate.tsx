"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { getTaskDate } from "@/lib/api/task/getDate";
import { setTaskDate } from "@/lib/api/task/date";
import { getSubtaskDate } from "@/lib/api/subtask/getDate";
import { setSubtaskDate } from "@/lib/api/subtask/date";
import { useClickOutside } from "@/hooks/useClickOutside";

type DueDateProps =
  | { mode: "task"; taskname: string; columnid: string }
  | { mode: "subtask"; taskid: string; subtaskname: string };

export const DueDate = (props: DueDateProps) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState("");
  const panelRef = useRef<HTMLFormElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const key = props.mode === "task" ? props.taskname : props.subtaskname;

  const fetchDate = async () => {
    try {
      const res =
        props.mode === "task"
          ? await getTaskDate(props.taskname, props.columnid)
          : await getSubtaskDate(props.subtaskname, props.taskid);
      setDate(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDate = new FormData(e.currentTarget).get("datetime") as string;

    try {
      if (props.mode === "task") {
        await setTaskDate({ taskname: props.taskname, columnid: props.columnid, date: newDate });
      } else {
        await setSubtaskDate({ subtaskname: props.subtaskname, taskid: props.taskid, date: newDate });
      }
      setVisible(false);
      fetchDate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-lg p-0.5 border-gray-400 relative">
      <div>
        {date === "" ? (
          <FiCalendar className="text-gray-600" onClick={() => setVisible(true)} />
        ) : (
          <div className="text-xs" onClick={() => setVisible(true)}>
            {date}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        ref={panelRef}
        className={`${visible ? "visible" : "hidden"} absolute bg-gray-200 rounded-2xl p-5 flex flex-col z-20 justify-center items-center`}
      >
        <input type="date" name="datetime" id="datetime" />
        <input type="submit" value="Submit" className="rounded-xl bg-gray-600 w-fit px-2 text-white mt-1" />
      </form>
    </div>
  );
};
