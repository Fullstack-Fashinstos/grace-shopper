"use strict";

const {
  db,
  models: { User, Cart, Product, Order, Order_Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users

  for (let i = 1; i < 21; i++) {
    await Promise.all([User.create({ username: `user${i}`, password: "123" })]);
  }

  await Promise.all([
    User.create({ username: `cody`, password: "123", isAdmin: true }),
  ]);
  // for (let i = 1; i < 21; i++) {
  //   await Promise.all([
  //     User.create({ username: "cody", password: "123", isAdmin: true }),
  //     User.create({ username: "murphy", password: "123" }),
  //     User.create({ username: "tom", password: "123" }),
  //   ]);
  // }

  // const users = await Promise.all([
  //   User.create({ username: "cody", password: "123", isAdmin: true }),
  //   User.create({ username: "murphy", password: "123" }),
  //   User.create({ username: "tom", password: "123" }),
  // ]);

  for (let i = 1; i < 101; i++) {
    await Promise.all([
      Product.create({
        name: `item${i}`,
        stock: Math.floor(Math.random() * 50) + 1,
        price: 30099,
        description: "very nice item",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/81MUqwW7QEL._AC_UL1500_.jpg",
      }),
    ]);
  }

  // await Promise.all([
  //   Product.create({
  //     name: "yeezys",
  //     stock: 20,
  //     price: 29099,
  //     description: "very nice shoes",
  //     imageUrl:
  //       "https://images-na.ssl-images-amazon.com/images/I/81MUqwW7QEL._AC_UL1500_.jpg",
  //   }),
  //   Product.create({
  //     name: "shoes",
  //     stock: 30,
  //     price: 12099,
  //     description: "very very nice shoes",
  //     imageUrl:
  //       "https://images-na.ssl-images-amazon.com/images/I/81MUqwW7QEL._AC_UL1500_.jpg",
  //   }),
  // ]);

  for (let i = 1; i < 21; i++) {
    await Promise.all([
      Order.create({
        fullfilled: false,
        userId: i,
      }),
    ]);
  }

  await Promise.all([
    Order.create({
      fullfilled: false,
      userId: 21,
    }),
  ]);

  // const order = await Promise.all([
  //   Order.create({
  //     fullfilled: false,
  //     userId: 1,
  //   }),
  //   Order.create({
  //     fullfilled: false,
  //     userId: 2,
  //   }),
  //   Order.create({
  //     fullfilled: false,
  //     userId: 3,
  //   }),
  // ]);

  for (let i = 0; i < 101; i++) {
    const order_product = await Promise.all([
      Order_Product.create({
        productId: Math.floor(Math.random() * 99) + 1,
        orderId: Math.floor(Math.random() * 20) + 1,
      }),
    ]);
  }
  // const order_product = await Promise.all([
  //   Order_Product.create({
  //     productId: 1,
  //     orderId: 1,
  //   }),
  // Order_Product.create({
  //   productId: 2,
  //   orderId: 1,
  // }),
  // Order_Product.create({
  //   productId: 2,
  //   orderId: 2,
  // }),

  // ]);

  // const carts = await Promise.all([
  //   Cart.create({
  //     userId: 1,
  //     productId: 1,
  //     quantity: 2,
  //   }),
  //   Cart.create({
  //     userId: 1,
  //     productId: 2,
  //     quantity: 2,
  //   }),
  //   Cart.create({
  //     userId: 2,
  //     productId: 1,
  //     quantity: 1,
  //   }),
  // ]);

  // console.log(`seeded ${users.length} users`);
  // console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
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
