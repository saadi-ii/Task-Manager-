import { Request, Response } from "express"
import taskModel from "../../model/task.model"

const pad = (n: number) => String(n).padStart(2, "0")
const toYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const isDateInPast = (dateStr?: string): boolean => {
    if (!dateStr) return false
    return dateStr < toYMD(new Date())
}

export const _date = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    if (isDateInPast(data.date)) {
        res.status(400).json({ message: "Due date cannot be in the past" })
        return
    }

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, columnid: data.columnid, userID: userId },
        { date: data.date },
        { new: true }
    )

    res.status(200).json({ task })
}
