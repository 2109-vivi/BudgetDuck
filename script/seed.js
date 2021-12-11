'use strict';

const {
  db,
  models: { User, Transaction, Category, Budget, BudgetCategory },
} = require('../server/db');

const userTransactionsArray = require('./userTransactions'); //transactions.js

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'cody@gmail.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Applebottom',
      monthlyBudget: 4000,
      income: 90000,
    }),
  ]);

  const categoriesArray = [
    'Bank Fees',
    'Cash Advance',
    'Community',
    'Food and Drink',
    'Healthcare',
    'Interest',
    'Payment',
    'Recreation',
    'Service',
    'Shops',
    'Tax',
    'Transfer',
    'Travel',
    'Other',
  ];

  const categories = [];
  for (const category of categoriesArray) {
    const toAdd = await Category.create({ categoryName: category });
    categories.push(toAdd);
  }

  const transactions = await Promise.all([Transaction.bulkCreate(userTransactionsArray)]);

  await users[0].setTransactions(transactions[0]);

  const budgetCategory = await Promise.all([
    BudgetCategory.create({
      userId: 1,
      categoryId: 4,
      budgetForCategory: 400,
    }),
    BudgetCategory.create({
      userId: 1,
      categoryId: 5,
      budgetForCategory: 200,
    }),
    BudgetCategory.create({
      userId: 1,
      categoryId: 7,
      budgetForCategory: 2200,
    }),
    BudgetCategory.create({
      userId: 1,
      categoryId: 8,
      budgetForCategory: 300,
    }),
    BudgetCategory.create({
      userId: 1,
      categoryId: 9,
      budgetForCategory: 300,
    }),
    BudgetCategory.create({
      userId: 1,
      categoryId: 10,
      budgetForCategory: 400,
    }),
    BudgetCategory.create({
      userId: 1,
      categoryId: 13,
      budgetForCategory: 200,
    }),
  ]);
  const currentDate = new Date();
  // await Budget.create({
  //   userId: 1,
  //   budget: 10000,
  //   month: currentDate.getMonth() + 1,
  // });

  await Budget.create({
    userId: 1,
    budget: 4000,
    month: currentDate.getMonth() + 1,
  });

  await Budget.create({
    userId: 1,
    budget: 4100,
    month: 11,
  });

  await Budget.create({
    userId: 1,
    budget: 4100,
    month: 10,
  });

  await Budget.create({
    userId: 1,
    budget: 4100,
    month: 9,
  });
  await Budget.create({
    userId: 1,
    budget: 4100,
    month: 8,
  });
  await Budget.create({
    userId: 1,
    budget: 4050,
    month: 7,
  });
  await Budget.create({
    userId: 1,
    budget: 4000,
    month: 6,
  });
  await Budget.create({
    userId: 1,
    budget: 4000,
    month: 5,
  });
  await Budget.create({
    userId: 1,
    budget: 4000,
    month: 4,
    year: 2021,
  });
  await Budget.create({
    userId: 1,
    budget: 3900,
    month: 3,
    year: 2021,
  });
  await Budget.create({
    userId: 1,
    budget: 3900,
    month: 2,
    year: 2021,
  });
  await Budget.create({
    userId: 1,
    budget: 3900,
    month: 1,
    year: 2021,
  });

  // for (let i = 0; i < transactions[0].length; i++) {
  //   //random number from 1 to 13
  //   let randomCategory = Math.floor(Math.random() * 14);
  //   await transactions[0][i].setCategory(categories[randomCategory]);
  // }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${transactions[0].length} transactions`);
  console.log(`seeded ${categories.length} categories`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
