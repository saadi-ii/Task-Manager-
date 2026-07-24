"use client";

import { FormEvent, useRef, useState } from "react";
import { AxiosError } from "axios";
import { FaPlus } from "react-icons/fa6";
import { createTask } from "@/lib/api/task/create";
import { useClickOutside } from "@/hooks/useClickOutside";

interface AddTaskProps {
  columnid: string;
  label?: string;
  onSuccess: () => void;
}

export const AddTask = ({ columnid, label, onSuccess }: AddTaskProps) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLFormElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskname = new FormData(e.currentTarget).get("taskname") as string;

    try {
      await createTask({ columnid, taskname });
      setVisible(false);
      onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message);
    }
  };

  return (
    <div
      className="py-2 flex items-center relative"
      onClick={(e) => {
        setVisible(true);
        e.stopPropagation();
      }}
    >
      <FaPlus className="text-gray-600 size-5" />
      <div className="text-gray-600">{label}</div>
      <form
        ref={panelRef}
        onSubmit={handleSubmit}
        className={`${visible ? "visible" : "hidden"} absolute right-1 top-10 bg-gray-300 flex flex-col justify-center items-center rounded-2xl p-2 text-xl gap-2 z-10`}
      >
        <label htmlFor="taskname">Create Task</label>
        <input
          type="text"
          name="taskname"
          id="taskname"
          placeholder="Task Name"
          className="border-2 w-60 py-1 px-3 rounded-2xl"
        />
        <input type="submit" value="Submit" id="submit" className="bg-gray-700 w-fit py-2 px-5 text-white rounded-lg text-2xl" />
      </form>
    </div>
  );
};
