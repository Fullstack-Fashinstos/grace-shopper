//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product.js");
const Cart = require("./models/Cart.js");

//associations could go here!

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
  },
};
