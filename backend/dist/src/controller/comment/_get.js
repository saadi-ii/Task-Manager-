"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = void 0;
const comment_model_1 = __importDefault(require("../../model/comment.model"));
const _get = async (req, res) => {
    const taskid = req.query.taskid;
    if (!taskid) {
        res.status(400).json({ message: "taskid is required" });
        return;
    }
    const comments = await comment_model_1.default.find({ taskid }).sort({ createdAt: 1 });
    res.status(200).json({ comments });
};
exports._get = _get;
