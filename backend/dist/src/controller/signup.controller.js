"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._create = void 0;
const signup_model_1 = __importDefault(require("../model/signup.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _create = async (req, res) => {
    console.log("cookie", req.cookies);
    const { username, email, password } = req.body;
    const isUserExist = await signup_model_1.default.findOne({
        $or: [
            { username }, { email }
        ]
    });
    if (isUserExist) {
        res.status(409).json({ message: "User already exist" });
        return;
    }
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const createUser = await signup_model_1.default.create({
        username, email, password: hashed,
    });
    const token = await jsonwebtoken_1.default.sign({
        _id: createUser._id,
    }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({ message: "Created Successfully" });
};
exports._create = _create;
