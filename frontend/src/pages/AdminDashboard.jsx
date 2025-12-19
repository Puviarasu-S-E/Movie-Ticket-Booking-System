import React, { useState } from 'react';
import styled from 'styled-components';
import { useMovies, useTheatres, useBookings } from '../contexts/MovieContext.jsx';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const MovieCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const MovieTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const MovieInfo = styled.p`
  margin: 0.25rem 0;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &.edit {
    background: #4ecdc4;
    color: white;
    
    &:hover {
      background: #45b7aa;
    }
  }
  
  &.delete {
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const { movies, updateMovie, addMovie, deleteMovie, loading } = useMovies();
  const { theatres, updateTheatre, addTheatre, deleteTheatre } = useTheatres();
  const { bookings, updateBooking, addBooking, deleteBooking } = useBookings();
  const [adminBookings, setAdminBookings] = useState([]);
  
  // Fetch all bookings for admin
  React.useEffect(() => {
    if (activeTab === 'bookings') {
      const fetchAdminBookings = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/bookings/admin/all', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          if (data.success) {
            setAdminBookings(data.bookings);
          }
        } catch (error) {
          console.log('Failed to fetch admin bookings');
        }
      };
      fetchAdminBookings();
    }
  }, [activeTab]);
  
  const [localMovies, setLocalMovies] = useState([
    {
      _id: '1',
      title: 'Avengers: Endgame',
      genre: ['Action', 'Adventure', 'Drama'],
      language: ['English', 'Hindi', 'Tamil', 'Telugu'],
      duration: 181,
      rating: 8.4,
      poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg'
    },
    {
      _id: '2',
      title: 'Spider-Man: No Way Home',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      language: ['English', 'Hindi', 'Tamil', 'Telugu'],
      duration: 148,
      rating: 8.2,
      poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg'
    },
    {
      _id: '3',
      title: 'The Batman',
      genre: ['Action', 'Crime', 'Drama'],
      language: ['English', 'Hindi'],
      duration: 176,
      rating: 7.8,
      poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
    },
    {
      _id: '4',
      title: 'RRR',
      genre: ['Action', 'Drama', 'History'],
      language: ['Telugu', 'Hindi', 'Tamil', 'English'],
      duration: 187,
      rating: 7.9,
      poster: 'https://image.tmdb.org/t/p/w500/wD6jUGNWpOKBjHEgKPUVlcgHXnn.jpg'
    },
    {
      _id: '5',
      title: 'KGF Chapter 2',
      genre: ['Action', 'Crime', 'Drama'],
      language: ['Kannada', 'Hindi', 'Tamil', 'Telugu'],
      duration: 168,
      rating: 8.3,
      poster: 'https://image.tmdb.org/t/p/w500/lP5eKh8WOcPysfELrUpGhHJGZEH.jpg'
    },
    {
      _id: '6',
      title: 'Pushpa: The Rise',
      genre: ['Action', 'Crime', 'Drama'],
      language: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
      duration: 179,
      rating: 7.6,
      poster: 'https://image.tmdb.org/t/p/w500/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg'
    },
    {
      _id: '7',
      title: 'Vikram',
      genre: ['Action', 'Crime', 'Thriller'],
      language: ['Tamil', 'Hindi', 'Telugu'],
      duration: 174,
      rating: 8.4,
      poster: 'https://image.tmdb.org/t/p/w500/RKJW1895vBKLzaeh4OujiMpFcwp.jpg'
    },
    {
      _id: '8',
      title: 'Brahmastra',
      genre: ['Action', 'Adventure', 'Fantasy'],
      language: ['Hindi', 'Tamil', 'Telugu', 'Malayalam'],
      duration: 167,
      rating: 5.6,
      poster: 'https://image.tmdb.org/t/p/w500/cfuLZWKqNAz5Ke1PJWBaJBZlXQs.jpg'
    },
    {
      _id: '9',
      title: 'Kantara',
      genre: ['Action', 'Drama', 'Thriller'],
      language: ['Kannada', 'Hindi', 'Tamil', 'Telugu'],
      duration: 148,
      rating: 8.2,
      poster: 'https://image.tmdb.org/t/p/w500/8y2Q2gkOZszliEqU4V2nDX6I0jG.jpg'
    },
    {
      _id: '10',
      title: 'Pathaan',
      genre: ['Action', 'Adventure', 'Thriller'],
      language: ['Hindi', 'Tamil', 'Telugu'],
      duration: 146,
      rating: 6.0,
      poster: 'https://image.tmdb.org/t/p/w500/lP7dJpanOkSVUNiFl2iHaKXJVFl.jpg'
    },
    {
      _id: '11',
      title: 'Ponniyin Selvan I',
      genre: ['Action', 'Adventure', 'Drama'],
      language: ['Tamil', 'Hindi', 'Telugu', 'Malayalam'],
      duration: 167,
      rating: 7.6,
      poster: 'https://image.tmdb.org/t/p/w500/qNkJZIVmpJb5temNEHkdTkJNIgr.jpg'
    },
    {
      _id: '12',
      title: 'Varisu',
      genre: ['Action', 'Drama', 'Family'],
      language: ['Tamil', 'Hindi', 'Telugu'],
      duration: 169,
      rating: 6.1,
      poster: 'https://image.tmdb.org/t/p/w500/rqgeBNWXas1yrAyXxwi9CahfScx.jpg'
    }
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    language: '',
    duration: '',
    rating: '',
    poster: ''
  });

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description || '',
      genre: movie.genre.join(', '),
      language: movie.language.join(', '),
      duration: movie.duration,
      rating: movie.rating,
      poster: movie.poster
    });
    setShowModal(true);
  };

  const handleDelete = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(movieId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieData = {
      ...formData,
      genre: formData.genre.split(',').map(g => g.trim()),
      language: formData.language.split(',').map(l => l.trim()),
      duration: parseInt(formData.duration),
      rating: parseFloat(formData.rating)
    };
    
    if (editingMovie) {
      updateMovie(editingMovie._id, movieData);
    } else {
      addMovie(movieData);
    }
    
    setShowModal(false);
    setEditingMovie(null);
    setFormData({ title: '', description: '', genre: '', language: '', duration: '', rating: '', poster: '' });
  };

  const handleAddNew = () => {
    setEditingMovie(null);
    setFormData({ title: '', description: '', genre: '', language: '', duration: '', rating: '', poster: '' });
    setShowModal(true);
  };

  return (
    <Container>
      <Header>Admin Dashboard</Header>
      
      <TabContainer>
        <Tab active={activeTab === 'movies'} onClick={() => setActiveTab('movies')}>
          Movies
        </Tab>
        <Tab active={activeTab === 'theatres'} onClick={() => setActiveTab('theatres')}>
          Theatres
        </Tab>
        <Tab active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')}>
          Bookings
        </Tab>
      </TabContainer>

      {activeTab === 'movies' && (
        <div>
          <AddButton onClick={handleAddNew}>
            + Add New Movie
          </AddButton>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading movies...</div>
          ) : (
            <MoviesGrid>
              {movies.map(movie => (
                <MovieCard key={movie._id}>
                  <MoviePoster src={movie.poster} alt={movie.title} />
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieInfo>Genre: {movie.genre.join(', ')}</MovieInfo>
                  <MovieInfo>Language: {movie.language.join(', ')}</MovieInfo>
                  <MovieInfo>Duration: {movie.duration} mins</MovieInfo>
                  <MovieInfo>Rating: {movie.rating}/10</MovieInfo>
                  
                  <ButtonGroup>
                    <ActionButton className="edit" onClick={() => handleEdit(movie)}>
                      Edit
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleDelete(movie._id)}>
                      Delete
                    </ActionButton>
                  </ButtonGroup>
                </MovieCard>
              ))}
            </MoviesGrid>
          )}
        </div>
      )}

      {activeTab === 'theatres' && (
        <div>
          <AddButton onClick={() => alert('Add Theatre functionality')}>+ Add New Theatre</AddButton>
          <MoviesGrid>
            {theatres.map(theatre => (
              <MovieCard key={theatre._id}>
                <MovieTitle>{theatre.name}</MovieTitle>
                <MovieInfo>Location: {theatre.location}</MovieInfo>
                <MovieInfo>Screens: {theatre.screens}</MovieInfo>
                <MovieInfo>Facilities: {theatre.facilities.join(', ')}</MovieInfo>
                <ButtonGroup>
                  <ActionButton className="edit" onClick={() => alert('Edit Theatre')}>Edit</ActionButton>
                  <ActionButton className="delete" onClick={() => deleteTheatre(theatre._id)}>Delete</ActionButton>
                </ButtonGroup>
              </MovieCard>
            ))}
          </MoviesGrid>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div>
          <MoviesGrid>
            {adminBookings.map(booking => (
              <MovieCard key={booking._id}>
                <MovieTitle>Booking #{booking.bookingId || booking._id}</MovieTitle>
                <MovieInfo>User: {booking.user?.name || booking.user?.email}</MovieInfo>
                <MovieInfo>Movie: {booking.show?.movie?.title}</MovieInfo>
                <MovieInfo>Theatre: {booking.show?.theatre?.name}</MovieInfo>
                <MovieInfo>Seats: {booking.seats?.map(s => `${s.row}${s.number}`).join(', ')}</MovieInfo>
                <MovieInfo>Amount: ₹{booking.finalAmount}</MovieInfo>
                <MovieInfo>Status: <span style={{color: booking.bookingStatus === 'confirmed' ? '#4ecdc4' : '#e74c3c'}}>{booking.bookingStatus}</span></MovieInfo>
                <ButtonGroup>
                  <ActionButton className="edit" onClick={() => alert('View Details')}>View</ActionButton>
                  <ActionButton className="delete" onClick={() => deleteBooking(booking._id)}>Cancel</ActionButton>
                </ButtonGroup>
              </MovieCard>
            ))}
          </MoviesGrid>
        </div>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Movie Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <Input
                type="text"
                placeholder="Genre (comma separated)"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                required
              />
              <Input
                type="text"
                placeholder="Language (comma separated)"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                required
              />
              <Input
                type="number"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                required
              />
              <Input
                type="number"
                step="0.1"
                placeholder="Rating (0-10)"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                required
              />
              <Input
                type="url"
                placeholder="Poster URL"
                value={formData.poster}
                onChange={(e) => setFormData({...formData, poster: e.target.value})}
                required
              />
              
              <ButtonGroup>
                <ActionButton type="submit" className="edit">
                  {editingMovie ? 'Update Movie' : 'Add Movie'}
                </ActionButton>
                <ActionButton type="button" className="delete" onClick={() => setShowModal(false)}>
                  Cancel
                </ActionButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminDashboard;