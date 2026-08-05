"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controller/comment/comment.controller");
const router = (0, express_1.Router)();
router.post("/create", comment_controller_1._create);
router.get("/get", comment_controller_1._get);
router.delete("/delete", comment_controller_1._delete);
exports.default = router;
