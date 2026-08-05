"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._date = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const pad = (n) => String(n).padStart(2, "0");
const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const isDateInPast = (dateStr) => {
    if (!dateStr)
        return false;
    return dateStr < toYMD(new Date());
};
const _date = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    if (isDateInPast(data.date)) {
        res.status(400).json({ message: "Due date cannot be in the past" });
        return;
    }
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, columnid: data.columnid, userID: userId }, { date: data.date }, { new: true });
    res.status(200).json({ task });
};
exports._date = _date;
