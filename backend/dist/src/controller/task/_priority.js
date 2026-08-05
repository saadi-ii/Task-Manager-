"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._priority = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const _priority = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, columnid: data.columnid, userID: userId }, { priority: data.priority }, { new: true });
    res.status(200).json({ task });
};
exports._priority = _priority;
