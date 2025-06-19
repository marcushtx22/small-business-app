import { Session, Message, AgentType, StrategyReport, SessionResponse, StrategyReportResponse } from '../../types';

export class ApiService {
  private static baseUrl = import.meta.env.VITE_API_URL || '/api';

  static async startSession(userId: string, agents: AgentType[]): Promise<Session> {
    const response = await fetch(`${this.baseUrl}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, agents }),
    });
    if (!response.ok) throw new Error('Failed to start session');
    const data = await response.json();
    return data.session || data; // support both {session} and direct session response
  }

  static async sendMessage(sessionId: string, content: string): Promise<Message[]> {
    // Mock response
    const mockMessage: Message = {
      id: 'mock-message-' + Date.now(),
      sessionId,
      content,
      role: 'user',
      timestamp: new Date()
    };

    return [mockMessage];
  }

  static async getMessages(sessionId: string): Promise<Message[]> {
    // Mock response
    return [];
  }

  static async downloadStrategyReport(sessionId: string): Promise<StrategyReport> {
    // Mock response
    const mockReport: StrategyReport = {
      id: 'mock-report-' + Date.now(),
      sessionId,
      content: 'This is a mock strategy report.',
      createdAt: new Date(),
      insights: []
    };

    // Create a download link for the report
    const blob = new Blob([mockReport.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strategy-report-${sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return mockReport;
  }
} 