"use client";
import { get } from "@/lib/api/auth/get";
import { SingleCard } from "@/shared/components/Card"
import { useRouter } from "next/navigation";



export const Card = () => {
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
        <div className="flex flex-col justify-center items-center h-[70vh] max-xl:h-[40vh] max-sm:h-[70vh] bg-accent gap-10">
            <div className="px-60 max-xl:px-30 max-sm:px-10 flex flex-col justify-center items-center gap-10">
                <div className="flex flex-col gap-10">
                    <div className="text-4xl max-sm:text-2xl font-bold text-center  text-chart-1">Ready to build your first task?</div>
                    <span className="text-xl max-sm:text-sm text-center">Join 5,000+ other learners who started their journey with TaskLearner. Nosetup required, just your curiosity.</span>
                </div>
                <button
                    onClick={fetchUser}
                    className="text-xl max-sm:text-lg text-card rounded-2xl bg-chart-1 py-3 max-sm:py-2 px-6 max-sm:px-4 hover:bg-muted hover:text-chart-1 transition-all duration-[0.5s] ease-[ease-in-out] drop-shadow-2xl"
                >
                    Get Start for Free
                </button>
            </div>
            <div className="flex flex-wrap justify-center">
                <SingleCard
                    heading="50+"
                    discription="Interective Lessons"
                />
                <SingleCard
                    heading="100k+"
                    discription="Tasks Created"
                />
                <SingleCard
                    heading="100%"
                    discription="Beginner Friendly"
                />
                <SingleCard
                    heading="Free"
                    discription="Community Access"
                />
            </div>
        </div>
    );
};

