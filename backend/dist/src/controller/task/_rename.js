"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._rename = void 0;
const task_model_1 = __importDefault(require("../../model/task.model"));
const _rename = async (req, res) => {
    const data = req.body;
    const userId = req.userId;
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, userID: userId }, { taskname: data.newtaskname }, { new: true });
    res.status(200).json({ task });
};
exports._rename = _rename;
