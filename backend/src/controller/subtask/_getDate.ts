import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _getDate = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    const subtask = await subtaskModel.findOne({
        subtaskname: data.subtaskname as string,
        taskid: data.taskid as string,
        userID: userId
    })

    if (subtask?.date) {
        res.status(200).json(subtask.date)
    } else {
        res.status(200).json("")
    }
}
