"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._signin = void 0;
const user_model_1 = __importDefault(require("../../model/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _signin = async (req, res) => {
    const { username, password } = req.body;
    const isUserExist = await user_model_1.default.findOne({
        $or: [
            { username: username },
            { email: username }
        ]
    });
    if (!isUserExist) {
        res.status(401).json({ message: "Please user First" });
        return;
    }
    const verifyPassword = await bcryptjs_1.default.compare(password, isUserExist.password);
    if (!verifyPassword) {
        res.status(401).json({ message: "Incorrect password" });
        return;
    }
    const token = await jsonwebtoken_1.default.sign({
        _id: isUserExist._id,
    }, process.env.JWT_SECRETJWT_SECRET);
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({ username: isUserExist.username });
};
exports._signin = _signin;
