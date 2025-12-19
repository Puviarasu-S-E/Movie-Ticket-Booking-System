import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const HeaderContainer = styled.header`
  background: ${props => props.isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  padding: 1rem 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavButton = styled(Link)`
  background: none;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const UserMenu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const UserName = styled.span`
  font-weight: 500;
  color: ${props => props.isDark ? '#fff' : '#333'};
`;

const LogoutBtn = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: #c82333;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer isDark={isDark}>
      <Nav>
        <Logo to="/">CineBook</Logo>
        
        <NavLinks>
          {user ? (
            <UserMenu>
              <NavButton to="/bookings">My Bookings</NavButton>
              <NavButton to="/profile">Profile</NavButton>
              {user.role === 'admin' && (
                <NavButton to="/admin">Admin</NavButton>
              )}
              <button
                onClick={toggleTheme}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <UserName isDark={isDark}>Hi, {user.name}</UserName>
              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </UserMenu>
          ) : (
            <>
              <NavButton to="/login">Login</NavButton>
              <NavButton to="/register">Register</NavButton>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;