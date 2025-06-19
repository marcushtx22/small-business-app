"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const session_1 = require("./routes/session");
const message_1 = require("./routes/message");
const report_1 = require("./routes/report");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const handler = app;
// Connect to MongoDB
(0, database_1.connectDB)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/sessions', session_1.sessionRouter);
app.use('/api/messages', message_1.messageRouter);
app.use('/api/reports', report_1.reportRouter);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// Remove app.listen for Vercel serverless
exports.default = handler;
module.exports = handler;
