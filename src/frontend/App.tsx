import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Chat } from './components/Chat';
import { BuilderPage } from './components/BuilderPage';
import { AgentProvider, useAgent } from './context/AgentContext';
import { AgentType } from '../types';
import './styles/App.css';
import './styles/components.css';

const Dashboard: React.FC = () => {
  const {
    session,
    isLoading,
    error,
    downloadStrategyReport
  } = useAgent();

  return (
    <div className="app-container">
      <div className="header">
        <h1>AI Agent Platform</h1>
        {session && (
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
        )}
      </div>
      <Chat sessionId={session?.id || 'default-session'} activeAgents={session?.activeAgents || []} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AgentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </AgentProvider>
    </ErrorBoundary>
  );
};

export default App; 