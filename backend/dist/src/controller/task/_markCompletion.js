"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._markCompletion = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const _markCompletion = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    const movingTask = await task_model_1.default.findOne({ _id: data.taskid, userID: userId });
    if (!movingTask) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    const duplicateInTargetColumn = await task_model_1.default.findOne({
        columnid: data.columnid,
        taskname: movingTask.taskname,
        userID: userId,
        _id: { $ne: movingTask._id }
    });
    if (duplicateInTargetColumn) {
        res.status(409).json({ message: "A task with this name already exists in the target column" });
        return;
    }
    const task = await task_model_1.default.findOneAndUpdate({ _id: data.taskid, userID: userId }, { columnid: data.columnid, columnname: data.columnname }, { new: true });
    res.status(200).json({ task });
};
exports._markCompletion = _markCompletion;
