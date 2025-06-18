import { Router } from 'express';
import { Session } from '../models/Session';
import { AgentType } from '../types';

const router = Router();

// Start a new session
router.post('/', async (req, res) => {
  const { userId, agents } = req.body;

  if (!userId || !Array.isArray(agents)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const session = new Session({
      userId,
      activeAgents: agents as AgentType[],
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session', details: error });
  }
});

// Get session by ID
router.get('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('messages');
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session', details: error });
  }
});

// Get all sessions for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const userSessions = await Session.find({ userId: req.params.userId }).populate('messages');
    res.json(userSessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user sessions', details: error });
  }
});

export { router as sessionRouter }; 