import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SearchInput = styled.input`
  padding: 1rem 1.5rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const Select = styled.select`
  padding: 1rem 1.5rem;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
  }
`;

const SearchFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <FiltersContainer>
      <FilterRow>
        <SearchInput
          type="text"
          placeholder="🔍 Search movies..."
          value={filters.search || ''}
          onChange={(e) => handleInputChange('search', e.target.value)}
        />
        
        <Select
          value={filters.genre || ''}
          onChange={(e) => handleInputChange('genre', e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </Select>
        
        <Select
          value={filters.language || ''}
          onChange={(e) => handleInputChange('language', e.target.value)}
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Malayalam">Malayalam</option>
        </Select>
        
        <Select
          value={filters.format || ''}
          onChange={(e) => handleInputChange('format', e.target.value)}
        >
          <option value="">All Formats</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="IMAX">IMAX</option>
        </Select>
      </FilterRow>
    </FiltersContainer>
  );
};

export default SearchFilters;