"use client";

import { FormEvent } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api/auth/signup";
import { Input } from "@/shared/components/Input";

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
      alert("Welcome");
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
        <Input type="text" name="username" id="username" placeholder="Name" />
        <Input type="text" name="email" id="email" placeholder="Email" />
        <Input type="password" name="password" id="password" placeholder="Password" />
        <Input type="submit" value="Submit" />
      </form>
    </div>
  );
};
