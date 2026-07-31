import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string

    const subtasks = await subtaskModel.find({
        userID: userId
    })
    res.status(200).json({ subtasks })
}
