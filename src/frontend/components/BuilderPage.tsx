import React from 'react';
import { BuilderComponent, useIsPreviewing } from '@builder.io/react';

interface BuilderPageProps {
  onSessionStart?: () => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onSessionStart }) => {
  const isPreviewing = useIsPreviewing();

  return (
    <BuilderComponent
      model="page"
      content={{
        id: '0355fc8dd8574bd582b6401e6e692b5b',
        data: {
          onSessionStart
        }
      }}
      options={{
        includeRefs: true,
        includeSearchParams: true
      }}
    />
  );
}; 