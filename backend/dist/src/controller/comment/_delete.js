"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._delete = void 0;
const comment_model_1 = __importDefault(require("../../model/comment.model"));
const _delete = async (req, res) => {
    const userId = req.userId;
    const commentid = req.query.commentid;
    if (!commentid) {
        res.status(400).json({ message: "commentid is required" });
        return;
    }
    const comment = await comment_model_1.default.findOne({ _id: commentid });
    if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
    }
    if (comment.userID !== userId) {
        res.status(403).json({ message: "You can only delete your own comment" });
        return;
    }
    await comment_model_1.default.findOneAndDelete({ _id: commentid });
    res.status(200).json({ message: "Comment deleted" });
};
exports._delete = _delete;
