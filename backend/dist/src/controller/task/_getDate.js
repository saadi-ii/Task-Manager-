"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getDate = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const _getDate = async (req, res) => {
    const data = req.query;
    const userId = req.userId;
    const task = await task_model_1.default.findOne({
        taskname: data.taskname,
        columnid: data.columnid,
        userID: userId
    });
    if (task?.date) {
        res.status(200).json(task.date);
    }
    else {
        res.status(200).json("");
    }
};
exports._getDate = _getDate;
