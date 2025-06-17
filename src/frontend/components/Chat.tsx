import React, { useState, useRef, useEffect } from 'react';
import { useAgent } from '../context/AgentContext';
import { LoadingSpinner } from './LoadingSpinner';
import { Message, AgentType } from '../../types';
import '../styles/Chat.css';

interface ChatProps {
  sessionId: string;
  activeAgents: AgentType[];
}

export const Chat: React.FC<ChatProps> = ({ sessionId, activeAgents }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isLoading,
    error,
    sendMessage
  } = useAgent();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(sessionId, message);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'agent-message'}`}
          >
            <div className="message-header">
              <span className="message-sender">
                {message.role === 'user' ? 'You' : message.agent || 'System'}
              </span>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message agent-message">
            <div className="message-header">
              <span className="message-sender">System</span>
            </div>
            <div className="message-content">
              <LoadingSpinner size="small" />
              <span>Agents are thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="message error-message">
            <div className="message-content">{error}</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="send-button"
        >
          {isLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
}; 