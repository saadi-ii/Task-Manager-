"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = void 0;
const board_model_1 = __importDefault(require("../../model/board.model"));
const column_model_1 = __importDefault(require("../../model/column.model"));
const task_model_1 = __importDefault(require("../../model/task.model"));
const TODO_COLUMN_NAME = "TO DO";
const _get = async (req, res) => {
    const userId = req.userId;
    try {
        const boards = await board_model_1.default.find({ userID: userId });
        const boardIds = boards.map((b) => String(b._id));
        const todoColumns = await column_model_1.default.find({
            boardid: { $in: boardIds },
            columnname: TODO_COLUMN_NAME,
        });
        const boardToTodoColumnId = new Map(todoColumns.map((c) => [c.boardid, String(c._id)]));
        const todoColumnIds = todoColumns.map((c) => String(c._id));
        const todoTasks = await task_model_1.default.find({
            userID: userId,
            columnid: { $in: todoColumnIds },
        });
        const todoCountByColumn = new Map();
        for (const t of todoTasks) {
            todoCountByColumn.set(t.columnid, (todoCountByColumn.get(t.columnid) ?? 0) + 1);
        }
        const boardsWithCount = boards.map((b) => {
            const columnId = boardToTodoColumnId.get(String(b._id));
            const todoCount = columnId ? (todoCountByColumn.get(columnId) ?? 0) : 0;
            return {
                _id: b._id,
                boardname: b.boardname,
                boarddescription: b.boarddescription,
                isDefault: b.isDefault,
                todoCount,
            };
        });
        res.status(200).json({ boards: boardsWithCount });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._get = _get;
