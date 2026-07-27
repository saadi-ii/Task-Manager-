"use client"

import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
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
import { FormEvent } from "react";
import {useRouter} from "next/navigation"



export const BoardNavbar = () => {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const boardname = new FormData(e.currentTarget).get("boardname") as string;
  
      try {
        await createBoard({ boardname });
        router.push("/board")
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        alert(err.response?.data?.message ?? "Something went wrong");
      }
    };
  return (
    <div className="shrink-0">
      <nav className="flex bg-muted text-primary text-2xl max-sm:text-xl gap-10 justify-around items-center p-2">
        <div>Boards</div>
        <div>

          <Dialog>
        <DialogTrigger
          render={
            <Button className={"h-10 w-10 bg-transparent flex justify-center items-center rounded-full"} variant="outline">
              <IoAddSharp className="text-foreground size-10" />
            </Button>
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
                <Label htmlFor="boardname">Column Name</Label>
                <Input id="boardname" name="boardname" defaultValue="Personal Task" />
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
      </nav>
    </div>
  );
};
