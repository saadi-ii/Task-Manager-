import { Request, Response } from "express"
import taskModel from "../../model/task.model"

export const _priority = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, columnid: data.columnid, userID: userId },
        { priority: data.priority },
        { new: true }
    )

    res.status(200).json({ task })
}
