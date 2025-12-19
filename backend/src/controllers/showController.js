const Show = require('../models/Show');
const Theatre = require('../models/Theatre');

exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie')
      .populate('theatre');
    
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    // Get seat layout from theatre
    const theatre = await Theatre.findById(show.theatre._id);
    const screen = theatre.screens.id(show.screen);
    
    res.json({ 
      success: true, 
      show: {
        ...show.toObject(),
        seatLayout: screen.seats
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.status(201).json({ success: true, show });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }
    res.json({ success: true, show });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};