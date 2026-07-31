import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _getPriority = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    const subtask = await subtaskModel.findOne({
        subtaskname: data.subtaskname as string,
        taskid: data.taskid as string,
        userID: userId
    })

    if (subtask?.priority) {
        res.status(200).json(subtask.priority)
    } else {
        res.status(200).json("")
    }
}
