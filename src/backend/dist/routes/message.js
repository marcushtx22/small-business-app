"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
exports.messageRouter = router;
// In-memory storage (replace with database in production)
const messages = new Map();
// Send a message
router.post('/', (req, res) => {
    const { sessionId, content } = req.body;
    if (!sessionId || !content) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    const message = {
        id: (0, uuid_1.v4)(),
        sessionId,
        content,
        role: 'user',
        timestamp: new Date()
    };
    const sessionMessages = messages.get(sessionId) || [];
    sessionMessages.push(message);
    messages.set(sessionId, sessionMessages);
    // TODO: Process message with AI agents and generate response
    const aiResponse = {
        id: (0, uuid_1.v4)(),
        sessionId,
        content: 'This is a mock AI response. Replace with actual AI processing.',
        role: 'assistant',
        timestamp: new Date()
    };
    sessionMessages.push(aiResponse);
    messages.set(sessionId, sessionMessages);
    res.status(201).json([message, aiResponse]);
});
// Get messages for a session
router.get('/session/:sessionId', (req, res) => {
    const sessionMessages = messages.get(req.params.sessionId) || [];
    res.json(sessionMessages);
});
