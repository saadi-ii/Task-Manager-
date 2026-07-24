"use client";

import { FormEvent } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createColumn } from "@/lib/api/column/create";
import { Input } from "@/shared/components/Input";

interface CreateColumnFormProps {
  boardid: string;
}

export const CreateColumnForm = ({ boardid }: CreateColumnFormProps) => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const columnname = new FormData(e.currentTarget).get("columnname") as string;

    try {
      await createColumn({ columnname, boardid });
      router.back();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="h-150 w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-fit h-fit left-0 flex flex-col justify-center items-center border-2 border-gray-200 rounded-2xl p-5 text-xl gap-2"
      >
        <Input type="text" name="columnname" id="columnname" placeholder="Write Column Name" />
        <Input type="submit" value="Submit" />
      </form>
    </div>
  );
};
