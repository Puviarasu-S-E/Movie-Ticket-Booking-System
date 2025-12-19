# Movie Ticket Booking System (MERN Stack)

A complete movie ticket booking system similar to BookMyShow, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🎬 Features

### User Features
- **Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Persistent login sessions

- **Movie Discovery**
  - Browse currently running movies
  - Search movies by name
  - Filter by genre, language, and format
  - Movie details with cast, crew, and trailer

- **Booking Flow**
  - Select theatres and show timings
  - Interactive seat selection
  - Real-time seat availability
  - Multiple payment methods (simulation)
  - Booking confirmation with QR code

- **User Dashboard**
  - View booking history
  - Cancel bookings
  - Update profile information

### Admin Features
- Add/update/delete movies
- Manage theatres and shows
- View all bookings
- Seat pricing configuration

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Styled Components
- Context API for state management
- Axios for API calls
- QR Code generation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS enabled

## 📁 Project Structure

```
MTB System/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   └── App.js
    ├── public/
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-booking
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Seed sample data:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

## 📊 Database Models

### User
- name, email, password, phone, role

### Movie
- title, description, genre, language, duration, rating
- poster, backdrop, trailer, cast, crew
- releaseDate, format, isActive

### Theatre
- name, location (address, city, state, pincode)
- screens with seat layouts
- facilities

### Show
- movie, theatre, screen, date, time
- format, language, pricing
- bookedSeats, isActive

### Booking
- bookingId, user, show, seats
- totalAmount, convenienceFee, taxes, finalAmount
- paymentMethod, paymentStatus, bookingStatus

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Movies
- `GET /api/movies` - Get all movies (with filters)
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Theatres
- `GET /api/theatres` - Get all theatres
- `GET /api/theatres/movie/:movieId` - Get theatres by movie
- `POST /api/theatres` - Create theatre (Admin)

### Shows
- `GET /api/shows/:id` - Get show by ID
- `POST /api/shows` - Create show (Admin)
- `PUT /api/shows/:id` - Update show (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/cancel` - Cancel booking

## 🎨 UI Components

### Common Components
- LoadingSpinner
- ProtectedRoute
- Header/Layout

### Movie Components
- MovieCard
- MovieFilters

### Booking Components
- SeatMap
- PaymentMethods

## 🔧 Key Features Implementation

### Seat Selection
- Interactive seat map with color coding
- Real-time availability checking
- Category-based pricing (Silver, Gold, Platinum)
- Maximum seat selection limit

### Payment Processing
- Multiple payment method simulation
- Order summary with pricing breakdown
- Convenience fee and tax calculation
- Payment status tracking

### Booking Management
- Unique booking ID generation
- QR code for ticket verification
- Booking cancellation (time-based rules)
- Email/SMS notifications (simulation)

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use local MongoDB
2. Configure environment variables
3. Deploy to Heroku, Railway, or similar platform

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Update API URL in environment variables

## 🧪 Testing

### Sample Data
The seed script creates:
- Sample movies with posters and details
- Theatres with seat layouts
- Shows with different timings
- Admin user for testing

### Test Credentials
- Admin: admin@moviebooking.com / admin123
- Regular users can be created via registration

## 📱 Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly seat selection
- Optimized for all screen sizes

## 🔒 Security Features
- JWT token authentication
- Password hashing with bcrypt
- Protected routes (frontend & backend)
- Input validation and sanitization
- CORS configuration

## 🎯 Future Enhancements
- Real payment gateway integration
- Email/SMS notifications
- Movie recommendations
- Reviews and ratings
- Loyalty program
- Multi-language support
- Push notifications
- Advanced admin analytics

## 📄 License
This project is created for educational purposes and portfolio showcase.

## 👨‍💻 Author
Created as a MERN Stack project for college final-year submission and portfolio showcase.

---

**Note**: This is a simulation of a movie booking system. Payment processing is simulated and no real transactions are processed.