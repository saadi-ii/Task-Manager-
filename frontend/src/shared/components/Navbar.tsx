"use client"

import Link from "next/link";
import { Climate_Crisis } from 'next/font/google'
import {get} from "@/lib/api/auth/get"
import {signout} from "@/lib/api/auth/signout"
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
 
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
      <nav className="flex w-full h-14 bg-slate-100 text-slate-600 text-2xl gap-10 justify-between px-10 items-center py-2">
        <div>
          <div className={`${geist.className} text-2xl max-sm:text-lg`}>Task <span className="text-slate-950">M</span>anagement</div>
        </div>
          <div className={`flex gap-2 ${user==""?"visible":"hidden"}`}>
            <Link href="/signup" className="bg-slate-600 text-white rounded-2xl py-1 px-2  max-sm:text-lg hover:scale-95">Signup</Link>
            <Link href="/signin" className="bg-slate-600 text-white rounded-2xl py-1 px-2  max-sm:text-lg hover:scale-95">Signin</Link>
          </div>
          <div className={`flex gap-2 ${user==""?"hidden":"visible"}`}>
            <button onClick={signoutuser} className="bg-slate-600 text-white  max-sm:text-lg rounded-2xl py-1 px-2 hover:scale-95">Signout</button>
            <div className="text-slate-600 bg-white rounded-full py-1 px-2  max-sm:text-lg max-w-50 truncate">{user}</div>
          </div>
          
        
        
      </nav>
    </div>
  );
};
