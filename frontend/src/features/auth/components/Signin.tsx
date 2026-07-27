// Signin.tsx
"use client";

import { FormEvent } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signin } from "@/lib/api/auth/signin";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {SignupForm} from "@/features/auth/components/SignupForm"

export const SigninForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get('username') as string
    const password = formData.get("password") as string;

    try {
      await signin({ username,email, password });
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/board");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>SignIn</DialogTitle>
          <DialogDescription>
            Enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="my-4">
          <Field>
            <Label htmlFor="username">Username or email</Label>
            <Input id="username" name="username" />
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </Field>

          Do Not Have Any Account
          <Dialog>
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">SignUp</Button>}
              />
              <SignupForm />
            </Dialog>
          </Dialog>
        </FieldGroup>

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <DialogClose
            render={
              <Button type="submit">SignIn</Button>
            }
          />
          
        </DialogFooter>
      </form>
    </DialogContent>
  );
};





