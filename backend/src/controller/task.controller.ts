import { Request, Response } from "express"
import taskModel from "../model/task.model"
import subtaskModel from "../model/subtask.model"

export const _create = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    if (!data.taskname?.trim()) {
        res.status(400).json({ message: "Must write taskname" })
        return
    }

    const isTaskInSuchColumnExist = await taskModel.findOne({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: userId
    })

    if (isTaskInSuchColumnExist) {
        res.status(409).json({ message: "This task already exists in this column" })
        return
    }

    await taskModel.create({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: userId
    })

    res.status(201).json({ message: "Task created" })
}


export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string

    const tasks = await taskModel.find({
        userID: userId
    })
    res.status(200).json({ tasks })
}


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
        { columnid: data.columnid },
        { new: true }
    )

    res.status(200).json({ task })
}


export const _rename = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, userID: userId },
        { taskname: data.newtaskname },
        { new: true }
    )

    res.status(200).json({ task })
}


export const _priority = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, columnid: data.columnid, userID: userId },
        { priority: data.priority },
        { new: true }
    )

    res.status(200).json({ task })
}


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


export const _date = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, columnid: data.columnid, userID: userId },
        { date: data.date },
        { new: true }
    )

    res.status(200).json({ task })
}


export const _getDate = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    const task = await taskModel.findOne({
        taskname: data.taskname as string,
        columnid: data.columnid as string,
        userID: userId
    })

    if (task?.date) {
        res.status(200).json(task.date)
    } else {
        res.status(200).json("")
    }
}


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
    } catch (error) {
        console.error("Task delete error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
