const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post("/", (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    Category.create({ name, description }).then((category) => {
      res.status(201);
      res.send(category.dataValues);
    });
  } else {
    res.sendStatus(400);
  }
});
server.delete("/:id", (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deleted) {
      if (deleted === 1) {
        res
          .status(200)
          .json({ message: "Categoria borrada Satisfactoriamente" });
      }
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  const { name, description } = req.body;
  Category.update(
    { name, description },
    { where: { id: req.params.id }, returning: true }
  )
    .then((categories) => {
      res.send(categories[1][0].dataValues);
    })
    .catch(next);
});
server.get("/:nameCategory", (req, res, next) => {
  Category.findAll({
    where: {
      name: req.params.nameCategory,
    },
  })
    .then((category) => {
      res.send(category);
    })
    .catch(next);
});
module.exports = server;
