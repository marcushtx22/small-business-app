"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
const connectDB = async () => {
    try {
        if (mongoose_1.default.connection.readyState >= 1) {
            return;
        }
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Handle connection events
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
process.on('SIGINT', async () => {
    await mongoose_1.default.connection.close();
    process.exit(0);
});
