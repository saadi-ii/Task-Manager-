import { Request, Response } from "express"
import columnModel from "../../model/column.model"
import taskModel from "../../model/task.model"
import subtaskModel from "../../model/subtask.model"

export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query

    try {
        const column = await columnModel.findOne({
            columnname: data.columnname as string,
            boardid: data.boardid as string,
        })

        if (!column) {
            res.status(404).json({ message: "Column not found" })
            return
        }

        if (column.isDefault) {
            res.status(403).json({ message: "Default columns cannot be deleted" })
            return
        }

        await columnModel.findOneAndDelete({
            columnname: data.columnname as string,
            boardid: data.boardid as string,
        })

        const columnId = String(column._id)

        const tasks = await taskModel.find({ columnid: columnId })
        const taskIds = tasks.map((task) => String(task._id))

        await subtaskModel.deleteMany({ taskid: { $in: taskIds } })
        await taskModel.deleteMany({ columnid: columnId })

        res.status(200).json({ message: "Column deleted" })
    } catch {
        res.status(500).json({ message: "Internal server error" })
    }
}
