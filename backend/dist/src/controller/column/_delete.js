"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = void 0;
const column_model_1 = __importDefault(require("../../model/column.model"));
const task_model_1 = __importDefault(require("../../model/task.model"));
const subtask_model_1 = __importDefault(require("../../model/subtask.model"));
const _delete = async (req, res) => {
    const data = req.query;
    try {
        const column = await column_model_1.default.findOne({
            columnname: data.columnname,
            boardid: data.boardid,
        });
        if (!column) {
            res.status(404).json({ message: "Column not found" });
            return;
        }
        if (column.isDefault) {
            res.status(403).json({ message: "Default columns cannot be deleted" });
            return;
        }
        await column_model_1.default.findOneAndDelete({
            columnname: data.columnname,
            boardid: data.boardid,
        });
        const columnId = String(column._id);
        const tasks = await task_model_1.default.find({ columnid: columnId });
        const taskIds = tasks.map((task) => String(task._id));
        await subtask_model_1.default.deleteMany({ taskid: { $in: taskIds } });
        await task_model_1.default.deleteMany({ columnid: columnId });
        res.status(200).json({ message: "Column deleted" });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._delete = _delete;
