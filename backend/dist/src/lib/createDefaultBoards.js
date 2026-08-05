"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultBoards = void 0;
const board_model_1 = __importDefault(require("../model/board.model"));
const column_model_1 = __importDefault(require("../model/column.model"));
const DEFAULT_BOARDS = [
    ["Daily Tasks", "Manage and track tasks that need to be completed today."],
    ["Weekly Tasks", "Plan and organize goals and priorities for the current week."],
    ["Monthly Tasks", "Monitor recurring tasks, projects, and objectives for the month."],
    ["Yearly Tasks", "Track long-term goals, milestones, and annual achievements."],
];
const DEFAULT_COLUMNS = ["TO DO", "In Progress", "Completed"];
const createDefaultBoards = async (userId) => {
    for (const boardname of DEFAULT_BOARDS) {
        const board = await board_model_1.default.create({
            boardname: boardname[0],
            boarddescription: boardname[1],
            userID: userId,
            isDefault: true,
        });
        for (const columnname of DEFAULT_COLUMNS) {
            await column_model_1.default.create({
                boardid: String(board._id),
                columnname,
                isDefault: true,
            });
        }
    }
};
exports.createDefaultBoards = createDefaultBoards;
