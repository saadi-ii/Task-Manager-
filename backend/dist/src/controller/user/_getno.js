"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getno = void 0;
const user_model_1 = __importDefault(require("../../model/user.model"));
const task_model_1 = __importDefault(require("../../model/task.model"));
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _getno = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await user_model_1.default.findOne({
            _id: userId
        });
        if (!user) {
            res.status(401).json({ message: "Incorrect cookie" });
            return;
        }
        const tasks = await task_model_1.default.find({
            userID: userId
        });
        const subtask = await subtask_model_1.default.find({
            userID: userId
        });
        let todo = 0;
        let progress = 0;
        let completed = 0;
        for (const key of tasks) {
            if (key.columnname === "TO DO") {
                todo++;
            }
            if (key.columnname === "In Progress") {
                progress++;
            }
            if (key.columnname === "Completed") {
                completed++;
            }
        }
        for (const key of subtask) {
            const taskkey = tasks.find(t => t._id.toString() === key.taskid);
            if (taskkey && taskkey.columnname === "TO DO") {
                todo++;
            }
            if (taskkey && taskkey.columnname === "In Progress") {
                progress++;
            }
            if (taskkey && taskkey.columnname === "Completed") {
                completed++;
            }
        }
        res.status(200).json({
            todo: todo,
            progress: progress,
            completed: completed
        });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._getno = _getno;
