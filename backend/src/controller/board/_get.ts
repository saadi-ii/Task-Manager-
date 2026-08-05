import { Request, Response } from "express"
import boardModel from "../../model/board.model"
import columnModel from "../../model/column.model"
import taskModel from "../../model/task.model"

const TODO_COLUMN_NAME = "TO DO"

export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    try {

        const boards = await boardModel.find({ userID: userId })
        const boardIds = boards.map((b) => String(b._id))

        const todoColumns = await columnModel.find({
            boardid: { $in: boardIds },
            columnname: TODO_COLUMN_NAME,
        })
        const boardToTodoColumnId = new Map(todoColumns.map((c) => [c.boardid, String(c._id)]))
        const todoColumnIds = todoColumns.map((c) => String(c._id))

        const todoTasks = await taskModel.find({
            userID: userId,
            columnid: { $in: todoColumnIds },
        })

        const todoCountByColumn = new Map<string, number>()
        for (const t of todoTasks) {
            todoCountByColumn.set(t.columnid, (todoCountByColumn.get(t.columnid) ?? 0) + 1)
        }

        const boardsWithCount = boards.map((b) => {
            const columnId = boardToTodoColumnId.get(String(b._id))
            const todoCount = columnId ? (todoCountByColumn.get(columnId) ?? 0) : 0
            return {
                _id: b._id,
                boardname: b.boardname,
                boarddescription: b.boarddescription,
                isDefault: b.isDefault,
                todoCount,
            }
        })

        res.status(200).json({ boards: boardsWithCount })
    } catch {
        res.status(500).json({ message: "Internal server error" })
    }
}
