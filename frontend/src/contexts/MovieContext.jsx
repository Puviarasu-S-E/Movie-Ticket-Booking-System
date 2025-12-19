import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();

const initialMovies = [
  {
    _id: '1',
    title: 'Avengers: Endgame',
    genre: ['Action', 'Adventure', 'Drama'],
    language: ['English', 'Hindi', 'Tamil', 'Telugu'],
    duration: 181,
    rating: 8.4,
    format: ['2D', '3D', 'IMAX'],
    poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg'
  },
  {
    _id: '2',
    title: 'Spider-Man: No Way Home',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: ['English', 'Hindi', 'Tamil', 'Telugu'],
    duration: 148,
    rating: 8.2,
    format: ['2D', '3D', 'IMAX'],
    poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg'
  },
  {
    _id: '3',
    title: 'The Batman',
    genre: ['Action', 'Crime', 'Drama'],
    language: ['English', 'Hindi'],
    duration: 176,
    rating: 7.8,
    format: ['2D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
  },
  {
    _id: '4',
    title: 'RRR',
    genre: ['Action', 'Drama', 'History'],
    language: ['Telugu', 'Hindi', 'Tamil', 'English'],
    duration: 187,
    rating: 7.9,
    format: ['2D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/wD6jUGNWpOKBjHEgKPUVlcgHXnn.jpg'
  },
  {
    _id: '5',
    title: 'KGF Chapter 2',
    genre: ['Action', 'Crime', 'Drama'],
    language: ['Kannada', 'Hindi', 'Tamil', 'Telugu'],
    duration: 168,
    rating: 8.3,
    format: ['2D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/lP5eKh8WOcPysfELrUpGhHJGZEH.jpg'
  },
  {
    _id: '6',
    title: 'Pushpa: The Rise',
    genre: ['Action', 'Crime', 'Drama'],
    language: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
    duration: 179,
    rating: 7.6,
    format: ['2D'],
    poster: 'https://image.tmdb.org/t/p/w500/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg'
  },
  {
    _id: '7',
    title: 'Vikram',
    genre: ['Action', 'Crime', 'Thriller'],
    language: ['Tamil', 'Hindi', 'Telugu'],
    duration: 174,
    rating: 8.4,
    format: ['2D'],
    poster: 'https://image.tmdb.org/t/p/w500/RKJW1895vBKLzaeh4OujiMpFcwp.jpg'
  },
  {
    _id: '8',
    title: 'Brahmastra',
    genre: ['Action', 'Adventure', 'Fantasy'],
    language: ['Hindi', 'Tamil', 'Telugu', 'Malayalam'],
    duration: 167,
    rating: 5.6,
    format: ['2D', '3D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/cfuLZWKqNAz5Ke1PJWBaJBZlXQs.jpg'
  },
  {
    _id: '9',
    title: 'Kantara',
    genre: ['Action', 'Drama', 'Thriller'],
    language: ['Kannada', 'Hindi', 'Tamil', 'Telugu'],
    duration: 148,
    rating: 8.2,
    format: ['2D'],
    poster: 'https://image.tmdb.org/t/p/w500/8y2Q2gkOZszliEqU4V2nDX6I0jG.jpg'
  },
  {
    _id: '10',
    title: 'Pathaan',
    genre: ['Action', 'Adventure', 'Thriller'],
    language: ['Hindi', 'Tamil', 'Telugu'],
    duration: 146,
    rating: 6.0,
    format: ['2D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/lP7dJpanOkSVUNiFl2iHaKXJVFl.jpg'
  },
  {
    _id: '11',
    title: 'Ponniyin Selvan I',
    genre: ['Action', 'Adventure', 'Drama'],
    language: ['Tamil', 'Hindi', 'Telugu', 'Malayalam'],
    duration: 167,
    rating: 7.6,
    format: ['2D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/qNkJZIVmpJb5temNEHkdTkJNIgr.jpg'
  },
  {
    _id: '12',
    title: 'Leo',
    genre: ['Action', 'Crime', 'Thriller'],
    language: ['Tamil', 'Hindi', 'Telugu'],
    duration: 164,
    rating: 7.2,
    format: ['2D', 'IMAX'],
    poster: 'https://image.tmdb.org/t/p/w500/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg'
  }
];

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from database on component mount
  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        const data = await response.json();
        if (data.success) {
          setMovies(data.movies);
        } else {
          setMovies(initialMovies); // Fallback to hardcoded data
        }
      } catch (error) {
        console.log('Failed to fetch from database, using local data');
        setMovies(initialMovies); // Fallback to hardcoded data
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  const [theatres, setTheatres] = useState([
    {
      _id: '1',
      name: 'PVR Cinemas',
      location: 'Mall Road, Delhi',
      screens: 5,
      facilities: ['Parking', 'Food Court', 'AC']
    },
    {
      _id: '2', 
      name: 'INOX Multiplex',
      location: 'City Center, Mumbai',
      screens: 8,
      facilities: ['Parking', 'Food Court', 'IMAX']
    }
  ]);
  
  const [bookings, setBookings] = useState([]);
  
  // Fetch user-specific bookings from database
  React.useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('User bookings response:', data);
          if (data.success) {
            setBookings(data.bookings || []);
          }
        } else {
          console.error('Failed to fetch bookings:', response.status);
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        setBookings([]);
      }
    };
    fetchUserBookings();
  }, []);

  const updateMovie = async (movieId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      if (data.success) {
        // Update local state with database response
        setMovies(movies.map(movie => 
          movie._id === movieId ? data.movie : movie
        ));
      }
    } catch (error) {
      console.log('Database update failed');
    }
  };

  const addMovie = async (newMovie) => {
    const movieWithId = { _id: Date.now().toString(), ...newMovie };
    // Update local state immediately
    setMovies([...movies, movieWithId]);
    
    // Store in database
    try {
      await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieWithId)
      });
    } catch (error) {
      console.log('Database save failed, using local storage');
    }
  };

  const deleteMovie = async (movieId) => {
    // Update local state immediately
    setMovies(movies.filter(movie => movie._id !== movieId));
    
    // Delete from database
    try {
      await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log('Database delete failed, using local storage');
    }
  };

  const updateTheatre = async (theatreId, updatedData) => {
    setTheatres(theatres.map(theatre => 
      theatre._id === theatreId ? { ...theatre, ...updatedData } : theatre
    ));
    
    try {
      await fetch(`http://localhost:5000/api/theatres/${theatreId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (error) {
      console.log('Database update failed, using local storage');
    }
  };

  const addTheatre = async (newTheatre) => {
    const theatreWithId = { _id: Date.now().toString(), ...newTheatre };
    setTheatres([...theatres, theatreWithId]);
    
    try {
      await fetch('http://localhost:5000/api/theatres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theatreWithId)
      });
    } catch (error) {
      console.log('Database save failed, using local storage');
    }
  };

  const deleteTheatre = async (theatreId) => {
    setTheatres(theatres.filter(theatre => theatre._id !== theatreId));
    
    try {
      await fetch(`http://localhost:5000/api/theatres/${theatreId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.log('Database delete failed, using local storage');
    }
  };

  const updateBooking = async (bookingId, updatedData) => {
    setBookings(bookings.map(booking => 
      booking._id === bookingId ? { ...booking, ...updatedData } : booking
    ));
    
    try {
      await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
    } catch (error) {
      console.log('Database update failed, using local storage');
    }
  };

  const addBooking = async (newBooking) => {
    const bookingWithId = { _id: 'BK' + Date.now(), ...newBooking };
    setBookings([...bookings, bookingWithId]);
    
    try {
      await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingWithId)
      });
    } catch (error) {
      console.log('Database save failed, using local storage');
    }
  };

  const deleteBooking = async (bookingId) => {
    setBookings(bookings.filter(booking => booking._id !== bookingId));
    
    try {
      await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'PUT'
      });
    } catch (error) {
      console.log('Database delete failed, using local storage');
    }
  };

  return (
    <MovieContext.Provider value={{ 
      movies, updateMovie, addMovie, deleteMovie, loading,
      theatres, updateTheatre, addTheatre, deleteTheatre,
      bookings, updateBooking, addBooking, deleteBooking
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const useTheatres = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useTheatres must be used within a MovieProvider');
  }
  return { 
    theatres: context.theatres, 
    updateTheatre: context.updateTheatre, 
    addTheatre: context.addTheatre, 
    deleteTheatre: context.deleteTheatre 
  };
};

export const useBookings = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useBookings must be used within a MovieProvider');
  }
  return { 
    bookings: context.bookings, 
    updateBooking: context.updateBooking, 
    addBooking: context.addBooking, 
    deleteBooking: context.deleteBooking 
  };
};