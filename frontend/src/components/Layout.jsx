import React from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Main = styled.main`
  min-height: calc(100vh - 80px);
`;

const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <LayoutContainer theme={theme}>
      <Header />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;