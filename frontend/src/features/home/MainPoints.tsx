import { Points } from "@/shared/components/Points"
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa";

export const MainPoints = () => {

    return (
        <div className="flex flex-col items-center justify-center gap-15 max-sm:5">
            <h2 className="text-4xl max-sm:text-2xl max-sm:text-center text-chart-1 font-bold">Why Should You Manage Your Tasks?</h2>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 px-50 max-xl:px-20 max-lg:px-5">
                <Points
                    icon={FaArrowTrendUp}
                    color="chart-1"
                    heading="Better Productivity"
                    explanation="Manage your tasks to ensure that important work gets completed on time and nothing is overlooked."
                    point1="Prioritize high-impact tasks."
                    point2="Track progress efficiently."
                    point3="Reduce time wasted deciding what to do next."
                    point4="Accomplish more in less time."
                />
                <Points
                    icon={FaArrowTrendUp}
                    color="chart-3"
                    heading="Reduced Stress and Overwhelm"
                    explanation="Having a clear view of your responsibilities helps prevent last-minute rushes and missed deadlines."
                    point1="Organize tasks in one place."
                    point2="Break large projects into manageable steps."
                    point3="Avoid forgetting critical assignments."
                    point4="Maintain a better work-life balance."
                />
                <Points
                    icon={LuClock3}
                    color="chart-5"
                    heading="Improved Time Management"
                    explanation="Task management helps you allocate time effectively and stay focused on what matters most."
                    point1="Set realistic deadlines."
                    point2="Plan daily and weekly schedules."
                    point3="Identify bottlenecks early."
                    point4="Eliminate unnecessary distractions."
                />
                <Points
                    icon={FaBullseye}
                    color="chart-4"
                    heading="Greater Goal Achievement"
                    explanation="Consistent task management helps transform goals into actionable steps, increasing the likelihood of success."
                    point1="Align tasks with personal and professional objectives."
                    point2="Monitor milestones and achievements."
                    point3="Stay motivated through visible progress."
                    point4="Build habits that support long-term growth."
                />

            </div>

        </div>


    );
}
