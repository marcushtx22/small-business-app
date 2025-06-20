import React, { useEffect, useState, useRef } from 'react';
import { BuilderComponent, useIsPreviewing, builder } from '@builder.io/react';
import { useNavigate } from 'react-router-dom';

interface BuilderPageProps {
  onSessionStart?: () => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onSessionStart }) => {
  const isPreviewing = useIsPreviewing();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(null);
  // ChatGPT chat box state
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log Builder.io configuration
    console.log('Builder.io API Key:', builder.apiKey);
    console.log('Builder.io Model:', 'page');
    console.log('Builder.io Content ID:', '49862c49247847edb30cba29e731c877');

    // Try to fetch content directly using fetch API
    fetch(`https://cdn.builder.io/api/v3/content/page/49862c49247847edb30cba29e731c877?apiKey=${builder.apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Builder.io Content:', data);
      setContent(data);
    })
    .catch(error => {
      console.error('Builder.io Error:', error);
    });
  }, []);

  const handleSessionStart = () => {
    if (onSessionStart) {
      onSessionStart();
    }
    // Navigate to the user's Builder.io page after session starts
    window.location.href = 'https://www.builder.my/page?model=page';
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatMessages(msgs => [...msgs, { role: 'user', content: userMessage }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const response = await fetch('/api/openai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, { role: 'user', content: userMessage }] })
      });
      const data = await response.json();
      if (!response.ok) {
        setChatMessages(msgs => [...msgs, { role: 'assistant', content: `Sorry, there was an error. Details: ${data.error || ''} ${data.details || ''}` }]);
      } else {
        setChatMessages(msgs => [...msgs, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      setChatMessages(msgs => [...msgs, { role: 'assistant', content: 'Sorry, there was an error.' }]);
    } finally {
      setChatLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <div className="builder-page">
      {content && (
        <BuilderComponent
          model="page"
          content={content}
          options={{
            includeRefs: true,
            cacheSeconds: 0
          }}
        />
      )}
      <button 
        className="start-session-button"
        onClick={handleSessionStart}
      >
        Start Session
      </button>
      {/* ChatGPT Chat Box */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 340,
        maxHeight: '60vh',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee', background: '#646cff', color: '#fff', fontWeight: 600 }}>ChatGPT Assistant</div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#fafaff' }}>
          {chatMessages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 12, textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              <div style={{
                display: 'inline-block',
                background: msg.role === 'user' ? '#646cff' : '#eee',
                color: msg.role === 'user' ? '#fff' : '#222',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                maxWidth: 220,
                wordBreak: 'break-word',
              }}>{msg.content}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleChatSubmit} style={{ display: 'flex', borderTop: '1px solid #eee', background: '#fff' }}>
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Ask ChatGPT..."
            style={{ flex: 1, border: 'none', outline: 'none', padding: '0.75rem', fontSize: 16, background: 'transparent' }}
            disabled={chatLoading}
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || chatLoading}
            style={{ background: '#646cff', color: '#fff', border: 'none', borderRadius: 0, padding: '0 1.25rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
          >
            {chatLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}; 