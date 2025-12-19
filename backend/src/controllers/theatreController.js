const Theatre = require('../models/Theatre');
const Show = require('../models/Show');

exports.getAllTheatres = async (req, res) => {
  try {
    const { city } = req.query;
    let query = {};
    
    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    const theatres = await Theatre.find(query);
    res.json({ success: true, theatres });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTheatresByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { city, date } = req.query;

    let matchQuery = { movie: movieId, isActive: true };
    if (date) {
      const showDate = new Date(date);
      showDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(showDate);
      nextDay.setDate(nextDay.getDate() + 1);
      matchQuery.date = { $gte: showDate, $lt: nextDay };
    }

    const shows = await Show.find(matchQuery)
      .populate('theatre')
      .populate('movie', 'title duration');

    let theatres = {};
    shows.forEach(show => {
      const theatreId = show.theatre._id.toString();
      if (!theatres[theatreId]) {
        theatres[theatreId] = {
          theatre: show.theatre,
          shows: []
        };
      }
      theatres[theatreId].shows.push({
        _id: show._id,
        time: show.time,
        format: show.format,
        language: show.language,
        pricing: show.pricing,
        screen: show.screen
      });
    });

    const result = Object.values(theatres);
    if (city) {
      const filtered = result.filter(t => 
        t.theatre.location.city.toLowerCase().includes(city.toLowerCase())
      );
      return res.json({ success: true, theatres: filtered });
    }

    res.json({ success: true, theatres: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);
    res.status(201).json({ success: true, theatre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};