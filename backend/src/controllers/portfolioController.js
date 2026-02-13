const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

const getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    if (!portfolio.isPublic && (!req.user || req.user.userId !== user._id.toString())) {
      return res.status(403).json({ message: 'This portfolio is private' });
    }

    res.json({
      ...portfolio.toObject(),
      user: {
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.userId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    console.error('Get my portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const updates = req.body;
    
    const portfolio = await Portfolio.findOne({ userId: req.user.userId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        portfolio[key] = updates[key];
      }
    });

    await portfolio.save();

    res.json({
      message: 'Portfolio updated successfully',
      portfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllPortfolios = async (req, res) => {
  try {
    const { search, page = 1, limit = 12 } = req.query;
    
    const query = { isPublic: true };
    
    let userQuery = {};
    if (search) {
      userQuery = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { displayName: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const users = await User.find(userQuery).select('_id username displayName avatar bio');
    const userIds = users.map(u => u._id);
    
    query.userId = { $in: userIds };

    const portfolios = await Portfolio.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ updatedAt: -1 });

    const portfoliosWithUser = portfolios.map(portfolio => {
      const user = users.find(u => u._id.toString() === portfolio.userId.toString());
      return {
        ...portfolio.toObject(),
        user: {
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          bio: user.bio
        }
      };
    });

    const total = await Portfolio.countDocuments(query);

    res.json({
      portfolios: portfoliosWithUser,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all portfolios error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getPortfolio, 
  getMyPortfolio, 
  updatePortfolio, 
  getAllPortfolios 
};
