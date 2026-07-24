import { Request, Response } from "express"
import taskModel from "../model/task.model"
import signUpModel from "../model/signup.model"
import jwt, { JwtPayload } from "jsonwebtoken"

export const _create = async (req: Request, res: Response): Promise<void> => {
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

    if (!data.taskname?.trim()) {
        res.status(400).json({ message: "Must write taskname" })
        return
    }

    const isTaskInSuchColumnExist = await taskModel.findOne({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: decode._id
    })

    if (isTaskInSuchColumnExist) {
        res.status(409).json({ message: "This task already exists in this column" })
        return
    }

    await taskModel.create({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: decode._id
    })

    res.status(201).json({ message: "Task created" })
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

    const tasks = await taskModel.find({
        userID: decode._id
    })
    res.status(200).json({ tasks })
}


export const _markCompletion = async (req: Request, res: Response): Promise<void> => {
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

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, userID: decode._id },
        { columnid: data.columnid },
        { new: true }
    )

    res.status(200).json({ task })
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

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, userID: decode._id },
        { taskname: data.newtaskname },
        { new: true }
    )

    res.status(200).json({ task })
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

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, columnid: data.columnid, userID: decode._id },
        { priority: data.priority },
        { new: true }
    )

    res.status(200).json({ task })
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

    const task = await taskModel.findOne({
        taskname: data.taskname as string,
        columnid: data.columnid as string,
        userID: decode._id
    })

    if (task?.priority) {
        res.status(200).json(task.priority)
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

    const task = await taskModel.findOneAndUpdate(
        { taskname: data.taskname, columnid: data.columnid, userID: decode._id },
        { date: data.date },
        { new: true }
    )

    res.status(200).json({ task })
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

    const task = await taskModel.findOne({
        taskname: data.taskname as string,
        columnid: data.columnid as string,
        userID: decode._id
    })

    if (task?.date) {
        res.status(200).json(task.date)
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

    await taskModel.findOneAndDelete({
        taskname: data.taskname as string,
        columnid: data.columnid as string,
        userID: decode._id
    })

    res.status(200).json({ message: "Task deleted" })
}