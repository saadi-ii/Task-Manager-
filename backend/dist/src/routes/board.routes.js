"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = require("../controller/board/board.controller");
const router = (0, express_1.Router)();
router.post("/create", board_controller_1._create);
router.get("/get", board_controller_1._get);
router.delete("/delete", board_controller_1._delete);
exports.default = router;
