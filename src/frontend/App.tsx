import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Chat } from './components/Chat';
import { BuilderPage } from './components/BuilderPage';
import { AgentProvider, useAgent } from './context/AgentContext';
import { AgentType } from '../types';
import './styles/App.css';
import './styles/components.css';

const ALL_AGENTS: AgentType[] = [
  'OpsBot',
  'FinanceFix',
  'SalesGenie',
  'SupportX',
  'BrandBuilder',
  'MarketMind',
  'GrowthGuru',
  'Visionary'
];

const AgentSelection: React.FC = () => {
  const {
    selectedAgents,
    isLoading,
    error,
    selectAgent,
    startSession
  } = useAgent();

  const handleSessionStart = () => {
    if (selectedAgents.length === 5) {
      startSession('user123');
    }
  };

  return (
    <div className="agent-selection">
      <BuilderPage onSessionStart={handleSessionStart} />
      <div className="agent-grid">
        {ALL_AGENTS.map(agent => (
          <button
            key={agent}
            className={`agent-button ${selectedAgents.includes(agent) ? 'selected' : ''}`}
            onClick={() => selectAgent(agent)}
            disabled={selectedAgents.length >= 5 && !selectedAgents.includes(agent)}
          >
            {agent}
          </button>
        ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

const MainApp: React.FC = () => {
  const {
    session,
    isLoading,
    error,
    downloadStrategyReport
  } = useAgent();

  if (!session) {
    return <AgentSelection />;
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>AI Agent Platform</h1>
        <button
          className="strategy-button"
          onClick={() => downloadStrategyReport(session.id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="small" />
              <span>Generating Report...</span>
            </>
          ) : (
            'Download Strategy Report'
          )}
        </button>
      </div>
      <Chat sessionId={session.id} activeAgents={session.activeAgents} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AgentProvider>
        <MainApp />
      </AgentProvider>
    </ErrorBoundary>
  );
}; 