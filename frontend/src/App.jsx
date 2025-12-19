import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BookingProvider } from './contexts/BookingContext.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import TheatreSelection from './pages/TheatreSelection.jsx';
import SeatSelection from './pages/SeatSelection.jsx';
import Payment from './pages/Payment.jsx';
import BookingSuccess from './pages/BookingSuccess.jsx';
import Profile from './pages/Profile.jsx';
import BookingHistory from './pages/BookingHistory.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <BookingProvider>
            <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            
            <Route path="/movie/:movieId/theatres" element={
              <ProtectedRoute userOnly><TheatreSelection /></ProtectedRoute>
            } />
            <Route path="/booking/seats" element={
              <ProtectedRoute userOnly><SeatSelection /></ProtectedRoute>
            } />
            <Route path="/booking/payment" element={
              <ProtectedRoute userOnly><Payment /></ProtectedRoute>
            } />
            <Route path="/booking/success" element={
              <ProtectedRoute userOnly><BookingSuccess /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute><BookingHistory /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
            } />
          </Routes>
            </Layout>
          </BookingProvider>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;