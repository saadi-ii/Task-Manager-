import { Request, Response } from "express"
import subtaskModel from "../model/subtask.model"
import signUpModel from "../model/signup.model"
import jwt, { JwtPayload } from "jsonwebtoken"


export const _create= async (req: Request, res: Response): Promise<void> => {
    const data = req.body

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    if (!data.subtaskname?.trim()) {
        res.status(400).json({ message: "Must write sub-task name" })
        return
    }

    const isSubtaskAlreadyExist = await subtaskModel.findOne({
        taskid:      data.taskid,
        subtaskname: data.subtaskname,
        userID:      decode._id
    })

    if (isSubtaskAlreadyExist) {
        res.status(409).json({ message: "A sub-task with this name already exists in this task" })
        return
    }

    await subtaskModel.create({
        taskid:      data.taskid,
        subtaskname: data.subtaskname,
        userID:      decode._id
    })

    res.status(201).json({ message: "Subtask created" })
}


export const _get = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    const subtasks = await subtaskModel.find({
        userID: decode._id
    })
    res.status(200).json({ subtasks })
}


export const _rename = async (req: Request, res: Response): Promise<void> => {
    const data = req.body

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: decode._id },
        { subtaskname: data.newsubtaskname },
        { new: true }
    )
    res.status(200).json({ subtask })
}


export const _priority = async (req: Request, res: Response): Promise<void> => {
    const data = req.body

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: decode._id },
        { priority: data.priority },
        { new: true }
    )
    res.status(200).json({ subtask })
}


export const _getPriority = async (req: Request, res: Response): Promise<void> => {
    const data = req.query

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    const subtask = await subtaskModel.findOne({
        subtaskname: data.subtaskname as string,
        taskid:      data.taskid as string,
        userID:      decode._id
    })

    if (subtask?.priority) {
        res.status(200).json(subtask.priority)
    } else {
        res.status(200).json("")
    }
}


export const _date = async (req: Request, res: Response): Promise<void> => {
    const data = req.body

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    const subtask = await subtaskModel.findOneAndUpdate(
        { subtaskname: data.subtaskname, taskid: data.taskid, userID: decode._id },
        { date: data.date },
        { new: true }
    )
    res.status(200).json({ subtask })
}


export const _getDate = async (req: Request, res: Response): Promise<void> => {
    const data = req.query

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    const subtask = await subtaskModel.findOne({
        subtaskname: data.subtaskname as string,
        taskid:      data.taskid as string,
        userID:      decode._id
    })

    if (subtask?.date) {
        res.status(200).json(subtask.date)
    } else {
        res.status(200).json("")
    }
}


export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query

    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json("Please SignUp First")
        return
    }
    const decode = await jwt.verify(token, secret) as JwtPayload
    const isUserExist = await signUpModel.findOne({
        _id: decode._id
    })
    if (!isUserExist) {
        res.status(401).json("Unauthorized")
        return
    }

    await subtaskModel.findOneAndDelete({
        subtaskname: data.subtaskname as string,
        taskid:      data.taskid as string,
        userID:      decode._id
    })
    res.status(200).json({ message: "Subtask deleted" })
}
