import { Request, Response } from "express"
import taskModel from "../../model/task.model"
import subtaskModel from "../../model/subtask.model"
import commentModel from "../../model/comment.model"

export const _getAll = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    const taskid = req.query.taskid as string | undefined

    if (!taskid) {
        res.status(400).json({ message: "taskid is required" })
        return
    }

    const task = await taskModel.findOne({ _id: taskid, userID: userId })
    if (!task) {
        res.status(404).json({ message: "Task not found" })
        return
    }

    const [subtasks, comments] = await Promise.all([
        subtaskModel.find({ taskid }),
        commentModel.find({ taskid }).sort({ createdAt: 1 }),
    ])

    res.status(200).json({ task, subtasks, comments })
}
