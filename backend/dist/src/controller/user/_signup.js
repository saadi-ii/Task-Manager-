"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._signup = void 0;
const user_model_1 = __importDefault(require("../../model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const createDefaultBoards_1 = require("../../lib/createDefaultBoards");
dotenv_1.default.config();
const _signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!password || typeof password !== "string" || password.length < 8) {
            res.status(400).json({ message: "Password must be at least 8 characters" });
            return;
        }
        const isUserExist = await user_model_1.default.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if (isUserExist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await user_model_1.default.create({
            username,
            email,
            password: hashedPassword
        });
        try {
            await (0, createDefaultBoards_1.createDefaultBoards)(String(newUser._id));
        }
        catch {
            // no-op
        }
        const token = jsonwebtoken_1.default.sign({
            _id: newUser._id,
        }, process.env.JWT_SECRET);
        const isProd = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: isProd,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({ message: "User created successfully", username: newUser.username });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._signup = _signup;
