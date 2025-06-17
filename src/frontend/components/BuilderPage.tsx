import React, { useEffect } from 'react';
import { BuilderComponent, useIsPreviewing, builder } from '@builder.io/react';
import { useNavigate } from 'react-router-dom';

interface BuilderPageProps {
  onSessionStart?: () => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onSessionStart }) => {
  const isPreviewing = useIsPreviewing();
  const navigate = useNavigate();

  useEffect(() => {
    // Log Builder.io configuration
    console.log('Builder.io API Key:', builder.apiKey);
    console.log('Builder.io Model:', 'page');
    console.log('Builder.io Content ID:', '49862c49247847edb30cba29e731c877');

    // Try to fetch content directly
    builder.get('page', {
      id: '49862c49247847edb30cba29e731c877',
      options: {
        includeRefs: true,
        cacheSeconds: 0
      }
    }).then(content => {
      console.log('Builder.io Content:', content);
    }).catch(error => {
      console.error('Builder.io Error:', error);
    });
  }, []);

  const handleSessionStart = () => {
    if (onSessionStart) {
      onSessionStart();
    }
    // Navigate to the Builder.io page
    window.location.href = 'https://www.builder.my/page?model=page';
  };

  return (
    <div className="builder-page">
      <BuilderComponent
        model="page"
        content={{
          id: '49862c49247847edb30cba29e731c877',
          data: {
            onSessionStart: handleSessionStart
          }
        }}
        options={{
          includeRefs: true,
          cacheSeconds: 0
        }}
      />
      <button 
        className="start-session-button"
        onClick={handleSessionStart}
      >
        Start Session
      </button>
    </div>
  );
}; 