import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const AgentSelection: React.FC<{ onSessionStart: () => void }> = ({ onSessionStart }) => {
  const {
    selectedAgents,
    isLoading,
    error,
    selectAgent,
    startSession
  } = useAgent();

  const handleSessionStart = () => {
    if (selectedAgents.length === 5) {
      startSession('user123').then(() => {
        onSessionStart();
      });
    }
  };

  return (
    <div className="agent-selection">
      <h2>Select 5 Agents</h2>
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
      <button
        className="start-session-button"
        onClick={handleSessionStart}
        disabled={selectedAgents.length !== 5 || isLoading}
      >
        {isLoading ? 'Starting Session...' : 'Start Session'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const {
    session,
    isLoading,
    error,
    downloadStrategyReport
  } = useAgent();

  if (!session) {
    return <AgentSelection onSessionStart={() => {}} />;
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

const App: React.FC = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <ErrorBoundary>
      <AgentProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                showBuilder
                  ? <BuilderPage onSessionStart={() => setShowBuilder(false)} />
                  : <AgentSelection onSessionStart={() => setShowBuilder(true)} />
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </AgentProvider>
    </ErrorBoundary>
  );
};

export default App; 