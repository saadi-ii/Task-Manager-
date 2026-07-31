import boardModel from "../model/board.model"
import columnModel from "../model/column.model"

const DEFAULT_BOARDS = [
    ["Daily Tasks","Manage and track tasks that need to be completed today."],
    ["Weekly Tasks","Plan and organize goals and priorities for the current week."],
    ["Monthly Tasks","Monitor recurring tasks, projects, and objectives for the month."],
    ["Yearly Tasks","Track long-term goals, milestones, and annual achievements."],
]

const DEFAULT_COLUMNS = ["TO DO", "In Progress", "Completed"]

export const createDefaultBoards = async (userId: string): Promise<void> => {
    for (const boardname of DEFAULT_BOARDS) {
        const board = await boardModel.create({
            boardname:boardname[0],
            boarddescription:boardname[1],
            userID: userId,
            isDefault: true,
        })

        for (const columnname of DEFAULT_COLUMNS) {
            await columnModel.create({
                boardid: String(board._id),
                columnname,
                isDefault: true,
            })
        }
    }
}
