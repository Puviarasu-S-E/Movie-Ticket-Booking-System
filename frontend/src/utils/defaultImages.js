export const DEFAULT_MOVIE_IMAGES = {
  poster: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
  backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
};

export const GENRE_SPECIFIC_IMAGES = {
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

export const getDefaultImage = (type, genre) => {
  const primaryGenre = Array.isArray(genre) ? genre[0] : genre;
  return GENRE_SPECIFIC_IMAGES[primaryGenre]?.[type] || DEFAULT_MOVIE_IMAGES[type];
};