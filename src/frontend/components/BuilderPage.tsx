import React from 'react';
import { BuilderComponent, useIsPreviewing } from '@builder.io/react';
import { useNavigate } from 'react-router-dom';

interface BuilderPageProps {
  onSessionStart?: () => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onSessionStart }) => {
  const isPreviewing = useIsPreviewing();
  const navigate = useNavigate();

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
          id: 'e2a9e0ba558e44e7afcf226de4e8f0bc',
          data: {
            onSessionStart: handleSessionStart
          }
        }}
        options={{
          includeRefs: true
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