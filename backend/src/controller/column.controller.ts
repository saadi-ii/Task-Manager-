import { Request, Response } from "express"
import signUpModel from "../model/user.model"
import columnModel from "../model/column.model"
import taskModel from "../model/task.model"
import subtaskModel from "../model/subtask.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()


export const _create = async (req: Request, res: Response): Promise<void> => {
    const { columnname,boardid } = req.body
    try {
        const isColumnAlreadyExist = await columnModel.findOne({
            columnname: columnname,
            boardid:boardid
        })

        if (isColumnAlreadyExist) {
            res.status(409).json({ message: "Column with this name already exists" })
            return
        }

        await columnModel.create({
            boardid:boardid,
            columnname: columnname
        })

        res.status(201).json({ message: "Column created" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}




export const _get = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    
    const columns = await columnModel.find({
        boardid: data.boardid as string,
    })
    res.status(200).json({ columns })
}





export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query

    try {
        const deletedColumn = await columnModel.findOneAndDelete({
            columnname: data.columnname as string,
            boardid: data.boardid as string,
        })

        if (!deletedColumn) {
            res.status(404).json({ message: "Column not found" })
            return
        }

        const columnId = String(deletedColumn._id)

        const tasks = await taskModel.find({ columnid: columnId })
        const taskIds = tasks.map((task) => String(task._id))

        await subtaskModel.deleteMany({ taskid: { $in: taskIds } })
        await taskModel.deleteMany({ columnid: columnId })

        res.status(200).json({ message: "Column deleted" })
    } catch (error) {
        console.error("Column delete error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

