import { Crafty_Girls } from "next/font/google";
import { Nevigate } from "@/shared/components/home/Nevigate";

const craftyGirls = Crafty_Girls({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-crafty-girls",
});

export const Left = () => {
    

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

            <Nevigate/>
        </div>
    );
};

