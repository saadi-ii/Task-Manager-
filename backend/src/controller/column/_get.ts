import { Request, Response } from "express"
import columnModel from "../../model/column.model"
import boardModel from "../../model/board.model"

export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    const boardid = req.query.boardid as string | undefined

    if (boardid) {
        const columns = await columnModel.find({ boardid })
        res.status(200).json({ columns })
        return
    }

    const boards = await boardModel.find({ userID: userId })
    const boardIds = boards.map((b) => String(b._id))
    const columns = await columnModel.find({ boardid: { $in: boardIds } })
    res.status(200).json({ columns })
}
