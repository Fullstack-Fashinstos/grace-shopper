const router = require("express").Router();
const { models: {Order, Product}} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const currentCart = await Order.findOne({
      where: {
        userId: req.body.userId,
        fullfilled: false
      }
    })
    await currentCart.update({fullfilled: true})
    const newCart = await Order.create({userId: Number(req.body.userId)})
    res.send(newCart);
  } catch (err) {
    next(err);
  }
})

router.put("/", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.productId);
    product.stock = product.stock - req.body.quantity;
    await product.save();
    res.send(product)
  } catch (err) {
    next(err);
  }
})
