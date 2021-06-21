const router = require("express").Router({ mergeParams: true });
const {
  models: { Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const product = await Product.findByPk(req.params.productId);
    req.body["price"] = req.body.price * 100;
    console.log(req.body.price, "price in route");
    res.status(204).send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.status(202).send(product);
  } catch (error) {
    next(error);
  }
});
