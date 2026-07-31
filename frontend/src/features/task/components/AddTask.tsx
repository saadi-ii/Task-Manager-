"use client";

import { FormEvent, useRef, useState } from "react";
import { AxiosError } from "axios";
import { FaPlus } from "react-icons/fa6";
import { createTask } from "@/lib/api/task/create";
import { PRIORITY_OPTIONS } from "@/lib/constants/priority";
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
import { toast } from "sonner";
import { todayYMD } from "@/lib/utils/date";


interface AddTaskProps {
  boardid: string;
  columnid: string;
  columnname: string;
  label?: string;
  onSuccess: () => void;
}

export const AddTask = ({ boardid, columnid, label, onSuccess, columnname }: AddTaskProps) => {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const taskname = form.get("taskname") as string;
    const description = form.get("description") as string;
    const newPriority = form.get("option") as string;
    const deadLine = form.get("deadline") as string;

    if (deadLine && deadLine < todayYMD()) {
      toast.error("Due date cannot be in the past");
      return;
    }

    try {
      await createTask({ columnid, columnname, taskname,description,newPriority,deadLine });
      onSuccess();
      router.push(boardid)
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      className="py-2 flex items-center relative">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" className={`rounded-full px-1`}>
          <FaPlus className="text-muted-foreground size-3" />
        </Button>} />
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
              <Field>
                <Label htmlFor="description">Description</Label>
                <textarea id="description" name="description" defaultValue="Important task" className="h-25 border rounded-xl p-2" ></textarea>
              </Field>
              <Field className="flex flex-row justify-around items-center">
                {PRIORITY_OPTIONS.map((option) => (
                  <div key={option}>
                    <input type="radio" name="option" id={option} value={option} /> <label htmlFor={option}>{option}</label>
                  </div>
                ))}
              </Field>
              <Field>
                <label htmlFor="deadline">DeadLine</label>
                <input type="date" name="deadline" id="deadline" min={todayYMD()} />
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

