export type AgentType =
  | 'OpsBot'
  | 'FinanceFix'
  | 'SalesGenie'
  | 'SupportX'
  | 'BrandBuilder'
  | 'MarketMind'
  | 'GrowthGuru'
  | 'Visionary';

export interface Message {
  id: string;
  sessionId: string;
  role: 'user' | 'agent';
  agent?: AgentType;
  content: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  userId: string;
  activeAgents: AgentType[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StrategyReport {
  id: string;
  sessionId: string;
  content: string;
  insights: string[];
  createdAt: Date;
}

// Server-side types
export interface SessionStartRequest {
  userId: string;
  agents: AgentType[];
}

export interface AgentRespondRequest {
  sessionId: string;
  content: string;
}

export interface SessionResponse {
  session: Session;
  messages: Message[];
}

export interface StrategyReportResponse {
  report: StrategyReport;
} 