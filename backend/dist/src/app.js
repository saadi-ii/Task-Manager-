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
const signup_routes_1 = __importDefault(require("./routes/signup.routes"));
const board_routes_1 = __importDefault(require("./routes/board.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/signup", signup_routes_1.default);
app.use("/board", board_routes_1.default);
app.use("/column", column_routes_1.default);
app.use("/task", task_routes_1.default);
app.use("/subtask", subtask_routes_1.default);
exports.default = app;
