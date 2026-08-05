"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._create = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const pad = (n) => String(n).padStart(2, "0");
const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const isDateInPast = (dateStr) => {
    if (!dateStr)
        return false;
    return dateStr < toYMD(new Date());
};
const _create = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    if (!data.taskname?.trim()) {
        res.status(400).json({ message: "Must write taskname" });
        return;
    }
    const isTaskInSuchColumnExist = await task_model_1.default.findOne({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: userId
    });
    if (isTaskInSuchColumnExist) {
        res.status(409).json({ message: "This task already exists in this column" });
        return;
    }
    const recurrence = "once";
    const date = data.deadLine;
    if (isDateInPast(date)) {
        res.status(400).json({ message: "Due date cannot be in the past" });
        return;
    }
    await task_model_1.default.create({
        userID: userId,
        columnid: data.columnid,
        columnname: data.columnname,
        taskname: data.taskname,
        description: data.description,
        priority: data.newPriority,
        date,
        recurrence,
    });
    res.status(201).json({ message: "Task created" });
};
exports._create = _create;
