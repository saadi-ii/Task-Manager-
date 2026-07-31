import taskModel from "../model/task.model"
import columnModel from "../model/column.model"
import { endOfPeriod, isExpired, isRecurrence, Recurrence } from "./recurrence"

const TODO_COLUMN_NAME = "TO DO"

export const renewRecurringTasks = async (userId: string): Promise<void> => {
    const candidates = await taskModel.find({
        userID: userId,
        recurrence: { $in: ["daily", "weekly", "monthly", "yearly"] },
    })

    const expired = candidates.filter((t) => isExpired(t.date))
    if (expired.length === 0) return

    const currentColumnIds = Array.from(new Set(expired.map((t) => t.columnid)))
    const currentColumns = await columnModel.find({ _id: { $in: currentColumnIds } })
    const columnBoardMap = new Map(currentColumns.map((c) => [String(c._id), c.boardid]))

    const boardIds = Array.from(new Set(Array.from(columnBoardMap.values())))
    const todoColumns = await columnModel.find({
        boardid: { $in: boardIds },
        columnname: TODO_COLUMN_NAME,
    })
    const boardTodoMap = new Map(todoColumns.map((c) => [c.boardid, String(c._id)]))

    for (const task of expired) {
        if (!isRecurrence(task.recurrence) || task.recurrence === "once") continue
        const boardId = columnBoardMap.get(task.columnid)
        if (!boardId) continue
        const todoColumnId = boardTodoMap.get(boardId)
        if (!todoColumnId) continue

        task.columnid = todoColumnId
        task.columnname = TODO_COLUMN_NAME
        task.date = endOfPeriod(task.recurrence as Recurrence)
        await task.save()
    }
}
