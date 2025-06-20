import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Chat } from './components/Chat';
import { AgentProvider, useAgent } from './context/AgentContext';
import { AgentType } from '../types';
import './styles/App.css';
import './styles/components.css';
import { BuilderComponent, builder } from '@builder.io/react';

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

builder.init('0355fc8dd8574bd582b6401e6e692b5b');

const App: React.FC = () => (
  <div className="builder-page">
    <BuilderComponent
      model="page"
      options={{
        includeRefs: true,
        cacheSeconds: 0,
        query: [
          {
            property: 'id',
            operator: 'is',
            value: '49862c49247847edb30cba29e731c877'
          }
        ]
      }}
    />
  </div>
);

export default App; 