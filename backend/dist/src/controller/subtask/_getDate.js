"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getDate = void 0;
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _getDate = async (req, res) => {
    const data = req.query;
    const userId = req.userId;
    const subtask = await subtask_model_1.default.findOne({
        subtaskname: data.subtaskname,
        taskid: data.taskid,
        userID: userId
    });
    if (subtask?.date) {
        res.status(200).json(subtask.date);
    }
    else {
        res.status(200).json("");
    }
};
exports._getDate = _getDate;
