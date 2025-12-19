import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
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
  loading: lazy;
  transition: opacity 0.3s ease;
  
  &[data-loaded="false"] {
    opacity: 0;
  }
  
  &[data-loaded="true"] {
    opacity: 1;
  }
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
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '⭐';
    font-size: 0.8rem;
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Genre = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
`;

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <PosterContainer>
          <Poster 
            src={movie.poster} 
            alt={movie.title}
            loading="lazy"
            data-loaded="true"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
          {movie.rating > 0 && (
            <Rating>{movie.rating}</Rating>
          )}
        </PosterContainer>
        
        <Content>
          <Title>{movie.title}</Title>
          <Genre>{movie.genre.join(', ')}</Genre>
          <Details>
            <span>{movie.language.join(', ')}</span>
            <span>{movie.duration} min</span>
          </Details>
        </Content>
      </Card>
    </Link>
  );
};

export default MovieCard;