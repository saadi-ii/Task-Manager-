import userModel from "../../model/user.model"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import dotenv from 'dotenv';
import { createDefaultBoards } from "../../lib/createDefaultBoards";
dotenv.config()

export const _signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (!password || typeof password !== "string" || password.length < 8) {
            res.status(400).json({ message: "Password must be at least 8 characters" });
            return;
        }

        const isUserExist = await userModel.findOne({
            $or: [
                { username: username }, 
                { email: email }
            ]
        });

        if (isUserExist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        try {
            await createDefaultBoards(String(newUser._id));
        } catch {
            // no-op
        }

        const token = jwt.sign({
            _id: newUser._id,
        }, process.env.JWT_SECRET as string);

        const isProd = process.env.NODE_ENV === "production"
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: isProd,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: "User created successfully", username: newUser.username });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
}

