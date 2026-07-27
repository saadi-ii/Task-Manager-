"use client";

import { useState } from "react";
import { Crafty_Girls } from "next/font/google";
import { get } from "@/lib/api/auth/get";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { SigninForm } from "@/features/auth/components/Signin";

const craftyGirls = Crafty_Girls({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crafty-girls",
});

const Home = () => {
  const router = useRouter();
  const [signinOpen, setSigninOpen] = useState(false);

  const fetchUser = async () => {
    try {
      await get();
      router.push("/board");
    } catch {
      setSigninOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="text-6xl font-bold max-sm:text-4xl">
          Organize your <span className={craftyGirls.className}>Work</span>
        </div>

        <div className="text-6xl max-sm:text-4xl">
          <span className="text-chart-1">Simplify</span> Your{" "}
          <span className={craftyGirls.className}>Life</span>
        </div>

        <button
          onClick={fetchUser}
          className="text-4xl max-sm:text-3xl text-card rounded-2xl bg-chart-1 mt-3 p-2 hover:scale-95"
        >
          Get Start
        </button>
      </div>

      <Dialog open={signinOpen} onOpenChange={setSigninOpen}>
        <SigninForm />
      </Dialog>
    </>
  );
};

export default Home;