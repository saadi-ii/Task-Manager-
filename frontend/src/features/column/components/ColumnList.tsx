"use client";

import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { getColumns } from "@/lib/api/column/get";
import { getTasks } from "@/lib/api/task/get";
import { Column as ColumnType } from "@/lib/types/column.types";
import { Task } from "@/lib/types/task.types";
import { Column } from "./Column";
import { FormEvent } from "react";
import { AxiosError } from "axios";
import { createColumn } from "@/lib/api/column/create";
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






interface ColumnListProps {
  boardid: string;
}

export const ColumnList = ({ boardid }: ColumnListProps) => {
  const [Rerender, setRerender] = useState(false)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("SUBMIT");
    e.preventDefault();
    const columnname = new FormData(e.currentTarget).get("columnname") as string;

    try {
      await createColumn({ columnname, boardid });
      setRerender(true)
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message ?? "Something went wrong");
    }
  };


  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchColumns = () => {
    getColumns(boardid).then((res) => setColumns(res.data.columns));
  };

  const fetchTasks = () => {
    getTasks().then((res) => setTasks(res.data.tasks));
  };

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, [boardid,Rerender]);




  return (
    <div className="flex flex-1 gap-5 min-h-0 p-5 overflow-x-auto overflow-y-hidden">
      {columns.map((column) => (
        <Column
          boardid={boardid}
          key={column._id}
          column={column}
          columns={columns}
          tasks={tasks}
          onTasksChanged={fetchTasks}
          onDeleted={fetchColumns}
        />
      ))}




      <Dialog>
        <DialogTrigger
          render={
            <Button className={"h-20 w-20 flex justify-center items-center"} variant="outline">
              <IoAddSharp className="text-foreground size-20" />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Write a unique and meaningful column name
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="columnname">Column Name</Label>
                <Input id="columnname" name="columnname" defaultValue="TO DO" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button variant="outline" type="submit">Save</Button>} />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
