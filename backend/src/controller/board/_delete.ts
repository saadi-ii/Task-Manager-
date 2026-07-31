import { Request, Response } from "express"
import boardModel from "../../model/board.model"
import columnModel from "../../model/column.model"
import taskModel from "../../model/task.model"
import subtaskModel from "../../model/subtask.model"

export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    const userId = req.userId as string

    try {
        const boardId = data._id as string

        const board = await boardModel.findOne({ _id: boardId, userID: userId })

        if (!board) {
            res.status(404).json({ message: "Board not found" })
            return
        }

        if (board.isDefault) {
            res.status(403).json({ message: "Default boards cannot be deleted" })
            return
        }

        await boardModel.findOneAndDelete({ _id: boardId, userID: userId })

        const columns = await columnModel.find({ boardid: boardId })
        const columnIds = columns.map((column) => String(column._id))

        const tasks = await taskModel.find({ columnid: { $in: columnIds } })
        const taskIds = tasks.map((task) => String(task._id))

        await subtaskModel.deleteMany({ taskid: { $in: taskIds } })
        await taskModel.deleteMany({ columnid: { $in: columnIds } })
        await columnModel.deleteMany({ boardid: boardId })

        res.status(200).json({ message: "board deleted" })
    } catch {
        res.status(500).json({ message: "Internal server error" })
    }
}

