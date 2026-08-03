"use client";
import { Crafty_Girls } from "next/font/google";
import { get } from "@/lib/api/auth/get";
import { useRouter } from "next/navigation";

const craftyGirls = Crafty_Girls({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-crafty-girls",
});

export const Left = () => {
    const router = useRouter();

    const fetchUser = async () => {
        try {
            await get();
            router.push("/board");
        } catch {
            router.push("/signin");
        }
    };

    return (
        <div className="flex flex-col justify-center items-start h-screen gap-4 px-10 max-xl:px-0 w-1/2 max-xl:w-3/4 text-chart-1">
            <div className="text-6xl font-bold max-sm:text-2xl">
                Organize your <span className={`${craftyGirls.className}`}>Work</span>
            </div>

            <div className="text-6xl max-sm:text-2xl ">
                <span>Simplify</span> Your{" "}
                <span className={`${craftyGirls.className}`}>Life</span>
            </div>

            <p className="text-xl max-sm:text-sm text-foreground">Plan, track, and manage any project in one flexible workspace. Tasks, docs, timelines, and AI that already understands your work, all built in from day one.</p>

            <button
                onClick={fetchUser}
                className="text-xl max-sm:text-lg text-card rounded-2xl bg-chart-1 mt-3 py-3 px-6 max-sm:px-5 max-sm:py-2 hover:bg-muted hover:text-chart-1 transition-all duration-[0.5s] ease-[ease-in-out] drop-shadow-2xl"
            >
                Start Your First Task
            </button>
        </div>



    );
};

