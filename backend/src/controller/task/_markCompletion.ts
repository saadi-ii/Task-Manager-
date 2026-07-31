import { Request, Response } from "express"
import taskModel from "../../model/task.model"

export const _markCompletion = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const movingTask = await taskModel.findOne({ _id: data.taskid, userID: userId })

    if (!movingTask) {
        res.status(404).json({ message: "Task not found" })
        return
    }

    const duplicateInTargetColumn = await taskModel.findOne({
        columnid: data.columnid,
        taskname: movingTask.taskname,
        userID: userId,
        _id: { $ne: movingTask._id }
    })

    if (duplicateInTargetColumn) {
        res.status(409).json({ message: "A task with this name already exists in the target column" })
        return
    }

    const task = await taskModel.findOneAndUpdate(
        { _id: data.taskid, userID: userId },
        { columnid: data.columnid, columnname: data.columnname },
        { new: true }
    )

    res.status(200).json({ task })
}
