"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const column_controller_1 = require("../controller/column.controller");
const router = (0, express_1.Router)();
router.post("/create", column_controller_1._create);
router.get("/get", column_controller_1._get);
router.delete("/delete", column_controller_1._delete);
exports.default = router;
