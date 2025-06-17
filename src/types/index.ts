export type AgentType = 
  | 'OpsBot'
  | 'FinanceFix'
  | 'SalesGenie'
  | 'SupportX'
  | 'BrandBuilder'
  | 'MarketMind'
  | 'GrowthGuru'
  | 'Visionary';

export interface Session {
  id: string;
  userId: string;
  activeAgents: AgentType[];
  strategyAgents: AgentType[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  sessionId: string;
  agentId: AgentType;
  content: string;
  timestamp: Date;
}

export interface StrategyReport {
  insights: string[];
  predictions: string[];
  newBusinessIdea: string;
}

export interface AgentResponse {
  content: string;
  timestamp: Date;
}

export interface SessionStartRequest {
  userId: string;
  selectedAgents: AgentType[];
}

export interface AgentRespondRequest {
  sessionId: string;
  agent: AgentType;
  message: string;
} 