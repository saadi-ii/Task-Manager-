import { Request, Response } from "express"
import commentModel from "../../model/comment.model"

export const _delete = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    const commentid = req.query.commentid as string | undefined

    if (!commentid) {
        res.status(400).json({ message: "commentid is required" })
        return
    }

    const comment = await commentModel.findOne({ _id: commentid })
    if (!comment) {
        res.status(404).json({ message: "Comment not found" })
        return
    }
    if (comment.userID !== userId) {
        res.status(403).json({ message: "You can only delete your own comment" })
        return
    }

    await commentModel.findOneAndDelete({ _id: commentid })
    res.status(200).json({ message: "Comment deleted" })
}
