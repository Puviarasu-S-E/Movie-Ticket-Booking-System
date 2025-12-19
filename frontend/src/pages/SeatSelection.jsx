import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBooking } from '../contexts/BookingContext.jsx';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`;

const BookingInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  
  h3 {
    margin: 0 0 1rem 0;
  }
  
  p {
    margin: 0.5rem 0;
    opacity: 0.8;
  }
`;

const SeatMapContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const Screen = styled.div`
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  height: 8px;
  border-radius: 4px;
  margin: 0 auto 3rem auto;
  width: 80%;
  position: relative;
  
  &::after {
    content: 'SCREEN';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
  max-width: 600px;
  margin: 0 auto;
`;

const Seat = styled.button`
  width: 35px;
  height: 35px;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  
  &:active::before {
    width: 100%;
    height: 100%;
  }
  
  ${props => {
    if (props.isBooked) {
      return `
        background: #666;
        border-color: #666;
        color: #999;
        cursor: not-allowed;
        transform: scale(0.9);
      `;
    }
    if (props.isSelected) {
      return `
        background: #ff6b6b;
        border-color: #ff6b6b;
        color: white;
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(255, 107, 107, 0.6);
        animation: pulse 2s infinite;
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.6); }
          50% { box-shadow: 0 0 30px rgba(255, 107, 107, 0.8); }
        }
      `;
    }
    return `
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      color: white;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: #ff6b6b;
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
      }
    `;
  }}
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  .legend-seat {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
`;

const BookingFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(${props => props.show ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const BookingDetails = styled.div`
  color: white;
  
  .seats {
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .amount {
    font-size: 1.3rem;
    font-weight: bold;
    color: #ff6b6b;
  }
`;

const ProceedButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SeatSelection = () => {
  const navigate = useNavigate();
  const { bookingData, setBookingData } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats] = useState(['A5', 'A6', 'B8', 'C3', 'C4', 'D10']);
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 12;
  const seatPrice = bookingData?.show?.price || 250;

  useEffect(() => {
    if (!bookingData?.movie) {
      navigate('/');
    }
  }, [bookingData, navigate]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleProceed = () => {
    const totalAmount = selectedSeats.length * seatPrice;
    const convenienceFee = selectedSeats.length * 20;
    const taxes = Math.round((totalAmount + convenienceFee) * 0.18);
    const finalAmount = totalAmount + convenienceFee + taxes;
    
    setBookingData({
      ...bookingData,
      selectedSeats,
      totalAmount,
      convenienceFee,
      taxes,
      finalAmount
    });
    
    navigate('/booking/payment');
  };

  if (!bookingData?.movie) {
    return (
      <Container>
        <div style={{textAlign: 'center', padding: '4rem'}}>
          No booking data found. Please start from movie selection.
        </div>
      </Container>
    );
  }

  return (
    <Container style={{paddingBottom: '120px'}}>
      <BookingInfo>
        <h3>{bookingData.movie.title}</h3>
        <p><strong>Theatre:</strong> {bookingData.theatre.name}</p>
        <p><strong>Show Time:</strong> {bookingData.show.time}</p>
        <p><strong>Date:</strong> {bookingData.show?.date ? new Date(bookingData.show.date).toLocaleDateString() : new Date().toLocaleDateString()}</p>
      </BookingInfo>
      
      <SeatMapContainer>
        <h3 style={{textAlign: 'center', marginBottom: '2rem'}}>Select Your Seats</h3>
        
        <Screen />
        
        <SeatGrid>
          {rows.map(row => 
            Array.from({length: seatsPerRow}, (_, i) => {
              const seatNumber = i + 1;
              const seatId = `${row}${seatNumber}`;
              
              return (
                <Seat
                  key={seatId}
                  isBooked={bookedSeats.includes(seatId)}
                  isSelected={selectedSeats.includes(seatId)}
                  onClick={() => handleSeatClick(seatId)}
                  disabled={bookedSeats.includes(seatId)}
                >
                  {seatId}
                </Seat>
              );
            })
          )}
        </SeatGrid>
        
        <Legend>
          <div className="legend-item">
            <div className="legend-seat" style={{background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)'}}></div>
            Available
          </div>
          <div className="legend-item">
            <div className="legend-seat" style={{background: '#ff6b6b'}}></div>
            Selected
          </div>
          <div className="legend-item">
            <div className="legend-seat" style={{background: '#666'}}></div>
            Booked
          </div>
        </Legend>
      </SeatMapContainer>
      
      <BookingFooter show={selectedSeats.length > 0}>
          <BookingDetails>
            <div className="seats">
              {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''}: {selectedSeats.join(', ')}
            </div>
            <div className="amount">
              Total: ₹{selectedSeats.length * seatPrice}
            </div>
          </BookingDetails>
          
          <ProceedButton onClick={handleProceed}>
            Proceed to Payment
          </ProceedButton>
        </BookingFooter>
      )}
    </Container>
  );
};

export default SeatSelection;