const express = require('express');
const { 
  getAllMovies, 
  getMovieById, 
  createMovie, 
  updateMovie, 
  deleteMovie 
} = require('../controllers/movieController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', adminAuth, createMovie);
router.put('/:id', adminAuth, updateMovie);
router.delete('/:id', adminAuth, deleteMovie);

module.exports = router;