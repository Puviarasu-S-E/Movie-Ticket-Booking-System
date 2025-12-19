const Movie = require('../models/Movie');
const { setDefaultImages } = require('../utils/defaultImages');

exports.getAllMovies = async (req, res) => {
  try {
    const { search, genre, language, format } = req.query;
    let query = { isActive: true };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = { $in: [genre] };
    }
    if (language) {
      query.language = { $in: [language] };
    }
    if (format) {
      query.format = { $in: [format] };
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movieData = setDefaultImages(req.body);
    const movie = await Movie.create(movieData);
    res.status(201).json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};