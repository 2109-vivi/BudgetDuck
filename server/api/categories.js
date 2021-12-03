const router = require('express').Router();
const { requireToken } = require('./gatekeeping.js');
const {
  models: { Category, Transaction },
} = require('../db');

// get all categories
router.get('/', async (req, res, next) => {
  try {
    res.send(await Category.findAll({ attributes: ['id', 'categoryName'] }));
  } catch (e) {
    next(e);
  }
});

// get all transactions associated with a User by category
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;

    const transactionsPerCategory = await Transaction.findAll({
      where: { userId: user.id, categoryId: req.params.id },
    });
    res.send(transactionsPerCategory);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
