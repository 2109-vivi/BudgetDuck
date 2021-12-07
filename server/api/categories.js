const router = require('express').Router();
const { requireToken } = require('./gatekeeping.js');
const {
  models: { Category, Transaction, BudgetCategory, User },
} = require('../db');

// get all categories and budgets by user
router.get('/', requireToken,  async (req, res, next) => {
  try {
    const { user } = req.body;
      const allCategories = await Category.findAll({
        attributes: ['id', 'categoryName'],
        raw : true
      })
      const userBudget = await BudgetCategory.findAll({
        where: {
          userId : user.id
        },
        raw:true
      })
    //If the user has no budgets at all, fill each category with with an object with the key of budgetCategories and a value of an empty array
    if(userBudget.length ===0){
      allCategories.map((category) => {
        category.budgetCategories = []
      })
    }
    else{
      //If the user has more than 0 budgets, loop through  all categories and if their id matches with categoryId in userBudget create an object with a key of budgetCategories with [{"budgetForCategory": budgetCategory}] as the value (line 32)
      allCategories.map((category) => {
        userBudget.map((budget) => {
        if( category.id === budget.categoryId) {
            category.budgetCategories = [{"budgetForCategory": budget.budgetForCategory}]
        }
        else if (!category.budgetCategories){
          category.budgetCategories = []
        }
      })
    })
    }

    res.send(allCategories)
  } catch (e) {
    next(e);
  }
});

// get all category budgets associated with a User by their user.id
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const { user } = req.body;
    const categoryBudgets = await BudgetCategory.findAll({
      where: {
       userId: user.id
      },
    });
    res.send(categoryBudgets);
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
        res.sendStatus(409);
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
      res.sendStatus(409);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
