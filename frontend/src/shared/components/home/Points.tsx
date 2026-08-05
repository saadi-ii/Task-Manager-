import { pointsProp } from "@/lib/types/points.types"
import { PiCheckFatFill } from "react-icons/pi";


const colorClasses = {
    "chart-1": {
        bg: "bg-chart-1",
        text: "text-chart-1",
    },
    // "chart-3": {
    //     bg: "bg-chart-3",
    //     text: "text-chart-3",
    // },
    // "chart-5": {
    //     bg: "bg-chart-5",
    //     text: "text-chart-5",
    // },
    // "chart-4": {
    //     bg: "bg-chart-4",
    //     text: "text-chart-4",
    // },
} as const;

export const Points = ({
    icon: Icon,
    color,
    heading,
    explanation,
    point1,
    point2,
    point3,
    point4,
}: pointsProp) => {
    const classes = colorClasses[color as keyof typeof colorClasses];

    return (
        <div className="flex flex-col items-center justify-center gap-3 m-5 rounded-2xl border border-chart-1 p-10 max-sm:m-2 max-sm:p-5">
            <div className={`rounded-full border p-5 text-background ${classes.bg}`}>
                <Icon size={30} />
            </div>

            <h2 className="text-2xl font-bold max-sm:text-xl text-chart-1">{heading}</h2>
            <p className="text-xl max-sm:text-sm">{explanation}</p>

            <ul>
                {[point1, point2, point3, point4].map((point) => (
                    <li key={point}>
                        <PiCheckFatFill className={`mr-2 inline-block size-4 ${classes.text}`} />
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    );
};