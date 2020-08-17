const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post("/", (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    Category.create({ name, description })
      .then((category) => {
        res.status(201);
        res.send(category.dataValues);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error.parent.detail);
      });
  }
  if (!name) {
    var error = new Error(`Debe pasar un 'nombre'`);
    error.status = 400;
    throw error;
  }
  if (!description) {
    var error = new Error(`Debe pasar una 'description'`);
    error.status = 400;
    throw error;
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
      } else {
        var error = new Error(
          `No se pudo eliminar la categoria con id: ${req.params.id}`
        );
        error.status = 400;
        throw error;
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
      if (categories[0] === 0) {
        var error = new Error(
          `No se pudo actualizar la categoria con id: ${req.params.id}`
        );
        error.status = 400;
        throw error;
      }
      res.send(categories[1][0].dataValues);
    })
    .catch(next);
});

server.get("/", (req, res, next) => {
  Category.findAll()
    .then((category) => {console.log(category);res.send(category)})
    .catch(next);
});

server.get("/:nameCategory", (req, res, next) => {
  Category.findOne({
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
