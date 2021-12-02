const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  bankTransactionId: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  merchantName: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

module.exports = Transaction;
