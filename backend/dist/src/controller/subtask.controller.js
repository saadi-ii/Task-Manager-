"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = exports._getDate = exports._date = exports._getPriority = exports._priority = exports._rename = exports._get = exports._create = void 0;
const subtask_model_1 = __importDefault(require("../model/subtask.model"));
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
    if (!data.subtaskname?.trim()) {
        res.status(400).json({ message: "Must write sub-task name" });
        return;
    }
    const isSubtaskAlreadyExist = await subtask_model_1.default.findOne({
        taskid: data.taskid,
        subtaskname: data.subtaskname,
        userID: decode._id
    });
    if (isSubtaskAlreadyExist) {
        res.status(409).json({ message: "A sub-task with this name already exists in this task" });
        return;
    }
    await subtask_model_1.default.create({
        taskid: data.taskid,
        subtaskname: data.subtaskname,
        userID: decode._id
    });
    res.status(201).json({ message: "Subtask created" });
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
    const subtasks = await subtask_model_1.default.find({
        userID: decode._id
    });
    res.status(200).json({ subtasks });
};
exports._get = _get;
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
    const subtask = await subtask_model_1.default.findOneAndUpdate({ subtaskname: data.subtaskname, taskid: data.taskid, userID: decode._id }, { subtaskname: data.newsubtaskname }, { new: true });
    res.status(200).json({ subtask });
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
    const subtask = await subtask_model_1.default.findOneAndUpdate({ subtaskname: data.subtaskname, taskid: data.taskid, userID: decode._id }, { priority: data.priority }, { new: true });
    res.status(200).json({ subtask });
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
    const subtask = await subtask_model_1.default.findOne({
        subtaskname: data.subtaskname,
        taskid: data.taskid,
        userID: decode._id
    });
    if (subtask?.priority) {
        res.status(200).json(subtask.priority);
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
    const subtask = await subtask_model_1.default.findOneAndUpdate({ subtaskname: data.subtaskname, taskid: data.taskid, userID: decode._id }, { date: data.date }, { new: true });
    res.status(200).json({ subtask });
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
    const subtask = await subtask_model_1.default.findOne({
        subtaskname: data.subtaskname,
        taskid: data.taskid,
        userID: decode._id
    });
    if (subtask?.date) {
        res.status(200).json(subtask.date);
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
    await subtask_model_1.default.findOneAndDelete({
        subtaskname: data.subtaskname,
        taskid: data.taskid,
        userID: decode._id
    });
    res.status(200).json({ message: "Subtask deleted" });
};
exports._delete = _delete;
