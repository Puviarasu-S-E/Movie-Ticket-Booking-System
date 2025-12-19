import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
  text-align: center;
`;

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <Container>
      <Spinner />
      <Text>{text}</Text>
    </Container>
  );
};

export default LoadingSpinner;