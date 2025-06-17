import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import {
  Session,
  Message,
  AgentType,
  SessionStartRequest,
  AgentRespondRequest,
  StrategyReport,
  SessionResponse,
  StrategyReportResponse
} from './types.js';
import { generateStrategyReport } from './services/openai.js';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const sessions: Map<string, Session> = new Map();

app.post('/api/sessions', async (req, res) => {
  try {
    const { userId, agents }: SessionStartRequest = req.body;

    if (!userId || !agents || !Array.isArray(agents) || agents.length !== 5) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const session: Session = {
      id: uuidv4(),
      userId,
      activeAgents: agents,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    sessions.set(session.id, session);

    const response: SessionResponse = {
      session,
      messages: []
    };

    res.json(response);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sessions/:sessionId/messages', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { content }: AgentRespondRequest = req.body;

    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      sessionId,
      role: 'user',
      content,
      timestamp: new Date()
    };

    // Add user message to session
    session.messages.push(userMessage);

    // Generate agent responses
    const agentResponses = await Promise.all(
      session.activeAgents.map(async (agent) => {
        const response: Message = {
          id: uuidv4(),
          sessionId,
          role: 'agent',
          agent,
          content: `Response from ${agent}: ${content}`,
          timestamp: new Date()
        };
        session.messages.push(response);
        return response;
      })
    );

    const response: SessionResponse = {
      session,
      messages: [userMessage, ...agentResponses]
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/sessions/:sessionId/messages', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session.messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/sessions/:sessionId/report', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const messages = session.messages.map(msg => `${msg.agent || 'User'}: ${msg.content}`);
    const report = await generateStrategyReport(messages, session.activeAgents);

    const strategyReport: StrategyReport = {
      id: uuidv4(),
      sessionId,
      content: report,
      insights: [
        'Business growth opportunity identified',
        'Customer engagement strategy recommended',
        'Operational efficiency improvement suggested'
      ],
      createdAt: new Date()
    };

    const response: StrategyReportResponse = {
      report: strategyReport
    };

    res.json(response);
  } catch (error) {
    console.error('Error generating strategy report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 