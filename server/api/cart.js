const router = require("express").Router();
const {
  models: { Order, Order_Product, Product, User },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const products = await Order.findOne({
      include: [
        {
          model: Order_Product,
          include: Product,
        },
      ],
      where: {
        userId: req.params.id,
        fullfilled: false,
      },
      order: [[Order_Product, "id", "asc"]],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/:productId/:userId/:quantity", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        fullfilled: false
      } })
    const existsInCart = await Order_Product.findOne({
      where: {
        orderId: order.id,
        productId: req.params.productId,
      },
    });
    let newCartItem;
    if (existsInCart) {
      existsInCart.quantity = existsInCart.quantity + Number(req.params.quantity);
      existsInCart.save();
    } else {
      newCartItem = await Order_Product.create({
        quantity: Number(req.params.quantity),
        orderId: order.id,
        productId: req.params.productId,
      });
    }

    res.send(newCartItem || existsInCart);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Order_Product.findByPk(req.params.id);
    await product.update({ quantity: req.body.quantity });
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Order_Product.findByPk(req.params.id);
    await product.destroy();
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

