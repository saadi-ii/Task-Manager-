import { Request, Response } from "express"
import taskModel from "../../model/task.model"

export const _getPriority = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    const task = await taskModel.findOne({
        taskname: data.taskname as string,
        columnid: data.columnid as string,
        userID: userId
    })

    if (task?.priority) {
        res.status(200).json(task.priority)
    } else {
        res.status(200).json("")
    }
}
