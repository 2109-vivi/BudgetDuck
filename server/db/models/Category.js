const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  categoryName: {
    type: Sequelize.STRING,
  },
});

module.exports = Category;
