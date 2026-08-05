"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user/user.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/signup", user_controller_1._signup);
router.post("/signin", user_controller_1._signin);
router.post("/signout", auth_middleware_1.default, user_controller_1._signout);
router.get("/get", auth_middleware_1.default, user_controller_1._get);
router.get("/getno", auth_middleware_1.default, user_controller_1._getno);
exports.default = router;
