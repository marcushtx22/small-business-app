import { Session, Message, AgentType, StrategyReport, SessionResponse, StrategyReportResponse } from '../../types';

export class ApiService {
  private static baseUrl = '/api';

  static async startSession(userId: string, agents: AgentType[]): Promise<Session> {
    const response = await fetch(`${this.baseUrl}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, agents }),
    });

    if (!response.ok) {
      throw new Error('Failed to start session');
    }

    const data: SessionResponse = await response.json();
    return data.session;
  }

  static async sendMessage(sessionId: string, content: string): Promise<Message[]> {
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data: SessionResponse = await response.json();
    return data.messages;
  }

  static async getMessages(sessionId: string): Promise<Message[]> {
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}/messages`);

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  }

  static async downloadStrategyReport(sessionId: string): Promise<StrategyReport> {
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}/report`);

    if (!response.ok) {
      throw new Error('Failed to generate strategy report');
    }

    const data: StrategyReportResponse = await response.json();
    const report = data.report;
    
    // Create a download link for the report
    const blob = new Blob([report.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `strategy-report-${sessionId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return report;
  }
} 