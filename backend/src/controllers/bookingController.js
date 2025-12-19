const Booking = require('../models/Booking');
const Show = require('../models/Show');

exports.createBooking = async (req, res) => {
  try {
    const { showId, seats, paymentMethod } = req.body;
    
    // Get show details
    const show = await Show.findById(showId).populate('movie theatre');
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Check if seats are available
    const bookedSeats = show.bookedSeats.map(seat => `${seat.row}${seat.number}`);
    const requestedSeats = seats.map(seat => `${seat.row}${seat.number}`);
    const unavailableSeats = requestedSeats.filter(seat => bookedSeats.includes(seat));
    
    if (unavailableSeats.length > 0) {
      return res.status(400).json({ 
        message: 'Some seats are already booked',
        unavailableSeats 
      });
    }

    // Calculate pricing
    const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);
    const convenienceFee = Math.round(totalAmount * 0.02); // 2%
    const taxes = Math.round((totalAmount + convenienceFee) * 0.18); // 18% GST
    const finalAmount = totalAmount + convenienceFee + taxes;

    // Create booking
    const bookingData = {
      bookingId: 'BK' + Date.now() + Math.floor(Math.random() * 1000),
      user: req.user._id,
      show: showId,
      seats,
      totalAmount,
      convenienceFee,
      taxes,
      finalAmount,
      paymentMethod,
      paymentStatus: 'completed',
      bookingStatus: 'confirmed'
    };
    
    console.log('Creating booking with data:', bookingData);
    const booking = await Booking.create(bookingData);
    console.log('Booking created successfully:', booking._id, 'BookingID:', booking.bookingId);

    // Update show with booked seats
    show.bookedSeats.push(...seats.map(seat => ({ row: seat.row, number: seat.number })));
    await show.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate({
        path: 'show',
        populate: {
          path: 'movie theatre'
        }
      });

    res.status(201).json({ success: true, booking: populatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching bookings for user:', userId);
    console.log('User email:', req.user.email);
    
    // Check all bookings first
    const allBookings = await Booking.find({});
    console.log('Total bookings in database:', allBookings.length);
    
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'show',
        populate: {
          path: 'movie theatre'
        }
      })
      .sort({ createdAt: -1 });

    console.log(`Found ${bookings.length} bookings for user ${userId}`);
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate({
        path: 'show',
        populate: {
          path: 'movie theatre'
        }
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'show',
        populate: {
          path: 'movie theatre'
        }
      });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    // Update booking status
    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    // Remove seats from show
    const show = await Show.findById(booking.show);
    booking.seats.forEach(seat => {
      show.bookedSeats = show.bookedSeats.filter(
        bookedSeat => !(bookedSeat.row === seat.row && bookedSeat.number === seat.number)
      );
    });
    await show.save();

    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};