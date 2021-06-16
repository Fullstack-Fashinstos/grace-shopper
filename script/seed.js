"use strict";

const {
  db,
  models: { User, Cart, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
    User.create({ username: "tom", password: "123" }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "yeezys",
      stock: 20,
      price: 320.99,
      description: "very nice shoes",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81MUqwW7QEL._AC_UL1500_.jpg",
    }),
    Product.create({
      name: "T-shirt",
      stock: 30,
      price: 20.00,
      description: "very nice T-shirt",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81MUqwW7QEL._AC_UL1500_.jpg",
    }),
  ]);

  const carts = await Promise.all([
    Cart.create({
      userId: 1,
      productId: 1,
      quantity: 1,
    }),
    Cart.create({
      userId: 2,
      productId: 1,
      quantity: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
