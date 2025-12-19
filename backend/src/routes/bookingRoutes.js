const express = require('express');
const { 
  createBooking, 
  getUserBookings, 
  getAllBookings,
  getBookingById, 
  cancelBooking 
} = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/', auth, getUserBookings);
router.get('/admin/all', auth, getAllBookings);
router.get('/:id', auth, getBookingById);
router.put('/:id/cancel', auth, cancelBooking);

module.exports = router;