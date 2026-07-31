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
import { createBoard } from "@/lib/api/board/create";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export const CreateBoardIcon = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const boardname = new FormData(e.currentTarget).get("boardname") as string;
    const boarddescription = new FormData(e.currentTarget).get("boarddescription") as string;

    try {
      await createBoard({ boardname,boarddescription });
      setOpen(false);
      window.dispatchEvent(new Event("board-changed"));
      router.push("/board")
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message ?? "Something went wrong");
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <button className="mr-4 flex justify-center items-center gap-2 bg-accent text-lg max-xl:text-sm max-sm:px-2 rounded-2xl px-6 py-1">
              <IoAddSharp className="text-foreground size-8 max-xl:size-7 max-sm:size-5" />
              <div>Create Board</div>
            </button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Write a unique and meaningful Board name
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="boardname">Board Name</Label>
                <Input id="boardname" name="boardname" defaultValue="Personal Task" />
              </Field>
              <Field>
                <Label htmlFor="boarddescription">Description</Label>
                <Input id="boarddescription" name="boarddescription" defaultValue="Creating to manage tasks..." />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button variant="outline" type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
