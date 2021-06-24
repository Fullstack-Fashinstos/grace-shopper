const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const { isAdmin } = require("./utils");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});
