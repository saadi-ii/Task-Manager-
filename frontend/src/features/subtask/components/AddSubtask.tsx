"use client";

import { FormEvent, useRef, useState } from "react";
import { AxiosError } from "axios";
import { FaPlus } from "react-icons/fa6";
import { createSubtask } from "@/lib/api/subtask/create";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AddSubtaskProps {
  boardid: string;
  taskid: string;
  onSuccess: () => void;
}

export const AddSubtask = ({ boardid,taskid, onSuccess }: AddSubtaskProps) => {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subtaskname = new FormData(e.currentTarget).get("subtaskname") as string;

    try {
      await createSubtask({ taskid, subtaskname });
      router.push(boardid)
      onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      className="flex items-center relative">
      <Dialog>
        <DialogTrigger render={<button className={`flex justify-center items-center  text-gray-600 hover:text-black`}>
          <FaPlus className="text-muted-foreground size-3" />
          <div className="text-black text-sm">Subtask</div>
        </button>} />
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogDescription>
                Add Sub-Task
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="subtaskname">Sub-Task Name</Label>
                <Input id="subtaskname" name="subtaskname" defaultValue="Sub-Task 1" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button variant="outline" type="submit">Create</Button>} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
