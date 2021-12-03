const router = require('express').Router();
const { requireToken } = require('./gatekeeping.js');
const {
  models: { Category },
} = require('../db');

// get all categories
router.get('/', async (req, res, next) => {
  try {
    res.send(await Category.findAll({ attributes: ['id', 'categoryName'] }));
  } catch (e) {
    next(e);
  }
});

router.get('/transactions', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
  } catch (e) {
    next(e);
  }
});

module.exports = router;
