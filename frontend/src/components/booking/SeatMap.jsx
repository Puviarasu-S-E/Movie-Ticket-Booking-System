import React from 'react';
import styled from 'styled-components';

const SeatMapContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 25px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  
  &::before {
    content: '🎦';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px;
    border-radius: 50%;
    font-size: 1.2rem;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const Screen = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin: 1rem 0 3rem 0;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
    border-radius: 2px;
  }
`;

const SeatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RowLabel = styled.div`
  width: 30px;
  text-align: center;
  font-weight: bold;
  color: #666;
`;

const Seat = styled.button`
  width: 35px;
  height: 35px;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  
  ${props => {
    if (props.isBooked) {
      return `
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        border-color: #dc3545;
        color: white;
        cursor: not-allowed;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
      `;
    }
    if (props.isSelected) {
      return `
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        border-color: #28a745;
        color: white;
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
      `;
    }
    
    const categoryColors = {
      Silver: { bg: '#6c757d', hover: '#5a6268' },
      Gold: { bg: '#ffc107', hover: '#e0a800' },
      Platinum: { bg: '#17a2b8', hover: '#138496' }
    };
    
    const colors = categoryColors[props.category] || categoryColors.Silver;
    
    return `
      background: rgba(255, 255, 255, 0.9);
      border-color: ${colors.bg};
      color: ${colors.bg};
      
      &:hover {
        background: ${colors.bg};
        color: white;
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }
    `;
  }}
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
`;

const LegendSeat = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid;
  border-radius: 6px;
  
  ${props => {
    if (props.type === 'available') {
      return `
        background: rgba(255, 255, 255, 0.9);
        border-color: #6c757d;
      `;
    }
    if (props.type === 'selected') {
      return `
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        border-color: #28a745;
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
      `;
    }
    if (props.type === 'booked') {
      return `
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        border-color: #dc3545;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
      `;
    }
  }}
`;

const SeatMap = ({ seatLayout, bookedSeats, selectedSeats, onSeatSelect, maxSeats = 10 }) => {
  const isBooked = (row, number) => {
    return bookedSeats.some(seat => seat.row === row && seat.number === number);
  };

  const isSelected = (row, number) => {
    return selectedSeats.some(seat => seat.row === row && seat.number === number);
  };

  const handleSeatClick = (seat) => {
    if (isBooked(seat.row, seat.number)) return;
    
    if (isSelected(seat.row, seat.number)) {
      onSeatSelect(seat, 'remove');
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect(seat, 'add');
    } else {
      alert(`You can select maximum ${maxSeats} seats`);
    }
  };

  // Group seats by row
  const seatsByRow = seatLayout.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <SeatMapContainer>
      <Screen>SCREEN</Screen>
      
      <SeatsContainer>
        {sortedRows.map(row => (
          <Row key={row}>
            <RowLabel>{row}</RowLabel>
            {seatsByRow[row]
              .sort((a, b) => a.number - b.number)
              .map(seat => (
                <Seat
                  key={`${seat.row}${seat.number}`}
                  category={seat.category}
                  isBooked={isBooked(seat.row, seat.number)}
                  isSelected={isSelected(seat.row, seat.number)}
                  onClick={() => handleSeatClick(seat)}
                  disabled={isBooked(seat.row, seat.number)}
                >
                  {seat.number}
                </Seat>
              ))}
          </Row>
        ))}
      </SeatsContainer>
      
      <Legend>
        <LegendItem>
          <LegendSeat type="available" />
          <span>Available</span>
        </LegendItem>
        <LegendItem>
          <LegendSeat type="selected" />
          <span>Selected</span>
        </LegendItem>
        <LegendItem>
          <LegendSeat type="booked" />
          <span>Booked</span>
        </LegendItem>
      </Legend>
    </SeatMapContainer>
  );
};

export default SeatMap;