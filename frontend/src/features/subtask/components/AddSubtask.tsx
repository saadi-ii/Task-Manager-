"use client";

import { FormEvent, useRef, useState } from "react";
import { AxiosError } from "axios";
import { CiCirclePlus } from "react-icons/ci";
import { createSubtask } from "@/lib/api/subtask/create";
import { useClickOutside } from "@/hooks/useClickOutside";

interface AddSubtaskProps {
  taskid: string;
  onSuccess: () => void;
}

export const AddSubtask = ({ taskid, onSuccess }: AddSubtaskProps) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLFormElement>(null);
  useClickOutside(panelRef, () => setVisible(false));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subtaskname = new FormData(e.currentTarget).get("subtaskname") as string;

    try {
      await createSubtask({ taskid, subtaskname });
      setVisible(false);
      onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center relative" onClick={() => setVisible(true)}>
      <CiCirclePlus className="text-gray-600 size-5" />
      <form
        ref={panelRef}
        onSubmit={handleSubmit}
        className={`${visible ? "visible" : "hidden"} absolute right-0 top-10 bg-gray-300 flex flex-col justify-center items-center rounded-2xl p-2 text-xl gap-2 z-10`}
      >
        <label htmlFor="subtaskname">Create Subtask</label>
        <input
          type="text"
          name="subtaskname"
          id="subtaskname"
          placeholder="Sub Task Name"
          className="border-2 w-45 py-1 px-3 rounded-2xl"
        />
        <input type="submit" value="Submit" id="submit" className="bg-gray-700 w-fit py-2 px-5 text-white rounded-lg text-2xl" />
      </form>
    </div>
  );
};
