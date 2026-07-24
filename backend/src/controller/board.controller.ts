import { Request, Response } from "express"
import signUpModel from "../model/signup.model"
import boardModel from "../model/board.model"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config()


export const _create = async (req: Request, res: Response): Promise<void> => {
    const { boardname } = req.body
    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json({message:"Please SignUp First"})
        return
    }
    if (boardname==="" || !boardname) {
        res.status(400).json({message:"Must write boardname"})
        return
    }


    try {
        const decode = await jwt.verify(token, secret) as JwtPayload

        const isUserExist = await signUpModel.findOne({
            _id: decode._id
        })
        if (!isUserExist) {
            res.status(401).json({message:"Unauthorized: User not found"})
            return
        }

        const isboardAlreadyExist = await boardModel.findOne({
            boardname: boardname,
            userID: decode._id
        })

        if (isboardAlreadyExist) {
            res.status(409).json({message:"You already have a board with this name. Please try a different name."})
            return
        }

        await boardModel.create({
            boardname: boardname,
            userID: decode._id
        })

        res.status(201).json({ message: "board created" })
    } catch (error) {
        console.error("Board create error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}




export const _get = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json({message:"Please SignUp First"})
        return
    }
    try {
        const decode = await jwt.verify(token, secret) as JwtPayload
        const isUserExist = await signUpModel.findOne({
            _id: decode._id
        })
        if (!isUserExist) {
            res.status(401).json({message:"Unauthorized: User not found"})
            return
        }
        
        const boards = await boardModel.find({
            userID : decode._id
        })
        res.status(200).json({ boards })
    } catch (error) {
        console.error("Board get error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}





export const _delete = async (req: Request, res: Response): Promise<void> => {
    const data = req.query
    console.log("data");
    
    const token = req.cookies.token as string
    const secret = process.env.JWT_SECRET as string
    if (!token) {
        res.status(401).json({message:"Please SignUp First"})
        return
    }
    try {
        const decode = await jwt.verify(token, secret) as JwtPayload
        const isUserExist = await signUpModel.findOne({
            _id: decode._id
        })
        if (!isUserExist) {
            res.status(401).json({message:"Unauthorized: User not found"})
            return
        }    
        console.log("DELETE Request - Query:", req.query, "data._id:", data._id, "decode._id:", decode._id);
        
        const deletedBoard = await boardModel.findOneAndDelete({
            _id: data._id as string,
            userID: decode._id
        })
        console.log("Deleted board result:", deletedBoard);
        
        res.status(200).json({ message: "board deleted" })
    } catch (error) {
        console.error("Board delete error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

