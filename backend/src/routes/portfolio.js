const express = require('express');
const router = express.Router();
const { 
  getPortfolio, 
  getMyPortfolio, 
  updatePortfolio, 
  getAllPortfolios 
} = require('../controllers/portfolioController');
const { authenticateToken } = require('../middleware/auth');

router.get('/all', getAllPortfolios);
router.get('/my', authenticateToken, getMyPortfolio);
router.put('/my', authenticateToken, updatePortfolio);
router.get('/:username', getPortfolio);

module.exports = router;
