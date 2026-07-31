import { Request, Response } from "express"
import commentModel from "../../model/comment.model"

export const _get = async (req: Request, res: Response): Promise<void> => {
    const taskid = req.query.taskid as string | undefined
    if (!taskid) {
        res.status(400).json({ message: "taskid is required" })
        return
    }

    const comments = await commentModel.find({ taskid }).sort({ createdAt: 1 })
    res.status(200).json({ comments })
}
