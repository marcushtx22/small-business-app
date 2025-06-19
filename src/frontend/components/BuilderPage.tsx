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
  }, []);

  const handleSessionStart = () => {
    if (onSessionStart) {
      onSessionStart();
    }
    // Navigate to dashboard after session starts
    navigate('/dashboard');
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
    </div>
  );
}; 