import userModel from "../model/user.model"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import dotenv from 'dotenv';
dotenv.config()


export const _signup = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (isUserExist) {
        res.status(409).json({ message: "User already exist" })
        return
    }

    const hashed = await bcryptjs.hash(password, 10)

    const createUser = await userModel.create({
        username, email, password: hashed,
    })

    const token = await jwt.sign({
        _id: createUser._id,
    }, process.env.JWT_SECRET as string)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({ message: "Created Successfully" })
}





export const _signin = async (req: Request, res: Response): Promise<void> => {
    const {username,password} = req.body;
    
    const isUserExist = await userModel.findOne({
        $or: [
            { username:username }, 
            { email:username }
        ]
    })
    if (!isUserExist) {
        res.status(401).json({message:"Please user First"})
        return 
    }
    const verifyPassword = await bcryptjs.compare(password,isUserExist.password)
    if (!verifyPassword) {
        res.status(401).json({message:"Incorrect password"})
        return 
    }
    console.log(verifyPassword);
    
    

    const token = await jwt.sign({
        _id: isUserExist._id,
    }, process.env.JWT_SECRET as string)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({ username : isUserExist.username})
}



export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    try {
        const user = await userModel.findOne({
            _id: userId
        })
        if (!user) {
            res.status(401).json({message:"Incorrect cookie"})
            return 
        }
        res.status(200).json({ username : user.username})
    } catch (error) {
        console.error("Board get error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


export const _signout = async(req:Request, res:Response):Promise<void> => {
    res.clearCookie("token");
    res.status(201).json({message:"Logout Successfully"})
}