"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports._get = exports._create = void 0;
const column_model_1 = __importDefault(require("../model/column.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _create = async (req, res) => {
    const { columnname, boardid } = req.body;
    try {
        const isColumnAlreadyExist = await column_model_1.default.findOne({
            columnname: columnname,
            boardid: boardid
        });
        if (isColumnAlreadyExist) {
            res.status(409).json("Column with this name already exists");
            return;
        }
        await column_model_1.default.create({
            boardid: boardid,
            columnname: columnname
        });
        res.status(201).json({ message: "Column created" });
    }
    catch (error) {
        res.status(401).json(error);
    }
};
exports._create = _create;
const _get = async (req, res) => {
    const data = req.query;
    const columns = await column_model_1.default.find({
        boardid: data.boardid,
    });
    res.status(200).json({ columns });
};
exports._get = _get;
const _delete = async (req, res) => {
    const data = req.query;
    await column_model_1.default.findOneAndDelete({
        columnname: data.columnname,
        boardid: data.boardid,
    });
    res.status(200).json({ message: "Column deleted" });
};
exports._delete = _delete;
