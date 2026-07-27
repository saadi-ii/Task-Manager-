import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import signUpModel from "../model/user.model"
import dotenv from "dotenv"
dotenv.config()

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.cookies?.token as string | undefined
    const secret = process.env.JWT_SECRET as string

    if (!token) {
        res.status(401).json({ message: "Please SignUp First" })
        return
    }

    try {
        const decode = jwt.verify(token, secret) as JwtPayload

        const isUserExist = await signUpModel.findOne({ _id: decode._id })
        if (!isUserExist) {
            res.status(401).json({ message: "Unauthorized: User not found" })
            return
        }

        req.userId = String(decode._id)
        next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" })
    }
}

export default authMiddleware
