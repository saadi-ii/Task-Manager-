"use client"
import { getno } from "@/lib/api/auth/getno"
import { useEffect, useState } from "react"

type ReportProps = {
    thickness?: number
    className?: string
}

export const Report = ({
    thickness = 10,
    className = '',
}: ReportProps) => {
    const [Todo, setTodo] = useState(0)
    const [Progress, setProgress] = useState(0)
    const [Completed, setCompleted] = useState(0)

    useEffect(() => {
        const loadCounts = async () => {
            try {
                const res = await getno()
                setTodo(res.data.todo)
                setProgress(res.data.progress)
                setCompleted(res.data.completed)
            } catch {
                // no-op
            }
        }
        loadCounts()
    }, [])

    const total = Todo + Progress + Completed
    const percentage = total === 0 ? 0 : (Completed / total) * 100

    const progressPercentage = total === 0 ? 0 : ((Completed + Progress) / total) * 100
    return (
        <div className="text-sm w-70 aspect-square max-lg:w-50 flex flex-col gap-3 justify-center items-start px-5 border rounded-2xl bg-accent">
            <div className="w-full font-bold text-2xl max-lg:text-xl">Progress</div>
            <div className="flex items-start justify-start gap-2 h-20">
                <div className="font-semibold text-6xl max-lg:text-3xl  text-chart-1 w-fit">{Math.floor(percentage)}% </div>
                <div className="flex flex-col translate-y-10">
                    <div className="text-md text-chart-1">Target </div>
                <div className="text-md text-chart-1">Reached</div>
                </div>
            </div>
            <div
                className={`relative w-full rounded-full bg-white overflow-hidden ${className}`}
                style={{ height: thickness }}
                aria-hidden="true"
            >
                <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${progressPercentage}%`, background: 'blue' }}
                />
                <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${percentage}%`, background: 'green' }}
                />
            </div>

            <div className="flex w-full justify-between">
                <div><div className="w-3 h-3 m-auto rounded-full bg-white inline-block mr-2"></div> TO DO:</div>
                <div className="">{Todo}</div>
            </div>
            <div className="flex w-full justify-between">
                <div><div className="w-3 h-3 m-auto rounded-full bg-blue-700 inline-block mr-2"></div> IN PROGRESS:</div>
                <div className="">{Progress}</div>
            </div>
            <div className="flex w-full justify-between">
                <div><div className="w-3 h-3 m-auto rounded-full bg-green-700 inline-block mr-2"></div> COMPLETED:</div>
                <div className="">{Completed}</div>
            </div>
        </div>
    )
}

