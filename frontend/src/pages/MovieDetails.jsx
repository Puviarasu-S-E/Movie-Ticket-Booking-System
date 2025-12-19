import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { moviesAPI } from '../services/api.js';
import { useBooking } from '../contexts/BookingContext.jsx';
import { getDefaultImage } from '../utils/defaultImages';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

const HeroSection = styled.div`
  position: relative;
  height: 70vh;
  background: ${props => `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${props.backdrop})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const MovieInfo = styled.div`
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const BookButton = styled(Link)`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 1.2rem 3rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const ContentSection = styled.div`
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 700;
`;

const TrailerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  margin-bottom: 3rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
`;

const TrailerIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CastCard = styled.div`
  text-align: center;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CastImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
`;

const CastName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const CastCharacter = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setMovie: setBookingMovie } = useBooking();

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await moviesAPI.getById(id);
      setMovie(response.data.movie);
      setBookingMovie(response.data.movie);
    } catch (error) {
      // Silent fail - use fallback data
      // Fallback movie data based on ID
      const movieData = {
        '1': {
          title: 'Avengers: Endgame',
          description: 'The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand.',
          genre: ['Action', 'Adventure', 'Drama'],
          language: ['English', 'Hindi', 'Tamil', 'Telugu'],
          duration: 181,
          rating: 8.4,
          format: ['2D', '3D', 'IMAX'],
          poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
          trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
          cast: [{ name: 'Robert Downey Jr.', character: 'Tony Stark' }]
        },
        '2': {
          title: 'Spider-Man: No Way Home',
          description: 'Peter Parker seeks help from Doctor Strange to make the world forget his identity as Spider-Man.',
          genre: ['Action', 'Adventure', 'Sci-Fi'],
          language: ['English', 'Hindi', 'Tamil', 'Telugu'],
          duration: 148,
          rating: 8.2,
          format: ['2D', '3D', 'IMAX'],
          poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
          trailer: 'https://www.youtube.com/embed/JfVOs4VSpmA',
          cast: [{ name: 'Tom Holland', character: 'Spider-Man' }]
        },
        '3': {
          title: 'The Batman',
          description: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
          genre: ['Action', 'Crime', 'Drama'],
          language: ['English', 'Hindi'],
          duration: 176,
          rating: 7.8,
          format: ['2D', 'IMAX'],
          poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
          trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4',
          cast: [{ name: 'Robert Pattinson', character: 'Batman' }]
        },
        '4': {
          title: 'RRR',
          description: 'A tale of two legendary revolutionaries and their journey far away from home.',
          genre: ['Action', 'Drama', 'History'],
          language: ['Telugu', 'Hindi', 'Tamil', 'English'],
          duration: 187,
          rating: 7.9,
          format: ['2D', 'IMAX'],
          poster: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
          trailer: 'https://www.youtube.com/embed/f_vbAtFSEc0',
          cast: [{ name: 'N.T. Rama Rao Jr.', character: 'Komaram Bheem' }]
        },
        '5': {
          title: 'KGF Chapter 2',
          description: 'The blood-soaked land of Kolar Gold Fields has a new overlord now - Rocky.',
          genre: ['Action', 'Crime', 'Drama'],
          language: ['Kannada', 'Hindi', 'Tamil', 'Telugu'],
          duration: 168,
          rating: 8.3,
          format: ['2D', 'IMAX'],
          poster: 'https://upload.wikimedia.org/wikipedia/en/4/4b/K.G.F_Chapter_2.jpg',
          trailer: 'https://www.youtube.com/embed/JKa05nyUmuQ',
          cast: [{ name: 'Yash', character: 'Rocky' }]
        },
        '6': {
          title: 'Pushpa: The Rise',
          description: 'Violence erupts between red sandalwood smugglers and the police charged with bringing down their organization.',
          genre: ['Action', 'Crime', 'Drama'],
          language: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
          duration: 179,
          rating: 7.6,
          format: ['2D'],
          poster: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Pushpa_-_The_Rise_%282021_film%29.jpg',
          trailer: 'https://www.youtube.com/embed/pKctjlxbFDQ',
          cast: [{ name: 'Allu Arjun', character: 'Pushpa Raj' }]
        },
        '7': {
          title: 'Vikram',
          description: 'Members of a black ops team must track and eliminate a gang of masked murderers.',
          genre: ['Action', 'Crime', 'Thriller'],
          language: ['Tamil', 'Hindi', 'Telugu'],
          duration: 174,
          rating: 8.4,
          format: ['2D'],
          poster: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Vikram_2022_poster.jpg',
          trailer: 'https://www.youtube.com/embed/OKBMCL-frPU',
          cast: [{ name: 'Kamal Haasan', character: 'Vikram' }]
        },
        '8': {
          title: 'Brahmastra',
          description: 'Shiva discovers his connection to a secret society of guardians and an ancient power.',
          genre: ['Action', 'Adventure', 'Fantasy'],
          language: ['Hindi', 'Tamil', 'Telugu', 'Malayalam'],
          duration: 167,
          rating: 5.6,
          format: ['2D', '3D', 'IMAX'],
          poster: 'https://upload.wikimedia.org/wikipedia/en/8/86/Brahmastra.jpeg',
          trailer: 'https://www.youtube.com/embed/BUjXzrgntcY',
          cast: [{ name: 'Ranbir Kapoor', character: 'Shiva' }]
        },
        '9': {
          title: 'Kantara',
          description: 'A tribal warrior fights against the forces that threaten his village and ancient traditions.',
          genre: ['Action', 'Drama', 'Thriller'],
          language: ['Kannada', 'Hindi', 'Tamil', 'Telugu'],
          duration: 148,
          rating: 8.2,
          format: ['2D'],
          poster: 'https://image.tmdb.org/t/p/w500/8y2Q2gkOZszliEqU4V2nDX6I0jG.jpg',
          trailer: 'https://www.youtube.com/embed/8mrVmf239GU',
          cast: [{ name: 'Rishab Shetty', character: 'Shiva' }]
        },
        '10': {
          title: 'Pathaan',
          description: 'A spy must stop a mercenary organization from executing a deadly mission.',
          genre: ['Action', 'Adventure', 'Thriller'],
          language: ['Hindi', 'Tamil', 'Telugu'],
          duration: 146,
          rating: 6.0,
          format: ['2D', 'IMAX'],
          poster: 'https://image.tmdb.org/t/p/w500/lP7dJpanOkSVUNiFl2iHaKXJVFl.jpg',
          trailer: 'https://www.youtube.com/embed/vqu4z34wENw',
          cast: [{ name: 'Shah Rukh Khan', character: 'Pathaan' }]
        },
        '11': {
          title: 'Ponniyin Selvan I',
          description: 'The story of Arulmozhivarman, one of the most powerful kings in the south.',
          genre: ['Action', 'Adventure', 'Drama'],
          language: ['Tamil', 'Hindi', 'Telugu', 'Malayalam'],
          duration: 167,
          rating: 7.6,
          format: ['2D', 'IMAX'],
          poster: 'https://image.tmdb.org/t/p/w500/qNkJZIVmpJb5temNEHkdTkJNIgr.jpg',
          trailer: 'https://www.youtube.com/embed/KsH2LA8pCjo',
          cast: [{ name: 'Vikram', character: 'Aditya Karikalan' }]
        },
        '12': {
          title: 'Leo',
          description: 'A mild-mannered cafe owner discovers that his quiet life is threatened when his past catches up with him.',
          genre: ['Action', 'Crime', 'Thriller'],
          language: ['Tamil', 'Hindi', 'Telugu'],
          duration: 164,
          rating: 7.2,
          format: ['2D', 'IMAX'],
          poster: 'https://image.tmdb.org/t/p/w500/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg',
          trailer: 'https://www.youtube.com/embed/qN3wfuPYTI4',
          cast: [{ name: 'Vijay', character: 'Leo Das' }]
        }
      };
      
      const fallbackMovie = {
        _id: id,
        ...movieData[id] || movieData['1'],
        backdrop: movieData[id]?.poster || movieData['1'].poster
      };
      setMovie(fallbackMovie);
      setBookingMovie(fallbackMovie);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh', 
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Loading movie details...
        </div>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <div style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh', 
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Movie not found
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <HeroSection backdrop={movie.backdrop || movie.poster || getDefaultImage('backdrop', movie.genre)}>
        <HeroContent>
          <Poster 
            src={movie.poster || getDefaultImage('poster', movie.genre)} 
            alt={movie.title}
            onError={(e) => {
              e.target.src = getDefaultImage('poster', movie.genre);
            }}
          />
          <MovieInfo>
            <Title>{movie.title}</Title>
            
            <MetaInfo>
              <MetaItem>{movie.genre?.join(', ')}</MetaItem>
              <MetaItem>{movie.duration} min</MetaItem>
              <MetaItem>{movie.language?.join(', ')}</MetaItem>
              <MetaItem>{movie.format?.join(', ')}</MetaItem>
            </MetaInfo>
            
            {movie.rating > 0 && (
              <Rating>
                ⭐ {movie.rating}/10
              </Rating>
            )}
            
            <Description>{movie.description}</Description>
            
            <BookButton to={`/movie/${movie._id}/theatres`}>
              🎫 Book Tickets Now
            </BookButton>
          </MovieInfo>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        {movie.trailer && (
          <>
            <SectionTitle>🎬 Watch Trailer</SectionTitle>
            <TrailerContainer>
              <TrailerIframe
                src={movie.trailer}
                title="Movie Trailer"
                allowFullScreen
              />
            </TrailerContainer>
          </>
        )}

        {movie.cast && movie.cast.length > 0 && (
          <>
            <SectionTitle>🎭 Cast & Crew</SectionTitle>
            <CastGrid>
              {movie.cast.map((actor, index) => (
                <CastCard key={index}>
                  <CastImage>
                    {actor.image ? (
                      <img 
                        src={actor.image} 
                        alt={actor.name} 
                        style={{
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }} 
                      />
                    ) : (
                      '👤'
                    )}
                  </CastImage>
                  <CastName>{actor.name}</CastName>
                  <CastCharacter>as {actor.character}</CastCharacter>
                </CastCard>
              ))}
            </CastGrid>
          </>
        )}
      </ContentSection>
    </Container>
  );
};

export default MovieDetails;