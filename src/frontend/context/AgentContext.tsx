import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Session, Message, AgentType } from '../../types';
import { ApiService } from '../services/api';

interface AgentState {
  session: Session | null;
  messages: Message[];
  selectedAgents: AgentType[];
  isLoading: boolean;
  error: string | null;
}

type AgentAction =
  | { type: 'SET_SESSION'; payload: Session }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SELECT_AGENT'; payload: AgentType }
  | { type: 'DESELECT_AGENT'; payload: AgentType }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_SESSION' };

const initialState: AgentState = {
  session: null,
  messages: [],
  selectedAgents: [],
  isLoading: false,
  error: null,
};

const agentReducer = (state: AgentState, action: AgentAction): AgentState => {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, session: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SELECT_AGENT':
      return {
        ...state,
        selectedAgents: state.selectedAgents.includes(action.payload)
          ? state.selectedAgents
          : [...state.selectedAgents, action.payload],
      };
    case 'DESELECT_AGENT':
      return {
        ...state,
        selectedAgents: state.selectedAgents.filter(agent => agent !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_SESSION':
      return initialState;
    default:
      return state;
  }
};

interface AgentContextType {
  session: Session | null;
  messages: Message[];
  selectedAgents: AgentType[];
  isLoading: boolean;
  error: string | null;
  startSession: (userId: string) => Promise<void>;
  sendMessage: (sessionId: string, content: string) => Promise<void>;
  downloadStrategyReport: (sessionId: string) => Promise<void>;
  selectAgent: (agent: AgentType) => void;
  resetSession: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(agentReducer, initialState);

  const startSession = async (userId: string) => {
    if (state.selectedAgents.length === 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please select at least one agent' });
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const session = await ApiService.startSession(userId, state.selectedAgents);
      dispatch({ type: 'SET_SESSION', payload: session });
      dispatch({ type: 'SET_MESSAGES', payload: [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to start session' });
      console.error('Error starting session:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const sendMessage = async (sessionId: string, content: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const messages = await ApiService.sendMessage(sessionId, content);
      dispatch({ type: 'SET_MESSAGES', payload: messages });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send message' });
      console.error('Error sending message:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const downloadStrategyReport = async (sessionId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await ApiService.downloadStrategyReport(sessionId);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to generate strategy report' });
      console.error('Error generating strategy report:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const selectAgent = (agent: AgentType) => {
    if (state.selectedAgents.includes(agent)) {
      dispatch({ type: 'DESELECT_AGENT', payload: agent });
    } else {
      dispatch({ type: 'SELECT_AGENT', payload: agent });
    }
  };

  const resetSession = () => {
    dispatch({ type: 'RESET_SESSION' });
  };

  return (
    <AgentContext.Provider
      value={{
        ...state,
        startSession,
        sendMessage,
        downloadStrategyReport,
        selectAgent,
        resetSession,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}; 