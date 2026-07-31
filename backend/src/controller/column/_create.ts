import { Request, Response } from "express"
import columnModel from "../../model/column.model"

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
