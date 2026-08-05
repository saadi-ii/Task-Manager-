"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._signout = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _signout = async (req, res) => {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd,
        path: "/",
    });
    res.status(201).json({ message: "Logout Successfully" });
};
exports._signout = _signout;
