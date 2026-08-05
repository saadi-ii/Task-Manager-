"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signout } from "@/lib/api/auth/signout"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { Head } from "./Head";


export const Navbar = ({username}:{username:string}) => {
  const [open,setOpen] = useState(false);
  const router = useRouter()
  const signoutuser = async() => {
    const res = await signout()
    router.refresh()
  };
  
  const closeSheet = () => setOpen(false);
  return (
    <div className="shrink-0 w-full">
      <nav className="flex w-full h-14 bg-muted text-lg gap-10 justify-between px-10 items-center py-2">
        <Head isUser={username == "" ? false : true} />




        <div className="max-[800px]:hidden">
          <div className={`flex gap-2 ${username == "" ? "visible" : "hidden"}`}>
            <Link href={"/signup"}><Button variant="outline">SignUp</Button></Link>
            <Link href={"/signin"}><Button variant="outline">SignIn</Button></Link>
          </div>
          <div className={`flex items-center gap-2 ${username == "" ? "hidden" : "visible"}`}>
            <Button onClick={signoutuser} variant={"outline"}>SignOut</Button>
            <p>Welcome. {username}</p>
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
                <Link href={username == "" ? "/signin" : "/board"} onClick={closeSheet} className="py-1 px-2 hover:text-foreground transition-all">Dashboard</Link>
              </div>
              <div className={`flex flex-col gap-2 mt-4 ${username == "" ? "" : "hidden"}`}>
                <Link href={"/signup"} onClick={closeSheet}><Button variant="outline" className="w-full">SignUp</Button></Link>
                <Link href={"/signin"} onClick={closeSheet}><Button variant="outline" className="w-full">SignIn</Button></Link>
              </div>
              <div className={`flex flex-col items-start gap-2 mt-4 ${username == "" ? "hidden" : ""}`}>
                <p className="text-primary">Welcome. {username}</p>
                <Button onClick={signoutuser} variant={"outline"} className="w-full">SignOut</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};
