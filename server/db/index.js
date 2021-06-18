//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/user");
const Product = require("./models/product.js");
const Order = require("./models/orders.js");
const Order_Product = require("./models/order_products.js");
const Cart = require("./models/cart.js");

//associations could go here!

// User.hasMany(Cart);
// Cart.belongsTo(User);
// Product.hasMany(Cart);
// Cart.belongsTo(Product);

Order.hasMany(Order_Product);
Order_Product.belongsTo(Order);

Product.hasMany(Order_Product);
Order_Product.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Product,
  },
};
