//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Category = require('./models/Category');
const Budget = require('./models/Budget');
const BudgetCategory = require('./models/BudgetCategory');
//associations could go here!

// one-to-many
User.hasMany(Transaction);
Transaction.belongsTo(User);

// one-to-many
Category.hasMany(Transaction);
Transaction.belongsTo(Category);

// one-to-many
User.hasMany(Budget);
Budget.belongsTo(User);

// many-to-many
User.belongsToMany(Category, { through: BudgetCategory });
Category.belongsToMany(User, { through: BudgetCategory });

Category.belongsToMany(BudgetCategory, { through: 'categoryNames' });
BudgetCategory.belongsToMany(Category, { through: 'categoryNames' });

module.exports = {
  db,
  models: {
    User,
    Transaction,
    Category,
    Budget,
    BudgetCategory,
  },
};
