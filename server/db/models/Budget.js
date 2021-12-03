const Sequelize = require('sequelize');
const db = require('../db');

const Budget = db.define('budget', {
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Budget;
