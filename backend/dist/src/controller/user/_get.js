"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = void 0;
const user_model_1 = __importDefault(require("../../model/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _get = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await user_model_1.default.findOne({
            _id: userId
        });
        if (!user) {
            res.status(401).json({ message: "Incorrect cookie" });
            return;
        }
        res.status(200).json({ username: user.username, email: user.email });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._get = _get;
