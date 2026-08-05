import { Request, Response } from "express"
import taskModel from "../../model/task.model"

const pad = (n: number) => String(n).padStart(2, "0")
const toYMD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const isDateInPast = (dateStr?: string): boolean => {
    if (!dateStr) return false
    return dateStr < toYMD(new Date())
}

export const _create = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    if (!data.taskname?.trim()) {
        res.status(400).json({ message: "Must write taskname" })
        return
    }

    const isTaskInSuchColumnExist = await taskModel.findOne({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: userId
    })

    if (isTaskInSuchColumnExist) {
        res.status(409).json({ message: "This task already exists in this column" })
        return
    }

    const recurrence = "once"
    const date = data.deadLine

    if (isDateInPast(date)) {
        res.status(400).json({ message: "Due date cannot be in the past" })
        return
    }

    await taskModel.create({
        userID: userId,
        columnid: data.columnid,
        columnname:data.columnname,
        taskname: data.taskname,
        description: data.description,
        priority: data.newPriority,
        date,
        recurrence,
    })

    res.status(201).json({ message: "Task created" })
}
