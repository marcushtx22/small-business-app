export type AgentType = 'marketing' | 'sales' | 'finance' | 'operations';

export interface Session {
  id: string;
  userId: string;
  activeAgents: AgentType[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  sessionId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface StrategyReport {
  id: string;
  sessionId: string;
  content: string;
  insights: string[];
  createdAt: Date;
} 