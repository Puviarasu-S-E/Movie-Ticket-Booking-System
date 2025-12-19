import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  movie: null,
  theatre: null,
  show: null,
  selectedSeats: [],
  totalAmount: 0,
  convenienceFee: 0,
  taxes: 0,
  finalAmount: 0,
  paymentMethod: null,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKING_DATA':
      return { ...state, ...action.payload };
    case 'SET_MOVIE':
      return { ...state, movie: action.payload };
    case 'SET_THEATRE':
      return { ...state, theatre: action.payload };
    case 'SET_SHOW':
      return { ...state, show: action.payload };
    case 'SET_SELECTED_SEATS':
      return { ...state, selectedSeats: action.payload };
    case 'ADD_SEAT':
      return { ...state, selectedSeats: [...state.selectedSeats, action.payload] };
    case 'REMOVE_SEAT':
      return { 
        ...state, 
        selectedSeats: state.selectedSeats.filter(
          seat => !(seat.row === action.payload.row && seat.number === action.payload.number)
        ) 
      };
    case 'CALCULATE_PRICING':
      const totalAmount = state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
      const convenienceFee = Math.round(totalAmount * 0.02);
      const taxes = Math.round((totalAmount + convenienceFee) * 0.18);
      const finalAmount = totalAmount + convenienceFee + taxes;
      return { ...state, totalAmount, convenienceFee, taxes, finalAmount };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setBookingData = (data) => dispatch({ type: 'SET_BOOKING_DATA', payload: data });
  const clearBookingData = () => dispatch({ type: 'RESET_BOOKING' });
  const setMovie = (movie) => dispatch({ type: 'SET_MOVIE', payload: movie });
  const setTheatre = (theatre) => dispatch({ type: 'SET_THEATRE', payload: theatre });
  const setShow = (show) => dispatch({ type: 'SET_SHOW', payload: show });
  const addSeat = (seat) => {
    dispatch({ type: 'ADD_SEAT', payload: seat });
    dispatch({ type: 'CALCULATE_PRICING' });
  };
  const removeSeat = (seat) => {
    dispatch({ type: 'REMOVE_SEAT', payload: seat });
    dispatch({ type: 'CALCULATE_PRICING' });
  };
  const setPaymentMethod = (method) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  const resetBooking = () => dispatch({ type: 'RESET_BOOKING' });

  return (
    <BookingContext.Provider value={{
      bookingData: state, setBookingData, clearBookingData, setMovie, setTheatre, setShow, addSeat, removeSeat, setPaymentMethod, resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};