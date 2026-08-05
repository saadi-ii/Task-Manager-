"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._create = void 0;
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _create = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    if (!data.subtaskname?.trim()) {
        res.status(400).json({ message: "Must write sub-task name" });
        return;
    }
    const isSubtaskAlreadyExist = await subtask_model_1.default.findOne({
        taskid: data.taskid,
        subtaskname: data.subtaskname,
        userID: userId
    });
    if (isSubtaskAlreadyExist) {
        res.status(409).json({ message: "A sub-task with this name already exists in this task" });
        return;
    }
    await subtask_model_1.default.create({
        taskid: data.taskid,
        subtaskname: data.subtaskname,
        userID: userId
    });
    res.status(201).json({ message: "Subtask created" });
};
exports._create = _create;
