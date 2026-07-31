import { Request, Response } from "express"
import boardModel from "../../model/board.model"
import columnModel from "../../model/column.model"

const DEFAULT_COLUMNS = ["TO DO", "In Progress", "Completed"]

export const _create = async (req: Request, res: Response): Promise<void> => {
    const { boardname,boarddescription } = req.body
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

        const newBoard = await boardModel.create({
            boardname: boardname,
            boarddescription: boarddescription,
            userID: userId
        })

        for (const columnname of DEFAULT_COLUMNS) {
            await columnModel.create({
                boardid: String(newBoard._id),
                columnname,
                isDefault: true,
            })
        }

        res.status(201).json({ message: "board created", board: newBoard })
    } catch {
        res.status(500).json({ message: "Internal server error" })
    }
}
