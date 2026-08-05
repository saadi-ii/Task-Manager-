"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let cachedPromise = null;
const connectDB = () => {
    if (!cachedPromise) {
        const mongoURI = process.env.MONGODB_URI;
        cachedPromise = mongoose_1.default.connect(mongoURI).catch((err) => {
            cachedPromise = null;
            throw err;
        });
    }
    return cachedPromise;
};
exports.default = connectDB;
