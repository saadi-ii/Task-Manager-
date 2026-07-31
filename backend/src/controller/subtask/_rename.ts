import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _rename = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: userId },
        { subtaskname: data.newsubtaskname },
        { new: true }
    )
    res.status(200).json({ subtask })
}
