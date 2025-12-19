import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem 0;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        {children}
      </Main>
    </LayoutContainer>
  );
};

export default Layout;