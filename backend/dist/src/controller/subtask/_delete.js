"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = void 0;
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _delete = async (req, res) => {
    const data = req.query;
    const userId = req.userId;
    await subtask_model_1.default.findOneAndDelete({
        subtaskname: data.subtaskname,
        taskid: data.taskid,
        userID: userId
    });
    res.status(200).json({ message: "Subtask deleted" });
};
exports._delete = _delete;
