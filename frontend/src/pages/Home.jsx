import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { moviesAPI } from '../services/api.js';
import MovieCard from '../components/MovieCard.jsx';
import SearchFilters from '../components/SearchFilters.jsx';
import { useMovies } from '../contexts/MovieContext.jsx';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SkeletonCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  height: 400px;
  animation: pulse 1.5s ease-in-out infinite alternate;
  
  @keyframes pulse {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }
`;

const NoMovies = styled.div`
  text-align: center;
  padding: 4rem;
  color: white;
  font-size: 1.2rem;
`;

const Home = () => {
  const { movies } = useMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    language: '',
    format: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [movies, filters]);

  const fetchMovies = async () => {
    // Movies now come from context, no need to fetch
    setLoading(false);
  };

  const filterMovies = () => {
    let filtered = movies;
    
    if (filters.search) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.genre) {
      filtered = filtered.filter(movie => 
        movie.genre.includes(filters.genre)
      );
    }
    
    if (filters.language) {
      filtered = filtered.filter(movie => 
        movie.language.includes(filters.language)
      );
    }
    
    if (filters.format) {
      filtered = filtered.filter(movie => 
        movie.format.includes(filters.format)
      );
    }
    
    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <Container>
        <Title>Now Showing</Title>
        <LoadingGrid>
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </LoadingGrid>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Now Showing</Title>
      
      <SearchFilters filters={filters} onFilterChange={setFilters} />
      
      {filteredMovies.length > 0 ? (
        <MoviesGrid>
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </MoviesGrid>
      ) : (
        <NoMovies>
          {movies.length === 0 ? 'No movies available' : 'No movies match your search criteria'}
        </NoMovies>
      )}
    </Container>
  );
};

export default Home;