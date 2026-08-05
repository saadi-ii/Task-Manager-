"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json({ message: "Please SignUp First" });
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, secret);
        const isUserExist = await user_model_1.default.findOne({ _id: decode._id });
        if (!isUserExist) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }
        req.userId = String(decode._id);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
