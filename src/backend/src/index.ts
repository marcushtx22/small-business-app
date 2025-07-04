import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { sessionRouter } from './routes/session';
import { messageRouter } from './routes/message';
import { reportRouter } from './routes/report';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const handler = app;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sessions', sessionRouter);
app.use('/api/messages', messageRouter);
app.use('/api/reports', reportRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Remove app.listen for Vercel serverless
export default handler;
module.exports = handler; 