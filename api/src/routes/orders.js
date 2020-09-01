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
  if(status){
    Order.findAll({ where: { state: status }, include: User })
      .then((orders) => {
        if(orders && orders.length === 0) {
          return res.status(400).json({message: `No hay ordenes con status: ${status}`})
        }
        res.send(orders);
      })
      .catch((error) => next(error));
  } else {

    Order.findAll({ include: User })
      .then((orders) => {
        if(orders && orders.length === 0) {
          return res.status(400).json({message: `No se ha creado ninguna orden`})
        }
        res.send(orders);
      })
      .catch((error) => next(error));
  }

});

server.get("/:id", (req, res, next) => {
  const idOrder = req.params.id
  Order.findAll({
    where: { id: idOrder },
    include: User,
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      next(error);
    })
});

server.put("/:id", (req, res, next) => {
  const { state, address } = req.body;
  if (state && address) {
    Order.update(
      { state, address },
      { where: { id: req.params.id }, returning: true }
    )
      .then((orders) => {
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else if(state) {
    Order.update(
      { state },
      { where: { id: req.params.id }, returning: true }
    )
      .then((orders) => {
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  }
  else if(address) {
    Order.update(
      { address },
      { where: { id: req.params.id }, returning: true }
    )
      .then((orders) => {
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else {
    res
      .status(400)
      .json({ message: "Debe pasar un state o address para modificar" });
  }
});

module.exports = server;
