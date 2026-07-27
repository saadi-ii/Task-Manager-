"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports._get = exports._create = void 0;
const signup_model_1 = __importDefault(require("../model/signup.model"));
const board_model_1 = __importDefault(require("../model/board.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const _create = async (req, res) => {
    const { boardname } = req.body;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json({ message: "Please SignUp First" });
        return;
    }
    if (boardname === "" || !boardname) {
        res.status(400).json({ message: "Must write boardname" });
        return;
    }
    try {
        const decode = await jsonwebtoken_1.default.verify(token, secret);
        const isUserExist = await signup_model_1.default.findOne({
            _id: decode._id
        });
        if (!isUserExist) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }
        const isboardAlreadyExist = await board_model_1.default.findOne({
            boardname: boardname,
            userID: decode._id
        });
        if (isboardAlreadyExist) {
            res.status(409).json({ message: "You already have a board with this name. Please try a different name." });
            return;
        }
        await board_model_1.default.create({
            boardname: boardname,
            userID: decode._id
        });
        res.status(201).json({ message: "board created" });
    }
    catch (error) {
        console.error("Board create error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._create = _create;
const _get = async (req, res) => {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json({ message: "Please SignUp First" });
        return;
    }
    try {
        const decode = await jsonwebtoken_1.default.verify(token, secret);
        const isUserExist = await signup_model_1.default.findOne({
            _id: decode._id
        });
        if (!isUserExist) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }
        const boards = await board_model_1.default.find({
            userID: decode._id
        });
        res.status(200).json({ boards });
    }
    catch (error) {
        console.error("Board get error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._get = _get;
const _delete = async (req, res) => {
    const data = req.query;
    console.log("data");
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json({ message: "Please SignUp First" });
        return;
    }
    try {
        const decode = await jsonwebtoken_1.default.verify(token, secret);
        const isUserExist = await signup_model_1.default.findOne({
            _id: decode._id
        });
        if (!isUserExist) {
            res.status(401).json({ message: "Unauthorized: User not found" });
            return;
        }
        console.log("DELETE Request - Query:", req.query, "data._id:", data._id, "decode._id:", decode._id);
        const deletedBoard = await board_model_1.default.findOneAndDelete({
            _id: data._id,
            userID: decode._id
        });
        console.log("Deleted board result:", deletedBoard);
        res.status(200).json({ message: "board deleted" });
    }
    catch (error) {
        console.error("Board delete error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports._delete = _delete;
