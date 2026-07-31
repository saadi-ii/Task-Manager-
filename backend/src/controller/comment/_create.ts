import { Request, Response } from "express"
import commentModel from "../../model/comment.model"
import userModel from "../../model/user.model"

export const _create = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    const { taskid, text } = req.body

    if (!taskid || !text?.trim()) {
        res.status(400).json({ message: "taskid and text are required" })
        return
    }

    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    const comment = await commentModel.create({
        taskid,
        userID: userId,
        username: user.username,
        text: text.trim(),
    })

    res.status(201).json({ comment })
}
