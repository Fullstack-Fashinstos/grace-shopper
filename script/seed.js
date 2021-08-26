"use strict";

const {
  db,
  models: { User, Cart, Product, Order, Order_Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const shoes = [
  {
    name: "Electric Sneakers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 60000,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/R5gcTwsme68",
  },
  {
    name: "Suede High Tops",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 8499,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/NGWwHZeHNVE",
  },
  {
    name: "Minimalist Flats",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 3450,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/XZ3EmAIWuz0",
  },
  {
    name: "Aqua Trainers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 7999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/jZyacqaR4iI",
  },
  {
    name: "Sierra Hiking Boots",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 20000,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/Osq7UAVxIOI",
  },
  {
    name: "Nike Sneakers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 5000,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/J2-wAQDckus",
  },
  {
    name: "Skate Shoes",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 5999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/SmCIRo1QCpo",
  },
  {
    name: "Leather Work Boots",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 14999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/B1Sn_ADEohs",
  },
  {
    name: "K-Swiss Trainers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 4999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/jLEGurepDco",
  },
  {
    name: "City Sneakers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 7999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/6zO5VKogoZE",
  },
  {
    name: "Nike High Tops",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 5999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/dT6wB15xdoA",
  },
  {
    name: "Neon Athletic Sneakers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 8999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/4JHMt29fvj8",
  },
  {
    name: "Outdoors Trek Boots",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 17500,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/cHxZmiziwMI",
  },
  {
    name: "Yellow Low Tops",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 3800,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/OJTNpLmsSHs",
  },
  {
    name: "Beige All Stars",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 5999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/YQbJLyY0hFU",
  },
  {
    name: "All Terrain Boot",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 18900,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/_S83j9FBfw0",
  },
  {
    name: "Mesh Flats",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 9999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/1kOIl9vu4cY",
  },
  {
    name: "Boost Walking Shoes",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 2000,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/mgweTPIa2Pc",
  },
  {
    name: "Nike Leather Sneakers",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 7000,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/PqbL_mxmaUE",
  },
  {
    name: "Leather Oxfords",
    stock: Math.floor(Math.random() * 50) + 1,
    price: 14999,
    description:
      "Light-weight shoes for indoor and outdoor use constructed from the most durable, long-lasting, and breathable materials. Perfect for casual and business-casual environments. Padded soles provide arch-support to adapt to any activity.",
    imageUrl: "https://source.unsplash.com/jng0VFa-jRw",
  },
];

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

  for (let i = 0; i < shoes.length; i++) {
    await Promise.all([Product.create(shoes[i])]);
  }

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

  for (let i = 0; i < 101; i++) {
    const order_product = await Promise.all([
      Order_Product.create({
        productId: Math.floor(Math.random() * 20) + 1,
        orderId: Math.floor(Math.random() * 20) + 1,
      }),
    ]);
  }
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
