import { Request, Response } from "express"
import subtaskModel from "../../model/subtask.model"

export const _create = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    if (!data.subtaskname?.trim()) {
        res.status(400).json({ message: "Must write sub-task name" })
        return
    }

    const isSubtaskAlreadyExist = await subtaskModel.findOne({
        taskid: data.taskid,
        subtaskname: data.subtaskname,
        userID: userId
    })

    if (isSubtaskAlreadyExist) {
        res.status(409).json({ message: "A sub-task with this name already exists in this task" })
        return
    }

    await subtaskModel.create({
        taskid: data.taskid,
        subtaskname: data.subtaskname,
        userID: userId
    })

    res.status(201).json({ message: "Subtask created" })
}
