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
    <div className="agent-sidebar-container">
      <h2>Select 5 Agents</h2>
      <ul className="agent-vertical-list">
        {ALL_AGENTS.map(agent => (
          <li key={agent}>
            <button
              className={`agent-button ${selectedAgents.includes(agent) ? 'selected' : ''}`}
              onClick={() => selectAgent(agent)}
              disabled={selectedAgents.length >= 5 && !selectedAgents.includes(agent)}
            >
              {agent}
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-bottom">
        <button
          className="start-session-button"
          onClick={handleSessionStart}
          disabled={selectedAgents.length !== 5 || isLoading}
        >
          {isLoading ? 'Starting Session...' : 'Start Session'}
        </button>
        {error && <div className="error">{error}</div>}
      </div>
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

const HomePage: React.FC = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5fa' }}>
    <div style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.06)', zIndex: 2 }}>
      <AgentSelection onSessionStart={() => {}} />
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5fa' }}>
      <div style={{ background: '#fff', padding: '2.5rem 3rem', borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', minWidth: 320, textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Welcome to the AI Agent Platform</h1>
        <p style={{ fontSize: '1.1rem', color: '#444' }}>Select 5 agents from the sidebar and click <b>Start Session</b> to begin.</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AgentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<BuilderPage />} />
          </Routes>
        </Router>
      </AgentProvider>
    </ErrorBoundary>
  );
};

export default App; 