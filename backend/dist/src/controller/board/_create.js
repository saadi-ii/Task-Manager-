"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._create = void 0;
const board_model_1 = __importDefault(require("../../model/board.model"));
const column_model_1 = __importDefault(require("../../model/column.model"));
const DEFAULT_COLUMNS = ["TO DO", "In Progress", "Completed"];
const _create = async (req, res) => {
    const { boardname, boarddescription } = req.body;
    const userId = req.userId;
    if (boardname === "" || !boardname) {
        res.status(400).json({ message: "Must write boardname" });
        return;
    }
    try {
        const isboardAlreadyExist = await board_model_1.default.findOne({
            boardname: boardname,
            userID: userId
        });
        if (isboardAlreadyExist) {
            res.status(409).json({ message: "You already have a board with this name. Please try a different name." });
            return;
        }
        const newBoard = await board_model_1.default.create({
            boardname: boardname,
            boarddescription: boarddescription,
            userID: userId
        });
        for (const columnname of DEFAULT_COLUMNS) {
            await column_model_1.default.create({
                boardid: String(newBoard._id),
                columnname,
                isDefault: true,
            });
        }
        res.status(201).json({ message: "board created", board: newBoard });
    }
    catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._create = _create;
