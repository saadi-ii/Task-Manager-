"use client"

import Link from "next/link";
import { Climate_Crisis } from 'next/font/google'
import { get } from "@/lib/api/auth/get"
import { signout } from "@/lib/api/auth/signout"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { SigninForm } from "@/features/auth/components/Signin";
import {SignupForm} from "@/features/auth/components/SignupForm"


const geist = Climate_Crisis({
  subsets: ['latin'],
})

export const Navbar = () => {
  const [user, setUser] = useState("");
  const router = useRouter()

  const fetchUser = () => {
    get()
      .then((res) => setUser(res.data.username))
      .catch(() => setUser(""));
  };
  const signoutuser = () => {
    signout().then(() => setUser(""));
    router.push("/")
  };

  useEffect(() => {
    fetchUser();
    const onAuthChanged = () => fetchUser();
    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
  }, []);

  console.log(user);

  return (
    <div className="shrink-0 w-full z-30">
      <nav className="flex w-full h-14 bg-muted text-primary text-2xl gap-10 justify-between px-10 items-center py-2">
        <div>
          <div className={`${geist.className} text-2xl max-sm:text-lg`}>Task <span className="text-foreground">M</span>anagement</div>
        </div>
        <div className={`flex gap-2 ${user == "" ? "visible" : "hidden"}`}>
          <Dialog>
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">SignUp</Button>}
              />
              <SignupForm />
            </Dialog>
          </Dialog>
          <Dialog>
            <Dialog>
              <DialogTrigger
                render={<Button variant="outline">Signin</Button>}
              />
              <SigninForm />
            </Dialog>
          </Dialog>
        </div>
        <div className={`flex items-center gap-2 ${user == "" ? "hidden" : "visible"}`}>
          <Button onClick={signoutuser} variant={"outline"}>SignOut</Button>
          <div className="text-primary bg-card rounded-full py-1 px-2  max-sm:text-lg max-w-50 truncate">{user}</div>
        </div>



      </nav>
    </div>
  );
};






