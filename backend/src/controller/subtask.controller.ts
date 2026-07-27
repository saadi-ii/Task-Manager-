import { Request, Response } from "express"
import subtaskModel from "../model/subtask.model"


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


export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string

    const subtasks = await subtaskModel.find({
        userID: userId
    })
    res.status(200).json({ subtasks })
}


export const _rename = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: userId },
        { subtaskname: data.newsubtaskname },
        { new: true }
    )
    res.status(200).json({ subtask })
}


export const _priority = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: userId },
        { priority: data.priority },
        { new: true }
    )
    res.status(200).json({ subtask })
}


export const _getPriority = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    const subtask = await subtaskModel.findOne({
        subtaskname: data.subtaskname as string,
        taskid: data.taskid as string,
        userID: userId
    })

    if (subtask?.priority) {
        res.status(200).json(subtask.priority)
    } else {
        res.status(200).json("")
    }
}


export const _date = async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    const userId = req.userId as string

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: userId },
        { date: data.date },
        { new: true }
    )
    res.status(200).json({ subtask })
}


export const _getDate = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    const subtask = await subtaskModel.findOne({
        subtaskname: data.subtaskname as string,
        taskid: data.taskid as string,
        userID: userId
    })

    if (subtask?.date) {
        res.status(200).json(subtask.date)
    } else {
        res.status(200).json("")
    }
}


export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    await subtaskModel.findOneAndDelete({
        subtaskname: data.subtaskname as string,
        taskid: data.taskid as string,
        userID: userId
    })
    res.status(200).json({ message: "Subtask deleted" })
}
