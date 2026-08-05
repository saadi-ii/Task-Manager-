"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = void 0;
const column_model_1 = __importDefault(require("../../model/column.model"));
const board_model_1 = __importDefault(require("../../model/board.model"));
const _get = async (req, res) => {
    const userId = req.userId;
    const boardid = req.query.boardid;
    if (boardid) {
        const columns = await column_model_1.default.find({ boardid });
        res.status(200).json({ columns });
        return;
    }
    const boards = await board_model_1.default.find({ userID: userId });
    const boardIds = boards.map((b) => String(b._id));
    const columns = await column_model_1.default.find({ boardid: { $in: boardIds } });
    res.status(200).json({ columns });
};
exports._get = _get;
