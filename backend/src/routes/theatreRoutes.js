const express = require('express');
const { 
  getAllTheatres, 
  getTheatresByMovie, 
  createTheatre 
} = require('../controllers/theatreController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllTheatres);
router.get('/movie/:movieId', getTheatresByMovie);
router.post('/', adminAuth, createTheatre);

module.exports = router;