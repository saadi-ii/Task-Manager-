import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    await subtaskModel.findOneAndDelete({
        subtaskname: data.subtaskname as string,
        taskid: data.taskid as string,
        userID: userId
    })
    res.status(200).json({ message: "Subtask deleted" })
}
