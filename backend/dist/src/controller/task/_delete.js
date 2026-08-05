"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _delete = async (req, res) => {
    const data = req.query;
    const userId = req.userId;
    try {
        const deletedTask = await task_model_1.default.findOneAndDelete({
            taskname: data.taskname,
            columnid: data.columnid,
            userID: userId
        });
        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        await subtask_model_1.default.deleteMany({ taskid: String(deletedTask._id) });
        res.status(200).json({ message: "Task deleted" });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._delete = _delete;
