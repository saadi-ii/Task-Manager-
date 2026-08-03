"use client"

import Link from "next/link";
import { get } from "@/lib/api/auth/get"
import { signout } from "@/lib/api/auth/signout"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react";


export const Navbar = () => {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const fetchUser = () => {
    get()
      .then((res) => setUser(res.data.username))
      .catch(() => setUser(""));
  };
  const signoutuser = () => {
    signout().then(() => setUser(""));
    setOpen(false);
    router.push("/")
  };

  useEffect(() => {
    fetchUser();
    const onAuthChanged = () => fetchUser();
    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
  }, []);

  const closeSheet = () => setOpen(false);

  return (
    <div className="shrink-0 w-full">
      <nav className="flex w-full h-14 bg-muted text-lg gap-10 justify-between px-10 items-center py-2">
        <div className="flex gap-10 items-center">
          <div className="text-2xl font-bold text-primary">
            Task Management
          </div>
          <div className="flex justify-center items-center gap-3 font-semibold max-[800px]:hidden">
            <Link href={"/"} className="py-1 px-2 hover:text-foreground transition-all">Home</Link>
            <Link href={`${user == "" ? "/signin" : "/board"}`} className="py-1 px-2 hover:text-foreground transition-all">Dashboard</Link>
          </div>
        </div>

        <div className="max-[800px]:hidden">
          <div className={`flex gap-2 ${user == "" ? "visible" : "hidden"}`}>
            <Link href={"/signup"}><Button variant="outline">SignUp</Button></Link>
            <Link href={"/signin"}><Button variant="outline">SignIn</Button></Link>
          </div>
          <div className={`flex items-center gap-2 ${user == "" ? "hidden" : "visible"}`}>
            <Button onClick={signoutuser} variant={"outline"}>SignOut</Button>
            <p>Welcome. {user}</p>
          </div>
        </div>

        <div className="hidden max-[800px]:block">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              }
            />
            <SheetContent side="right" className="p-6">
              <SheetTitle className="text-xl font-bold">Task Management</SheetTitle>
              <div className="flex flex-col gap-3 font-semibold mt-4">
                <Link href={"/"} onClick={closeSheet} className="py-1 px-2 hover:text-primary transition-all">Home</Link>
                <Link href={user == "" ? "/signin" : "/board"} onClick={closeSheet} className="py-1 px-2 hover:text-foreground transition-all">Dashboard</Link>
              </div>
              <div className={`flex flex-col gap-2 mt-4 ${user == "" ? "" : "hidden"}`}>
                <Link href={"/signup"} onClick={closeSheet}><Button variant="outline" className="w-full">SignUp</Button></Link>
                <Link href={"/signin"} onClick={closeSheet}><Button variant="outline" className="w-full">SignIn</Button></Link>
              </div>
              <div className={`flex flex-col items-start gap-2 mt-4 ${user == "" ? "hidden" : ""}`}>
                <p className="text-primary">Welcome. {user}</p>
                <Button onClick={signoutuser} variant={"outline"} className="w-full">SignOut</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};
