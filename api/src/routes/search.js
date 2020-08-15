const server = require("express").Router();
const { Product } = require("../db.js");
const { Sequelize } = require("sequelize");

server.get("/", (req, res, next) => {
  const valor = req.query.valor;
  console.log(valor);
  Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        { name: { [Sequelize.Op.like]: `%${valor}%` } },
        { description: { [Sequelize.Op.like]: `%${valor}%` } },
      ],
    },
    // returning: true,
  })
    .then((products) => {
      console.log(products[0]);
      if (!products[0]) return res.send(`error ${valor} not found`);
      res.send(products);
    })
    .catch(next);
});

module.exports = server;
