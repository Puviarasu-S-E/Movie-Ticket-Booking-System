const express = require('express');
const { 
  getShowById, 
  createShow, 
  updateShow 
} = require('../controllers/showController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', getShowById);
router.post('/', adminAuth, createShow);
router.put('/:id', adminAuth, updateShow);

module.exports = router;