const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});
server.get("/category/:nameCategory", (req, res, next) => {
  Category.findAll()
    .then((category) => {
      res.send(category);
    })
    .catch(next);
});
module.exports = server;
