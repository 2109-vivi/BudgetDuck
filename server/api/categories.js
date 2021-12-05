const router = require('express').Router();
const { requireToken } = require('./gatekeeping.js');
const {
  models: { Category, Transaction, BudgetCategory, User },
} = require('../db');

// get all categories and budgets by user
router.get('/', async (req, res, next) => {
  try {
    res.send(
      await Category.findAll({
        include: [
          {
            model: BudgetCategory,
            attributes: ['budgetForCategory'],
          },
        ],
        attributes: ['id', 'categoryName'],
      })
    );
  } catch (e) {
    next(e);
  }
});

// get all transactions associated with a User by categoryId
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

// update or create budget for a category by categoryId
router.post('/:id', requireToken, async (req, res, next) => {
  try {
    const { user, newBudget } = req.body;
    // get the total of every categorical budget
    let totalOfBudgetCategories = 0;
    const usersBudgetCategories = await BudgetCategory.findAll({
      where: {
        userId: user.id,
      },
    });
    usersBudgetCategories.forEach((budgetCategory) => {
      totalOfBudgetCategories += budgetCategory.budgetForCategory;
    });

    const budgetCategoryExists = await BudgetCategory.findOne({
      where: {
        userId: user.id,
        categoryId: req.params.id,
      },
    });
    // if a budgetCategory already exists, check if the newBudget is lower or higher than the current one
    // if the newBudget is greater than the current, check if the changed budget will cause the total to go over monthlyBudget
    if (budgetCategoryExists && budgetCategoryExists.budgetForCategory < newBudget) {
      if (totalOfBudgetCategories - budgetCategoryExists.budgetForCategory + newBudget <= user.monthlyBudget) {
        res.send(await budgetCategoryExists.update({ budgetForCategory: newBudget }));
        return;
      } else {
        res.send("Your categorical budgets can't exceed your monthly budget!").status(409);
        return;
      }
      // if the newBudget is less than the current categorical budget, make the change
    } else if (budgetCategoryExists && budgetCategoryExists.budgetForCategory > newBudget) {
      res.send(await budgetCategoryExists.update({ budgetForCategory: newBudget }));
      return;
    }

    // now assuming there is no budgetCategory currently for the user, check if the newBudget will cause the total to go over monthlyBudget
    if (totalOfBudgetCategories + newBudget <= user.monthlyBudget) {
      res.send(
        await BudgetCategory.create({
          userId: user.id,
          budgetForCategory: newBudget,
          categoryId: req.params.id,
        })
      );
    } else {
      res.send("Your categorical budgets can't exceed your monthly budget!").status(409);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
