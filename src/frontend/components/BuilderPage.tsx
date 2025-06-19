import React, { useEffect, useState } from 'react';
import { BuilderComponent, useIsPreviewing, builder } from '@builder.io/react';
import { useNavigate } from 'react-router-dom';

interface BuilderPageProps {
  onSessionStart?: () => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onSessionStart }) => {
  const isPreviewing = useIsPreviewing();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(null);

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

    // Listen for custom event from Builder.io menu button
    const handler = () => navigate('/dashboard');
    window.addEventListener('open-dashboard', handler);
    return () => window.removeEventListener('open-dashboard', handler);
  }, [navigate]);

  const handleSessionStart = () => {
    if (onSessionStart) {
      onSessionStart();
    }
    // Navigate to the user's Builder.io page after session starts
    window.location.href = 'https://www.builder.my/page?model=page';
  };

  return (
    <div className="builder-page">
      <button
        className="cyber-dash-button"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 10,
          padding: '0.75rem 1.5rem',
          background: '#646cff',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: '1.1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(100,108,255,0.12)'
        }}
        onClick={() => navigate('/dashboard')}
      >
        Cyber Dash
      </button>
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
    </div>
  );
}; 