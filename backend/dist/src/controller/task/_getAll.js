"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAll = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const comment_model_1 = __importDefault(require("../../model/comment.model"));
const _getAll = async (req, res) => {
    const userId = req.userId;
    const taskid = req.query.taskid;
    if (!taskid) {
        res.status(400).json({ message: "taskid is required" });
        return;
    }
    const task = await task_model_1.default.findOne({ _id: taskid, userID: userId });
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    const [subtasks, comments] = await Promise.all([
        subtask_model_1.default.find({ taskid }),
        comment_model_1.default.find({ taskid }).sort({ createdAt: 1 }),
    ]);
    res.status(200).json({ task, subtasks, comments });
};
exports._getAll = _getAll;
