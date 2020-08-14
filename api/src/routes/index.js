const { Router } = require("express");
const router = Router();
const categoryRouter = require("./category.js");
const productRouter = require("./product.js");
const { Product } = require("../db.js");
const { Sequelize } = require("sequelize");
router.use("/products/category", categoryRouter);

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.get("/search", (req, res, next) => {
  Product.findAll({
    where: {
      //$or:[
      //{description: {
      //[Sequelize.Op.any]: [req.query.query]
      //}
    },
    //{
    name: {
      [Sequelize.Op.any]: [req.query.query],
      // }
    },
    //]
    //}
  })
    .then((products) => {
      console.log(products[0]);
      res.send(products[0]);
    })
    .catch(next);
});

module.exports = router;
