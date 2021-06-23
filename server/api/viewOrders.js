const router = require("express").Router();
const {
  models: { Order, Order_Product, Product, User },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const currentCart = await Order.findAll({
      include: [
        {
          model: Order_Product,
          include: Product,
        },
      ],
      where: {
        userId: req.body.userId,
        fullfilled: true,
      },
      order: [[Order_Product, "id", "asc"]],
    });
    res.send(currentCart);
  } catch (err) {
    next(err);
  }
});
