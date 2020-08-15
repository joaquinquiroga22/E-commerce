const { Router } = require("express");
const router = Router();
const categoryRouter = require("./category.js");
const productRouter = require("./product.js");
const searchRouter = require("./search.js");
const { Product } = require("../db.js");
const { Sequelize } = require("sequelize");

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products/category", categoryRouter);
router.use("/products", productRouter);
router.use("/search", searchRouter);

module.exports = router;
