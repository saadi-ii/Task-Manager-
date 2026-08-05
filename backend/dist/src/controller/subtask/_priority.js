"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._priority = void 0;
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _priority = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    const subtask = await subtask_model_1.default.findOneAndUpdate({ subtaskname: data.subtaskname, taskid: data.taskid, userID: userId }, { priority: data.priority }, { new: true });
    res.status(200).json({ subtask });
};
exports._priority = _priority;
