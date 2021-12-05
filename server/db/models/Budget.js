const Sequelize = require('sequelize');
const db = require('../db');

const date = new Date()
const year = date.getFullYear()

const Budget = db.define('budget', {
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    defaultValue: year
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Budget;
