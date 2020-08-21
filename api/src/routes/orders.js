const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Order, User, Productsorder } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post("/", (req, res, next) => {
  let { state, address } = req.body;
  Order.create({ state, address })
    .then((users) => {
      res.status(201);
      res.send(users.dataValues);
    })
    .catch((error) => {
      next(error);
    });
});

server.get("/", (req, res, next) => {
  const key = Object.keys(req.query);
  const status = req.query[key];
  Order.findAll({ where: { state: status }, include: User })
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => next(error));
});

server.get("/:id", (req, res, next) => {
  Order.findAll({
    where: { id: req.params.id },
    include: User,
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => next(error));
});

server.put("/:id", (req, res, next) => {
  const { status, address } = req.body;
  if (status || address) {
    Order.update(
      { status, address },
      { where: { id: req.params.id }, returning: true }
    )
      .then((orders) => {
        console.log(orders);
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else {
    res
      .status(400)
      .json({ message: "Debe pasar un status o address para modificar" });
  }
});

module.exports = server;
