const router = require("express").Router();
const { models: {Order, Product}} = require("../db");
module.exports = router;

router.post("/:userId", async (req, res, next) => {
  try {
    // token from local storage
    // req.headers.authorization
    const currentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        fullfilled: false
      }
    })
    await currentCart.update({fullfilled: true})
    const newCart = await Order.create({userId: Number(req.params.userId)})
    res.send(newCart);
  } catch (err) {
    next(err);
  }
})

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    product.stock = product.stock - req.body.quantity;
    await product.save();
    res.send(product)
  } catch (err) {
    next(err);
  }
})
