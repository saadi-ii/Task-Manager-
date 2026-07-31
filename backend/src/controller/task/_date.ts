import { Request, Response } from "express"
import taskModel from "../../model/task.model"
import { isDateInPast } from "../../lib/recurrence"

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
