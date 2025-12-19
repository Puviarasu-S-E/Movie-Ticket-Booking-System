import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBooking } from '../contexts/BookingContext.jsx';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #4ecdc4;
  margin-bottom: 1rem;
`;

const TicketCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const QRCode = styled.div`
  width: 150px;
  height: 150px;
  background: white;
  margin: 2rem auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #333;
`;

const TicketDetails = styled.div`
  text-align: left;
  
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .label {
    opacity: 0.8;
  }
  
  .value {
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  background: ${props => props.primary ? '#ff6b6b' : 'transparent'};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff6b6b;
    transform: translateY(-2px);
  }
`;

const BookingSuccess = () => {
  const navigate = useNavigate();
  const { bookingData, clearBookingData } = useBooking();

  useEffect(() => {
    if (!bookingData?.bookingId) {
      navigate('/');
    }
  }, [bookingData, navigate]);

  const handleDownloadTicket = () => {
    const ticketData = {
      bookingId: bookingData.bookingId,
      movie: bookingData.movie.title,
      theatre: bookingData.theatre.name,
      showTime: bookingData.show.time,
      seats: bookingData.selectedSeats,
      amount: bookingData.finalAmount
    };
    
    const dataStr = JSON.stringify(ticketData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ticket-${bookingData.bookingId}.json`;
    link.click();
  };

  const handleGoHome = () => {
    clearBookingData();
    navigate('/');
  };

  if (!bookingData?.bookingId) {
    return (
      <Container>
        <div style={{padding: '4rem'}}>
          No booking data found. Please start from movie selection.
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <SuccessIcon>✓</SuccessIcon>
      <h1>Booking Confirmed!</h1>
      <p>Your movie tickets have been booked successfully</p>
      
      <TicketCard>
        <h3 style={{color: '#4ecdc4', marginBottom: '1.5rem'}}>E-Ticket</h3>
        
        <QRCode>
          🎦
        </QRCode>
        
        <TicketDetails>
          <div className="row">
            <span className="label">Booking ID:</span>
            <span className="value">{bookingData.bookingId}</span>
          </div>
          <div className="row">
            <span className="label">Movie:</span>
            <span className="value">{bookingData.movie.title}</span>
          </div>
          <div className="row">
            <span className="label">Theatre:</span>
            <span className="value">{bookingData.theatre.name}</span>
          </div>
          <div className="row">
            <span className="label">Show Time:</span>
            <span className="value">{bookingData.show.time}</span>
          </div>
          <div className="row">
            <span className="label">Date:</span>
            <span className="value">{bookingData.show?.date ? new Date(bookingData.show.date).toLocaleDateString() : new Date().toLocaleDateString()}</span>
          </div>
          <div className="row">
            <span className="label">Seats:</span>
            <span className="value">{bookingData.selectedSeats.join(', ')}</span>
          </div>
          <div className="row">
            <span className="label">Total Amount:</span>
            <span className="value" style={{color: '#4ecdc4'}}>₹{bookingData.finalAmount}</span>
          </div>
        </TicketDetails>
      </TicketCard>
      
      <ActionButtons>
        <Button onClick={handleDownloadTicket}>
          Download Ticket
        </Button>
        <Button primary onClick={handleGoHome}>
          Book More Tickets
        </Button>
      </ActionButtons>
      
      <p style={{marginTop: '2rem', opacity: 0.8, fontSize: '0.9rem'}}>
        Please show this e-ticket at the theatre entrance
      </p>
    </Container>
  );
};

export default BookingSuccess;