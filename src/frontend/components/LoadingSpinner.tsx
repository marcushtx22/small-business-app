import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'currentColor'
}) => {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };

  return (
    <div className="loading-spinner" style={{ width: sizeMap[size], height: sizeMap[size] }}>
      <div
        className="spinner"
        style={{
          borderColor: `${color} transparent ${color} transparent`
        }}
      />
    </div>
  );
}; 