const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Order } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post("/", (req, res, next) => {
  let { state , address } = req.body;
  Order.create({ state , address})
    .then((users) => {
      res.status(201);
      res.send(users.dataValues);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = server;
