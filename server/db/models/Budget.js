const Sequelize = require('sequelize');
const db = require('../db');

const Budget = db.define('budget', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Budget;
