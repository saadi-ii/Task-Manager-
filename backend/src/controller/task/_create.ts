import { Request, Response } from "express"
import taskModel from "../../model/task.model"
import { endOfPeriod, isDateInPast } from "../../lib/recurrence"
import { deriveRecurrence } from "../../lib/defaultRecurrence"

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

    const recurrence = await deriveRecurrence(data.columnid)
    const date = recurrence === "once" ? data.deadLine : endOfPeriod(recurrence)

    if (recurrence === "once" && isDateInPast(date)) {
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
