import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';



const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        dispatch({ type: 'SET_TOKEN', payload: token });
        dispatch({ type: 'SET_USER', payload: JSON.parse(user) });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Check for admin credentials
    const isAdmin = credentials.email === 'admin@cinebook.com' && credentials.password === 'admin123';
    
    const demoUser = {
      _id: isAdmin ? 'admin123' : 'demo123',
      name: isAdmin ? 'Admin User' : credentials.email.split('@')[0],
      email: credentials.email,
      role: isAdmin ? 'admin' : 'user'
    };
    const demoToken = 'demo-token-' + Date.now();
    
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    dispatch({ type: 'SET_TOKEN', payload: demoToken });
    dispatch({ type: 'SET_USER', payload: demoUser });
    
    return { success: true };
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Instant demo registration
    const demoUser = {
      _id: 'demo' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: 'user'
    };
    const demoToken = 'demo-token-' + Date.now();
    
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    dispatch({ type: 'SET_TOKEN', payload: demoToken });
    dispatch({ type: 'SET_USER', payload: demoUser });
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};