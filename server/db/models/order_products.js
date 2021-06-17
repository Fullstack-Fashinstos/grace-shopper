const Sequelize = require("sequelize");
const db = require("../db");

const Order_Product = db.define("order_product", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 1,
  },
});

module.exports = Order_Product;
