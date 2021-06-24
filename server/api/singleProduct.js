const router = require("express").Router({ mergeParams: true });
const {
  models: { Product },
} = require("../db");
const { adminAuth, userAuth, adminHeaderAuth } = require("./utils");
const { isAdmin } = require("./utils");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

router.put("/", isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.update(req.body.product);
    res.status(204).send(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/", isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.status(202).send(product);
  } catch (error) {
    next(error);
  }
});
