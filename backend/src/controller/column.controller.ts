import { Request, Response } from "express"
import signUpModel from "../model/signup.model"
import columnModel from "../model/column.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()


export const _create = async (req: Request, res: Response): Promise<void> => {
    const { columnname,boardid } = req.body
    try {
        const isColumnAlreadyExist = await columnModel.findOne({
            columnname: columnname,
            boardid:boardid
        })

        if (isColumnAlreadyExist) {
            res.status(409).json("Column with this name already exists")
            return
        }

        await columnModel.create({
            boardid:boardid,
            columnname: columnname
        })

        res.status(201).json({ message: "Column created" })
    } catch (error) {
        res.status(401).json(error)
    }
}




export const _get = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    
    const columns = await columnModel.find({
        boardid: data.boardid as string,
    })
    res.status(200).json({ columns })
}





export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query

    await columnModel.findOneAndDelete({
        columnname: data.columnname as string,
        boardid:data.boardid as string,
    })
    
    
    res.status(200).json({ message: "Column deleted" })
}

