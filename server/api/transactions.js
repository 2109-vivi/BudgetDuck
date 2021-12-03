const router = require('express').Router();
const {
  models: { Transaction, Category },
} = require('../db');
const { requireToken } = require('./gatekeeping');

// get all transactions in the database per user
router.get('/', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const allTransactions = await Transaction.findAll({
      where: { userId: user.id },
      include: [
        { model: Category, as: 'category' }]
    });
    res.send(allTransactions);
  } catch (e) {
    next(e);
  }
});

// create a new transaction in the database
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { transaction } = req.body;
    const { user } = req.body;
    const newTransaction = await Transaction.create({
      ...transaction,
      userId: user.id,
    });
    //by setting category to the datavalues inside newTransactions
    //we are able to make a query for the transaction including the category
    //so that the front end components do not shit the bed
    newTransaction.dataValues.category = await Category.findOne({
      where: { id: transaction.categoryId }
    });
    res.send(newTransaction);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const { transaction } = req.body;
    const updatedTransaction = await Transaction.findOne({
      where: { id: req.params.id, userId: user.id },
    });
    await updatedTransaction.update({
      ...transaction
    });
    updatedTransaction.dataValues.category = await Category.findOne({
      where: { id: transaction.categoryId }
    });
    res.send(updatedTransaction);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const transactionToDelete = await Transaction.findOne({
      where: { id: req.params.id, userId: user.id },
    });
    await transactionToDelete.destroy();
    res.send(transactionToDelete);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
