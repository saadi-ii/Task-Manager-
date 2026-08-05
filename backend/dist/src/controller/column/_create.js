"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._create = void 0;
const column_model_1 = __importDefault(require("../../model/column.model"));
const _create = async (req, res) => {
    const { columnname, boardid } = req.body;
    try {
        const isColumnAlreadyExist = await column_model_1.default.findOne({
            columnname: columnname,
            boardid: boardid
        });
        if (isColumnAlreadyExist) {
            res.status(409).json({ message: "Column with this name already exists" });
            return;
        }
        await column_model_1.default.create({
            boardid: boardid,
            columnname: columnname
        });
        res.status(201).json({ message: "Column created" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._create = _create;
