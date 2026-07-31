import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"
import { isDateInPast } from "../../lib/recurrence"

export const _date = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    if (isDateInPast(data.date)) {
        res.status(400).json({ message: "Due date cannot be in the past" })
        return
    }

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: userId },
        { date: data.date },
        { new: true }
    )
    res.status(200).json({ subtask })
}
