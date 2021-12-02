const router = require('express').Router();
const {
  models: { User, Budget },
} = require('../db');
const { requireToken } = require('./gatekeeping.js');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/budget', requireToken, async (req, res, next) => {
  try {
    const { user, monthlyBudget } = req.body;
    if (user.monthlyBudget != monthlyBudget) {
      await user.update({
        monthlyBudget,
      });
      const date = Date.now();
      Budget.create({
        date,
        budget: monthlyBudget,
        userId: user.id,
      });
      res.status(201).send(monthlyBudget);
    } else {
      res.send(`Your budget is already $${monthlyBudget}`);
    }
  } catch (e) {
    next(e);
  }
});

router.put('/income', requireToken, async (req, res, next) => {
  try {
    const { user, income } = req.body;
    await user.update({
      income,
    });
    res.status(201).send(income);
  } catch (e) {
    next(e);
  }
});
