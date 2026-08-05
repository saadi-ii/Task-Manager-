"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = void 0;
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _get = async (req, res) => {
    const userId = req.userId;
    const subtasks = await subtask_model_1.default.find({
        userID: userId
    });
    res.status(200).json({ subtasks });
};
exports._get = _get;
