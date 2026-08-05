import { SingleCard } from "@/shared/components/home/Card"
import { Nevigate } from "@/shared/components/home/Nevigate";


export const Card = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[70vh] max-xl:h-[40vh] max-sm:h-[70vh] bg-accent gap-10">
            <div className="px-60 max-xl:px-30 max-sm:px-10 flex flex-col justify-center items-center gap-10">
                <div className="flex flex-col gap-10">
                    <div className="text-4xl max-sm:text-2xl font-bold text-center  text-chart-1">Ready to build your first task?</div>
                    <span className="text-xl max-sm:text-sm text-center">Join 5,000+ other learners who started their journey with TaskLearner. Nosetup required, just your curiosity.</span>
                </div>
                
            </div>
            <Nevigate/>
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

