const DEFAULT_MOVIE_IMAGES = {
  poster: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
  backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
};

const GENRE_SPECIFIC_IMAGES = {
  'Action': {
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg'
  },
  'Comedy': {
    poster: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
    backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
  },
  'Drama': {
    poster: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg'
  },
  'Horror': {
    poster: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
    backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
  },
  'Romance': {
    poster: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
    backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
  }
};

const setDefaultImages = (movieData) => {
  const movie = { ...movieData };
  
  // Set default poster if not provided or empty
  if (!movie.poster || movie.poster.trim() === '') {
    const primaryGenre = movie.genre && movie.genre[0];
    movie.poster = GENRE_SPECIFIC_IMAGES[primaryGenre]?.poster || DEFAULT_MOVIE_IMAGES.poster;
  }
  
  // Set default backdrop if not provided or empty
  if (!movie.backdrop || movie.backdrop.trim() === '') {
    const primaryGenre = movie.genre && movie.genre[0];
    movie.backdrop = GENRE_SPECIFIC_IMAGES[primaryGenre]?.backdrop || DEFAULT_MOVIE_IMAGES.backdrop;
  }
  
  return movie;
};

module.exports = {
  DEFAULT_MOVIE_IMAGES,
  GENRE_SPECIFIC_IMAGES,
  setDefaultImages
};