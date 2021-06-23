const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));

router.use("/cart", require("./cart.js"));
router.use("/checkout", require("./checkout.js"));
router.use("/products", require("./products"));
router.use("/products/:productId", require("./singleProduct"));
router.use("/viewOrder", require("./viewOrders.js"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
