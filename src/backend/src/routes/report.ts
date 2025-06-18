import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StrategyReport } from '../types';

const router = Router();

// In-memory storage (replace with database in production)
const reports: Map<string, StrategyReport> = new Map();

// Generate a strategy report
router.post('/generate', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // TODO: Generate actual report content based on session data
  const report: StrategyReport = {
    id: uuidv4(),
    sessionId,
    content: 'This is a mock strategy report. Replace with actual report generation.',
    insights: [
      'Mock insight 1',
      'Mock insight 2',
      'Mock insight 3'
    ],
    createdAt: new Date()
  };

  reports.set(report.id, report);
  res.status(201).json(report);
});

// Get report by ID
router.get('/:id', (req, res) => {
  const report = reports.get(req.params.id);
  
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  res.json(report);
});

// Get reports for a session
router.get('/session/:sessionId', (req, res) => {
  const sessionReports = Array.from(reports.values())
    .filter(report => report.sessionId === req.params.sessionId);
  
  res.json(sessionReports);
});

export { router as reportRouter }; 