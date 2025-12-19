const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/Movie');
const Theatre = require('../models/Theatre');
const Show = require('../models/Show');
const User = require('../models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await Movie.deleteMany({});
    await Theatre.deleteMany({});
    await Show.deleteMany({});
    await User.deleteMany({});

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@cinebook.com',
      password: 'admin123',
      phone: '9999999999',
      role: 'admin'
    });

    const movies = await Movie.create([
      {
        title: 'Avengers: Endgame',
        description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos actions and restore balance.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        language: ['English', 'Hindi', 'Tamil'],
        duration: 181,
        rating: 8.4,
        poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
        backdrop: 'https://images.hdqwalls.com/wallpapers/avengers-endgame-8k-2019-movie-5k.jpg',
        trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
        cast: [
          { name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man' },
          { name: 'Chris Evans', character: 'Steve Rogers / Captain America' },
          { name: 'Scarlett Johansson', character: 'Natasha Romanoff / Black Widow' }
        ],
        crew: [{ name: 'Anthony Russo', role: 'Director' }, { name: 'Joe Russo', role: 'Director' }],
        releaseDate: new Date('2024-01-15'),
        format: ['2D', '3D', 'IMAX']
      },
      {
        title: 'Spider-Man: No Way Home',
        description: 'With Spider-Mans identity revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds appear, forcing Peter to discover what it truly means to be Spider-Man.',
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        language: ['English', 'Hindi', 'Tamil'],
        duration: 148,
        rating: 8.2,
        poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
        backdrop: 'https://images.hdqwalls.com/wallpapers/spider-man-no-way-home-2021-4k-7o.jpg',
        trailer: 'https://www.youtube.com/embed/JfVOs4VSpmA',
        cast: [
          { name: 'Tom Holland', character: 'Peter Parker / Spider-Man' },
          { name: 'Zendaya', character: 'MJ' },
          { name: 'Benedict Cumberbatch', character: 'Doctor Strange' }
        ],
        crew: [{ name: 'Jon Watts', role: 'Director' }],
        releaseDate: new Date('2024-01-20'),
        format: ['2D', '3D', 'IMAX']
      },
      {
        title: 'The Batman',
        description: 'When the Riddler begins murdering key political figures in Gotham, Batman is forced to investigate the citys hidden corruption and question his familys involvement.',
        genre: ['Action', 'Crime', 'Drama'],
        language: ['English', 'Hindi'],
        duration: 176,
        rating: 7.8,
        poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_.jpg',
        backdrop: 'https://images.hdqwalls.com/wallpapers/the-batman-2022-movie-4k-7j.jpg',
        trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4',
        cast: [
          { name: 'Robert Pattinson', character: 'Bruce Wayne / Batman' },
          { name: 'Zoë Kravitz', character: 'Selina Kyle / Catwoman' },
          { name: 'Paul Dano', character: 'The Riddler' }
        ],
        crew: [{ name: 'Matt Reeves', role: 'Director' }],
        releaseDate: new Date('2024-02-01'),
        format: ['2D', 'IMAX']
      },
      {
        title: 'Top Gun: Maverick',
        description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads elite graduates on a mission.',
        genre: ['Action', 'Drama'],
        language: ['English', 'Hindi'],
        duration: 130,
        rating: 8.3,
        poster: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
        backdrop: 'https://images.hdqwalls.com/wallpapers/top-gun-maverick-2022-4k-7b.jpg',
        trailer: 'https://www.youtube.com/embed/qSqVVswa420',
        cast: [
          { name: 'Tom Cruise', character: 'Pete Maverick Mitchell' },
          { name: 'Miles Teller', character: 'Bradley Rooster Bradshaw' },
          { name: 'Jennifer Connelly', character: 'Penny Benjamin' }
        ],
        crew: [{ name: 'Joseph Kosinski', role: 'Director' }],
        releaseDate: new Date('2024-02-05'),
        format: ['2D', 'IMAX']
      },
      {
        title: 'Black Panther: Wakanda Forever',
        description: 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King TChalla.',
        genre: ['Action', 'Adventure', 'Drama'],
        language: ['English', 'Hindi', 'Tamil'],
        duration: 161,
        rating: 6.7,
        poster: 'https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
        backdrop: 'https://images.hdqwalls.com/wallpapers/black-panther-wakanda-forever-2022-4k-7k.jpg',
        trailer: 'https://www.youtube.com/embed/_Z3QKkl1WyM',
        cast: [
          { name: 'Letitia Wright', character: 'Shuri' },
          { name: 'Angela Bassett', character: 'Queen Ramonda' },
          { name: 'Tenoch Huerta', character: 'Namor' }
        ],
        crew: [{ name: 'Ryan Coogler', role: 'Director' }],
        releaseDate: new Date('2024-02-10'),
        format: ['2D', '3D', 'IMAX']
      }
    ]);

    const theatres = await Theatre.create([
      {
        name: 'PVR Cinemas',
        location: {
          address: 'Phoenix MarketCity',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        },
        screens: [{
          name: 'Screen 1',
          capacity: 200,
          seats: generateSeats()
        }],
        facilities: ['Parking', 'Food Court', 'AC']
      },
      {
        name: 'INOX Multiplex',
        location: {
          address: 'Select City Walk',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110017'
        },
        screens: [{
          name: 'Screen 1',
          capacity: 180,
          seats: generateSeats()
        }],
        facilities: ['Parking', 'Food Court', 'AC']
      }
    ]);

    const today = new Date();
    const shows = [];
    const showTimes = ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'];

    movies.forEach((movie, movieIndex) => {
      showTimes.forEach((time, timeIndex) => {
        const theatre = theatres[movieIndex % theatres.length];
        shows.push({
          movie: movie._id,
          theatre: theatre._id,
          screen: theatre.screens[0]._id,
          date: today,
          time: time,
          format: movie.format[0],
          language: movie.language[0],
          pricing: { 
            Silver: 150 + (timeIndex * 25), 
            Gold: 200 + (timeIndex * 25), 
            Platinum: 300 + (timeIndex * 25) 
          },
          bookedSeats: []
        });
      });
    });

    await Show.create(shows);

    console.log('🎬 Sample data seeded successfully!');
    console.log(`📽️ Created ${movies.length} movies`);
    console.log(`🏢 Created ${theatres.length} theatres`);
    console.log(`🎫 Created ${shows.length} shows`);
    console.log('🔐 Admin user: admin@cinebook.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

function generateSeats() {
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach((row, rowIndex) => {
    let category = 'Silver';
    if (rowIndex >= 2 && rowIndex <= 5) category = 'Gold';
    if (rowIndex >= 6) category = 'Platinum';
    
    let price = 150;
    if (category === 'Gold') price = 200;
    if (category === 'Platinum') price = 300;
    
    for (let i = 1; i <= 15; i++) {
      seats.push({ row, number: i, category, price });
    }
  });
  
  return seats;
}

connectDB().then(() => {
  seedData();
});