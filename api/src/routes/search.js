const server = require("express").Router();
const { Product } = require("../db.js");
const { Sequelize } = require("sequelize");

server.get("/", (req, res, next) => {
  const key = Object.keys(req.query);
  const valor = req.query[key];
  Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        { name: { [Sequelize.Op.like]: `%${valor}%` } },
        { description: { [Sequelize.Op.like]: `%${valor}%` } },
      ],
    },
  })
    .then((products) => {
      console.log(req.query);
      if (!products[0]) {
        var error = new Error(`error "${valor}" not found`);
        error.status = 400;
        throw error;
      }
      res.send(products);
    })
    .catch(next);
});

module.exports = server;
