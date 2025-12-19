import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theatresAPI, moviesAPI } from '../services/api.js';
import { useBooking } from '../contexts/BookingContext.jsx';
import { useTheatres, useMovies } from '../contexts/MovieContext.jsx';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`;

const MovieInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const Poster = styled.img`
  width: 120px;
  height: 180px;
  border-radius: 15px;
  object-fit: cover;
`;

const MovieDetails = styled.div`
  flex: 1;
  
  h2 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
  }
  
  p {
    margin: 0.5rem 0;
    opacity: 0.8;
  }
`;

const TheatreCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 107, 107, 0.3);
  }
`;

const TheatreName = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const ShowsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

const ShowButton = styled.button`
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ff6b6b;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  .time {
    font-size: 1.1rem;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .price {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
  }
  
  &:hover .price {
    color: #ff6b6b;
    opacity: 1;
  }
`;

const DateSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
`;

const DateButton = styled.button`
  min-width: 120px;
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 10px;
  background: ${props => props.selected ? '#ff6b6b' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    background: rgba(255, 107, 107, 0.3);
    border-color: #ff6b6b;
  }
  
  .day {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  
  .date {
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 0.2rem;
  }
`;

const TheatreSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { setBookingData } = useBooking();
  const { theatres } = useTheatres();
  const { movies } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, [movieId]);

  const fetchData = async () => {
    // Get movie from shared context first
    const contextMovie = movies.find(m => m._id === movieId);
    if (contextMovie) {
      setMovie(contextMovie);
    }
    
    try {
      const movieRes = await moviesAPI.getById(movieId);
      setMovie(movieRes.data.movie);
    } catch (error) {
      // Use context movie if API fails
      if (!contextMovie) {
        setMovie({
          title: 'Movie Not Found',
          genre: ['Unknown'],
          language: ['English'],
          duration: 0,
          poster: 'https://via.placeholder.com/300x450'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getAvailableShows = (selectedDate) => {
    const allShows = [
      { _id: 's1', time: '10:00 AM', price: 200 },
      { _id: 's2', time: '1:30 PM', price: 250 },
      { _id: 's3', time: '6:00 PM', price: 300 },
      { _id: 's4', time: '9:30 PM', price: 300 }
    ];
    
    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    
    if (!isToday) return allShows.map(show => ({ ...show, date: selectedDate }));
    
    return allShows.filter(show => {
      const [time, period] = show.time.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let showHours = hours;
      if (period === 'PM' && hours !== 12) showHours += 12;
      if (period === 'AM' && hours === 12) showHours = 0;
      
      const showTime = new Date();
      showTime.setHours(showHours, minutes, 0, 0);
      
      return showTime > now;
    }).map(show => ({ ...show, date: selectedDate }));
  };

  const handleShowSelect = (theatre, show) => {
    setBookingData({
      movie,
      theatre,
      show,
      selectedSeats: [],
      totalAmount: 0
    });
    navigate('/booking/seats');
  };

  if (loading) {
    return (
      <Container>
        <div style={{textAlign: 'center', padding: '4rem'}}>
          Loading theatres...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {movie && (
        <MovieInfo>
          <Poster src={movie.poster} alt={movie.title} />
          <MovieDetails>
            <h2>{movie.title}</h2>
            <p><strong>Genre:</strong> {movie.genre?.join(', ')}</p>
            <p><strong>Language:</strong> {movie.language?.join(', ')}</p>
            <p><strong>Duration:</strong> {movie.duration} mins</p>
          </MovieDetails>
        </MovieInfo>
      )}
      
      <h2 style={{marginBottom: '2rem'}}>Select Date</h2>
      
      <DateSelector>
        {getNext7Days().map((date, index) => (
          <DateButton
            key={index}
            selected={date.toDateString() === selectedDate.toDateString()}
            onClick={() => setSelectedDate(date)}
          >
            <div className="day">
              {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : date.toLocaleDateString('en', { weekday: 'short' })}
            </div>
            <div className="date">
              {date.getDate()}/{date.getMonth() + 1}
            </div>
          </DateButton>
        ))}
      </DateSelector>
      
      <h2 style={{marginBottom: '2rem'}}>Select Theatre & Show Time</h2>
      
      {(theatres.length > 0 ? theatres.map(theatre => ({
        ...theatre,
        location: { address: theatre.location },
        shows: getAvailableShows(selectedDate).map(show => ({
          ...show,
          _id: `${theatre._id}${show._id}`
        }))
      })) : []).map(theatre => (
        <TheatreCard key={theatre._id}>
          <TheatreName>{theatre.name}</TheatreName>
          <p style={{opacity: 0.8, marginBottom: '1.5rem'}}>{theatre.location?.address}</p>
          
          <ShowsGrid>
            {theatre.shows?.length > 0 ? theatre.shows.map(show => (
              <ShowButton
                key={show._id}
                onClick={() => handleShowSelect(theatre, show)}
              >
                <div className="time">{show.time}</div>
                <div className="price">₹{show.price}</div>
              </ShowButton>
            )) : (
              <p style={{opacity: 0.6, fontStyle: 'italic'}}>No shows available for selected date</p>
            )}
          </ShowsGrid>
        </TheatreCard>
      ))}
    </Container>
  );
};

export default TheatreSelection;