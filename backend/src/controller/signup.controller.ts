import signUpModel from "../model/signup.model"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import dotenv from 'dotenv';
dotenv.config()


export const _create = async (req: Request, res: Response): Promise<void> => {
    console.log("cookie", req.cookies)
    const { username, email, password } = req.body;
    const isUserExist = await signUpModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (isUserExist) {
        res.status(409).json({ message: "User already exist" })
        return
    }

    const hashed = await bcryptjs.hash(password, 10)

    const createUser = await signUpModel.create({
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

