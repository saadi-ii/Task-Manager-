import boardModel from "../model/board.model"
import columnModel from "../model/column.model"
import { Recurrence } from "./recurrence"

const BOARD_TO_RECURRENCE: Record<string, Exclude<Recurrence, "once">> = {
    "Daily Tasks": "daily",
    "Weekly Tasks": "weekly",
    "Monthly Tasks": "monthly",
    "Yearly Tasks": "yearly",
}

const TODO_COLUMN_NAME = "TO DO"

export const deriveRecurrence = async (columnid: string): Promise<Recurrence> => {
    const column = await columnModel.findOne({ _id: columnid })
    if (!column || !column.isDefault || column.columnname !== TODO_COLUMN_NAME) {
        return "once"
    }

    const board = await boardModel.findOne({ _id: column.boardid })
    if (!board || !board.isDefault) return "once"

    return BOARD_TO_RECURRENCE[board.boardname] ?? "once"
}
