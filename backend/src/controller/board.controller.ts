import { Request, Response } from "express"
import boardModel from "../model/board.model"
import columnModel from "../model/column.model"
import taskModel from "../model/task.model"
import subtaskModel from "../model/subtask.model"


export const _create = async (req: Request, res: Response): Promise<void> => {
    const { boardname } = req.body
    const userId = req.userId as string

    if (boardname === "" || !boardname) {
        res.status(400).json({ message: "Must write boardname" })
        return
    }

    try {
        const isboardAlreadyExist = await boardModel.findOne({
            boardname: boardname,
            userID: userId
        })

        if (isboardAlreadyExist) {
            res.status(409).json({ message: "You already have a board with this name. Please try a different name." })
            return
        }

        await boardModel.create({
            boardname: boardname,
            userID: userId
        })

        res.status(201).json({ message: "board created" })
    } catch (error) {
        console.error("Board create error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}




export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    try {
        const boards = await boardModel.find({
            userID: userId
        })
        res.status(200).json({ boards })
    } catch (error) {
        console.error("Board get error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}




export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    try {
        const boardId = data._id as string

        const deletedBoard = await boardModel.findOneAndDelete({
            _id: boardId,
            userID: userId
        })

        if (!deletedBoard) {
            res.status(404).json({ message: "Board not found" })
            return
        }

        const columns = await columnModel.find({ boardid: boardId })
        const columnIds = columns.map((column) => String(column._id))

        const tasks = await taskModel.find({ columnid: { $in: columnIds } })
        const taskIds = tasks.map((task) => String(task._id))

        await subtaskModel.deleteMany({ taskid: { $in: taskIds } })
        await taskModel.deleteMany({ columnid: { $in: columnIds } })
        await columnModel.deleteMany({ boardid: boardId })

        res.status(200).json({ message: "board deleted" })
    } catch (error) {
        console.error("Board delete error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
