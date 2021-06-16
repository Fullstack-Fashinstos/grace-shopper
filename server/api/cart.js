const router = require("express").Router();
const {
  models: { Cart, Product, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Cart.findAll({
      include: Product,
      where: {
        userId: 1,
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// router.put("/:id", async (req, res, next) => {
//   try {
//     const item = await Cart.findByPk()
//   } catch {

//   }
// });
