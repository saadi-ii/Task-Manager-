"use client"

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
import { AxiosError } from "axios";
import { IoAddSharp } from "react-icons/io5";
import { createColumn } from "@/lib/api/column/create";
import { FormEvent, useState } from "react";
import { DivideCircle } from "lucide-react"
import { toast } from "sonner"

export const CreateColumnIcon = ({ boardid }: { boardid: string }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const columnname = new FormData(e.currentTarget).get("columnname") as string;

    try {
      await createColumn({ columnname, boardid });
      setOpen(false);
      window.dispatchEvent(new Event("column-added"));
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={
          <button className="mr-4 flex justify-center items-center gap-2 bg-accent text-lg  max-xl:text-sm max-sm:px-2 rounded-2xl px-6 py-1">
              <IoAddSharp className="text-foreground size-8  max-xl:size-7 max-sm:size-5" />
              <div>Create Column</div>
            </button>
        }>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add new column</DialogTitle>
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
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button variant="outline" type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
