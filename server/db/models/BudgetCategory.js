const Sequelize = require('sequelize');
const db = require('../db');
const Budget = require('./Budget.js');

const BudgetCategory = db.define('budgetCategory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  budgetForCategory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = BudgetCategory;
