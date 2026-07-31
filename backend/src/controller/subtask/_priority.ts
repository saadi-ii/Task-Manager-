import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _priority = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: userId },
        { priority: data.priority },
        { new: true }
    )
    res.status(200).json({ subtask })
}
