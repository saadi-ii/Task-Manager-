import { Request, Response } from "express"
import taskModel from "../../model/task.model"

export const _rename = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, userID: userId },
        { taskname: data.newtaskname },
        { new: true }
    )

    res.status(200).json({ task })
}
