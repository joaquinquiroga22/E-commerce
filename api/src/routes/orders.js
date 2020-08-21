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
    where: { id: req.params.id, state: status },
    include: User,
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => next(error));
});

module.exports = server;
