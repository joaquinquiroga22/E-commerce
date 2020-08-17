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
      if (products.length === 0) {
        return res.json({message: 'No se encontraron resultados'});
      }
      res.send(products);
    })
    .catch(error => next(error));
});

module.exports = server;
