import userModel from "../../model/user.model"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import dotenv from 'dotenv';
dotenv.config()



export const _signout = async(req:Request, res:Response):Promise<void> => {
    res.clearCookie("token");
    res.status(201).json({message:"Logout Successfully"})
}