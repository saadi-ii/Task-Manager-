"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._create = void 0;
const comment_model_1 = __importDefault(require("../../model/comment.model"));
const user_model_1 = __importDefault(require("../../model/user.model"));
const _create = async (req, res) => {
    const userId = req.userId;
    const { taskid, text } = req.body;
    if (!taskid || !text?.trim()) {
        res.status(400).json({ message: "taskid and text are required" });
        return;
    }
    const user = await user_model_1.default.findOne({ _id: userId });
    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const comment = await comment_model_1.default.create({
        taskid,
        userID: userId,
        username: user.username,
        text: text.trim(),
    });
    res.status(201).json({ comment });
};
exports._create = _create;
