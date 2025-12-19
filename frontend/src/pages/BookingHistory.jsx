import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: ${props => props.theme.colors.text};
`;

const BookingCard = styled.div`
  background: ${props => props.theme.colors.card};
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  color: ${props => props.theme.colors.text};
  box-shadow: 0 4px 15px ${props => props.theme.colors.shadow};
`;

const BookingHistory = () => {
  const { theme } = useTheme();
  const [bookings, setBookings] = useState([{
    _id: 'test1',
    bookingId: 'BK001',
    show: {
      movie: { title: 'Test Movie' },
      theatre: { name: 'Test Theatre' },
      date: new Date(),
      time: '7:00 PM'
    },
    seats: [{ row: 'A', number: 1 }],
    finalAmount: 300,
    bookingStatus: 'confirmed'
  }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);
  
  // Refresh bookings when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchBookings();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No auth token found');
      // Show sample booking if no token
      setBookings([{
        _id: 'sample1',
        bookingId: 'BK001',
        show: {
          movie: { title: 'Sample Movie' },
          theatre: { name: 'Sample Theatre' },
          date: new Date(),
          time: '7:00 PM'
        },
        seats: [{ row: 'A', number: 1 }, { row: 'A', number: 2 }],
        finalAmount: 500,
        bookingStatus: 'confirmed'
      }]);
      setLoading(false);
      return;
    }
    
    console.log('Fetching bookings with token:', token.substring(0, 20) + '...');
    
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Full API response:', data);
        
        if (data.success) {
          console.log('Bookings found:', data.bookings?.length || 0);
          setBookings(data.bookings || []);
        } else {
          console.log('API returned success: false');
          setBookings([]);
        }
      } else {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        // Fallback to localStorage
        const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        setBookings(localBookings);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Fallback to localStorage
      const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(localBookings);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{textAlign: 'center', padding: '4rem'}}>
          Loading bookings...
        </div>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>My Bookings</h1>
      
      <div style={{marginBottom: '1rem', color: '#ccc'}}>
        Found {bookings.length} bookings
      </div>
      
      {bookings.length === 0 ? (
        <div style={{textAlign: 'center', padding: '4rem'}}>
          <p>No bookings found. Make a booking first!</p>
        </div>
      ) : (
        bookings.map(booking => (
          <BookingCard key={booking._id} theme={theme}>
            <h3>{booking.show?.movie?.title || 'Movie'}</h3>
            <p><strong>Booking ID:</strong> {booking.bookingId || booking._id}</p>
            <p><strong>Theatre:</strong> {booking.show?.theatre?.name || 'Theatre'}</p>
            <p><strong>Date:</strong> {booking.show?.date ? new Date(booking.show.date).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Time:</strong> {booking.show?.time || 'N/A'}</p>
            <p><strong>Seats:</strong> {booking.seats?.map(seat => `${seat.row || ''}${seat.number || ''}`).join(', ') || 'N/A'}</p>
            <p><strong>Amount:</strong> ₹{booking.finalAmount || 0}</p>
            <p><strong>Status:</strong> <span style={{color: booking.bookingStatus === 'confirmed' ? '#4ecdc4' : '#e74c3c'}}>{booking.bookingStatus || 'confirmed'}</span></p>
          </BookingCard>
        ))
      )}
    </Container>
  );
};

export default BookingHistory;