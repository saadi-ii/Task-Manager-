"use client";

import { FormEvent, useRef, useState } from "react";
import { AxiosError } from "axios";
import { FaPlus } from "react-icons/fa6";
import { createTask } from "@/lib/api/task/create";

import { Button } from "@/components/ui/button"
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


interface AddTaskProps {
  boardid: string;
  columnid: string;
  label?: string;
  onSuccess: () => void;
}

export const AddTask = ({ boardid,columnid, label, onSuccess }: AddTaskProps) => {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("kjsjdfhksd");

    const taskname = new FormData(e.currentTarget).get("taskname") as string;
    console.log(taskname);

    try {
      await createTask({ columnid, taskname });
      onSuccess();
      router.push(boardid)
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      className="py-2 flex items-center relative">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" className={`rounded-full`}><FaPlus className="text-muted-foreground size-5" /></Button>} />
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Add Task
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="taskname">Task Name</Label>
                <Input id="taskname" name="taskname" defaultValue="Task 1" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button variant="outline" type="submit">Create</Button>} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

