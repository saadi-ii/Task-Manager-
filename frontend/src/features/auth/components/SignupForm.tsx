"use client";

import { FormEvent } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api/auth/signup";
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
import { SigninForm } from "@/features/auth/components/Signin";

export const SignupForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signup({ username, email, password });
      window.dispatchEvent(new Event("auth-changed"));
      alert("Welcome");
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
          <DialogTitle>SignUp</DialogTitle>
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
            <Label htmlFor="email">Username or email</Label>
            <Input id="email" name="email" />
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </Field>

          Already Have an Account
          <Dialog>
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Signin</Button>}
              />
              <SigninForm />
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
              <Button type="submit">SignUp</Button>
            }
          />
          
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
