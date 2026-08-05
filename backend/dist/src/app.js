"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const column_routes_1 = __importDefault(require("./routes/column.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const subtask_routes_1 = __importDefault(require("./routes/subtask.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const board_routes_1 = __importDefault(require("./routes/board.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const db_1 = __importDefault(require("./db/db"));
const app = (0, express_1.default)();
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(async (_req, _res, next) => {
    try {
        await (0, db_1.default)();
        next();
    }
    catch (err) {
        next(err);
    }
});
app.use("/user", user_routes_1.default);
app.use("/board", auth_middleware_1.default, board_routes_1.default);
app.use("/column", auth_middleware_1.default, column_routes_1.default);
app.use("/task", auth_middleware_1.default, task_routes_1.default);
app.use("/subtask", auth_middleware_1.default, subtask_routes_1.default);
app.use("/comment", auth_middleware_1.default, comment_routes_1.default);
exports.default = app;
