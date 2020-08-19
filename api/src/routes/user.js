const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post("/", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  User.create({ email, name, lastname, password, role })
    .then((users) => {
      res.status(201);
      res.send(users.dataValues);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = server;
