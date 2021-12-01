'use strict';

const { db, models: { User, Transaction, Category, Budget, BudgetCategory }} = require('../server/db');

const userTransactionsArray = require ('./userTransactions');  //transactions.js

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
      firstName: 'cody',
      lastName: 'lastname',
      monthlyBudget: 4000,
      income: 90000,
    }),
    User.create({
      email: 'murphy@gmail.com',
      password: '123',
      firstName: 'murphy',
      lastName: 'lastname',
      monthlyBudget: 10000,
      income: 270000,
    }),
  ]);

  const category = await Promise.all([
    Category.create({
      categoryName: 'Food',
    }),
    Category.create({
      categoryName: 'Entertainment',
    }),
    Category.create({
      categoryName: 'Travel',
    }),
    Category.create({
      categoryName: 'Utilities',
    }),
    Category.create({
      categoryName: 'Rent',
    }),
    Category.create({
      categoryName: 'Groceries',
    }),
  ]);

  const transactions = await Promise.all([
    Transaction.bulkCreate(userTransactionsArray),
  ]);

  await users[0].setTransactions(transactions[0]);
  const budgetCategory = await Promise.all([
    BudgetCategory.create({
    userId: 1,
    categoryId: 1,
    budgetForCategory: 1000,
  }),
  BudgetCategory.create({
    userId: 1,
    categoryId: 2,
    budgetForCategory: 1000,
  }),
  BudgetCategory.create({
    userId: 1,
    categoryId: 3,
    budgetForCategory: 1000,
  }),
  BudgetCategory.create({
    userId: 1,
    categoryId: 4,
    budgetForCategory: 1000,
  }),
  BudgetCategory.create({
    userId: 1,
    categoryId: 5,
    budgetForCategory: 1000,
  }),
]);

  await Budget.create({
    userId: 1,
    budget: 4000,
    date: Date.now(),
  });


  console.log(`seeded ${users.length} users`);
  console.log(`seeded transactions`);
  console.log(`seeded successfully`);
  console.log(`seeded categories`);
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
