"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = void 0;
const board_model_1 = __importDefault(require("../../model/board.model"));
const column_model_1 = __importDefault(require("../../model/column.model"));
const task_model_1 = __importDefault(require("../../model/task.model"));
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _delete = async (req, res) => {
    const data = req.query;
    const userId = req.userId;
    try {
        const boardId = data._id;
        const board = await board_model_1.default.findOne({ _id: boardId, userID: userId });
        if (!board) {
            res.status(404).json({ message: "Board not found" });
            return;
        }
        if (board.isDefault) {
            res.status(403).json({ message: "Default boards cannot be deleted" });
            return;
        }
        await board_model_1.default.findOneAndDelete({ _id: boardId, userID: userId });
        const columns = await column_model_1.default.find({ boardid: boardId });
        const columnIds = columns.map((column) => String(column._id));
        const tasks = await task_model_1.default.find({ columnid: { $in: columnIds } });
        const taskIds = tasks.map((task) => String(task._id));
        await subtask_model_1.default.deleteMany({ taskid: { $in: taskIds } });
        await task_model_1.default.deleteMany({ columnid: { $in: columnIds } });
        await column_model_1.default.deleteMany({ boardid: boardId });
        res.status(200).json({ message: "board deleted" });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._delete = _delete;
