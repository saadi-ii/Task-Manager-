import { Request, Response } from "express"
import taskModel from "../../model/task.model"

export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string

    const tasks = await taskModel.find({
        userID: userId
    })
    res.status(200).json({ tasks })
}
