const router = require('express').Router();
const Sequelize = require('sequelize');
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

// update budget for the user
router.put('/budget', requireToken, async (req, res, next) => {
  try {
    const { user, monthlyBudget } = req.body;

    // check if the user's budget is already the value they entered into the form
    if (user.monthlyBudget != monthlyBudget) {
      // if it's a different number, update the monthlyBudget on the User
      await user.update({
        monthlyBudget,
      });

      // check to see if see there is a historical Budget object associated with the User (if they are an existing user)
      const currentMonth = new Date().getMonth() + 1;
      const doesBudgetExist = await Budget.findOne({
        where: {
          userId: user.id,
        },
        order: [['month', 'DESC']],
      });

      // if there is no historical Budget currently in our db (new user), create a new Budget for the user
      if (!doesBudgetExist) {
        await Budget.create({
          month: currentMonth,
          budget: monthlyBudget,
          userId: user.id,
        });
      } else {
        // if a Budget already exists for the user, update THIS MONTH'S budget value
        await doesBudgetExist.update({
          budget: monthlyBudget,
        });
      }
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
