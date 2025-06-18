import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';

const router = Router();

// In-memory storage (replace with database in production)
const messages: Map<string, Message[]> = new Map();

// Send a message
router.post('/', (req, res) => {
  const { sessionId, content } = req.body;

  if (!sessionId || !content) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const message: Message = {
    id: uuidv4(),
    sessionId,
    content,
    role: 'user',
    timestamp: new Date()
  };

  const sessionMessages = messages.get(sessionId) || [];
  sessionMessages.push(message);
  messages.set(sessionId, sessionMessages);

  // TODO: Process message with AI agents and generate response
  const aiResponse: Message = {
    id: uuidv4(),
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

export { router as messageRouter }; 