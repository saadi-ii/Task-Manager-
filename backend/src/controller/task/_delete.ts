import { Request, Response } from "express"
import taskModel from "../../model/task.model"
import subtaskModel from "../../model/subtask.model"

export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    try {
        const deletedTask = await taskModel.findOneAndDelete({
            taskname: data.taskname as string,
            columnid: data.columnid as string,
            userID: userId
        })

        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" })
            return
        }

        await subtaskModel.deleteMany({ taskid: String(deletedTask._id) })

        res.status(200).json({ message: "Task deleted" })
    } catch {
        res.status(500).json({ message: "Internal server error" })
    }
}
