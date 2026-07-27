"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports._getDate = exports._date = exports._getPriority = exports._priority = exports._rename = exports._markCompletion = exports._get = exports._create = void 0;
const task_model_1 = __importDefault(require("../model/task.model"));
const signup_model_1 = __importDefault(require("../model/signup.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _create = async (req, res) => {
    const data = req.body;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    if (!data.taskname?.trim()) {
        res.status(400).json({ message: "Must write taskname" });
        return;
    }
    const isTaskInSuchColumnExist = await task_model_1.default.findOne({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: decode._id
    });
    if (isTaskInSuchColumnExist) {
        res.status(409).json({ message: "This task already exists in this column" });
        return;
    }
    await task_model_1.default.create({
        columnid: data.columnid,
        taskname: data.taskname,
        userID: decode._id
    });
    res.status(201).json({ message: "Task created" });
};
exports._create = _create;
const _get = async (req, res) => {
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const tasks = await task_model_1.default.find({
        userID: decode._id
    });
    res.status(200).json({ tasks });
};
exports._get = _get;
const _markCompletion = async (req, res) => {
    const data = req.body;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, userID: decode._id }, { columnid: data.columnid }, { new: true });
    res.status(200).json({ task });
};
exports._markCompletion = _markCompletion;
const _rename = async (req, res) => {
    const data = req.body;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, userID: decode._id }, { taskname: data.newtaskname }, { new: true });
    res.status(200).json({ task });
};
exports._rename = _rename;
const _priority = async (req, res) => {
    const data = req.body;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, columnid: data.columnid, userID: decode._id }, { priority: data.priority }, { new: true });
    res.status(200).json({ task });
};
exports._priority = _priority;
const _getPriority = async (req, res) => {
    const data = req.query;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const task = await task_model_1.default.findOne({
        taskname: data.taskname,
        columnid: data.columnid,
        userID: decode._id
    });
    if (task?.priority) {
        res.status(200).json(task.priority);
    }
    else {
        res.status(200).json("");
    }
};
exports._getPriority = _getPriority;
const _date = async (req, res) => {
    const data = req.body;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const task = await task_model_1.default.findOneAndUpdate({ taskname: data.taskname, columnid: data.columnid, userID: decode._id }, { date: data.date }, { new: true });
    res.status(200).json({ task });
};
exports._date = _date;
const _getDate = async (req, res) => {
    const data = req.query;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    const task = await task_model_1.default.findOne({
        taskname: data.taskname,
        columnid: data.columnid,
        userID: decode._id
    });
    if (task?.date) {
        res.status(200).json(task.date);
    }
    else {
        res.status(200).json("");
    }
};
exports._getDate = _getDate;
const _delete = async (req, res) => {
    const data = req.query;
    const token = req.cookies.token;
    const secret = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json("Please SignUp First");
        return;
    }
    const decode = await jsonwebtoken_1.default.verify(token, secret);
    const isUserExist = await signup_model_1.default.findOne({
        _id: decode._id
    });
    if (!isUserExist) {
        res.status(401).json("Unauthorized");
        return;
    }
    await task_model_1.default.findOneAndDelete({
        taskname: data.taskname,
        columnid: data.columnid,
        userID: decode._id
    });
    res.status(200).json({ message: "Task deleted" });
};
exports._delete = _delete;
