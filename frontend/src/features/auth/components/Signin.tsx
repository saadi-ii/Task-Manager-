"use client";

import { FormEvent } from "react";
import { AxiosError } from "axios";
import { useRouter, } from "next/navigation";
import { signin } from "@/lib/api/auth/signin";
import { Input } from "@/shared/components/Input";
import Link from "next/link";
import Image from "next/image";

export const SigninForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signin({ username, email, password });
      window.dispatchEvent(new Event("auth-changed"));
      alert("Welcome");
      router.replace("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className='flex  max-sm:flex-col justify-center items-center p-5 b-2 rounded-2xl text-2xl text-slate-600 h-screen gap-2'>
      <div className="h-150 w-screen flex-col flex justify-center items-center">
        <div className="text-slate-600 text-3xl font-bold">SigIn</div>
        <form
          onSubmit={handleSubmit}
          className="w-fit h-fit left-0 flex flex-col justify-center items-center border-2 border-gray-200 rounded-2xl p-5 text-xl gap-2"
        >
          <Input type="text" name="username" id="username" placeholder="Name" />
          <Input type="password" name="password" id="password" placeholder="Password" />
          <Input type="submit" value="Submit" />
        </form>
        <Link href={"./signup"}>Not signup</Link>
      </div>
      <div className='w-2/3 '>
        <Image
          src="https://plus.unsplash.com/premium_photo-1720428645118-eaf237cbaed1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW4lMjBkZXNpZ24lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Logo"
          width={1000}
          height={1000}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};
