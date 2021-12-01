const router = require('express').Router();
const {
  models: { Transaction },
} = require('../db');
const { requireToken } = require('./gatekeeping');

// get all transactions in the database per user
router.get('/getTransactions', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;

     const allTransactions = await Transaction.findAll({
      where: { userId: user.id },
    });
    res.send(allTransactions);
  } catch (e) {
    next(e);
  }
});

// create a new transaction in the database
router.post('/transactions', requireToken, async (req, res, next) => {
  try {
    const { transaction } = req.body;
    const { user } = req.body;
    const newTransaction = await Transaction.create({
      ...transaction,
      userId: user.id,
    });

    res.send(newTransaction);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
