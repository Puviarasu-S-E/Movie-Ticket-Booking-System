import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getDefaultImage } from '../utils/defaultImages';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Card = styled(Link)`
  background: ${props => props.theme.colors.card};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px ${props => props.theme.colors.shadow};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
  }
`;

const PosterContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Rating = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  color: #333;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const Genre = styled.p`
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const BookButton = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
`;

const MovieCard = ({ movie }) => {
  const { theme } = useTheme();
  
  return (
    <Card to={`/movie/${movie._id}`} theme={theme}>
      <PosterContainer>
        <Poster 
          src={movie.poster || getDefaultImage('poster', movie.genre)} 
          alt={movie.title}
          onError={(e) => {
            e.target.src = getDefaultImage('poster', movie.genre);
          }}
        />
        {movie.rating > 0 && (
          <Rating>⭐ {movie.rating}</Rating>
        )}
      </PosterContainer>
      
      <Content>
        <Title theme={theme}>{movie.title}</Title>
        <Genre theme={theme}>{movie.genre?.join(', ')}</Genre>
        <Details theme={theme}>
          <span>{movie.language?.join(', ')}</span>
          <span>{movie.duration} min</span>
        </Details>
        <BookButton>Book Tickets</BookButton>
      </Content>
    </Card>
  );
};

export default MovieCard;