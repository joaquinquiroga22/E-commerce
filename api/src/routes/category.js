const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post("/", (req, res, next) => {
  let { name, description } = req.body;

  name = name.trim();
  description = description.trim();

  if (!name || !description) {
    var error = new Error(`Parametros: {name, description} missing`);
    error.status = 400;
    next(error);
  }

  if (name === "" || description === "") {
    return res.status(400).send("Nombre y descripcion no pueden estar vacios");
  }

  // FALTA VALIDAR SI LA CATEGORIA YA EXISTE O USAR findOrCreate
  Category.create({ name, description })
    .then((category) => {
      res.status(201);
      res.send(category.dataValues);
    })
    .catch((error) => {
      next(error);
    });
});

server.delete("/:id", (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    // Devuelve cantidad de rows eliminadas
    .then(function (deleted) {
      if (deleted > 0) {
        res
          .status(200)
          .json({ message: "Categoria borrada Satisfactoriamente" });
      } else {
        res.status(400).json({ message: "No se elimino categoria" });
      }
    })
    .catch((error) => next(error));
});

server.put("/:id", (req, res, next) => {
  let { name, description } = req.body;
  if (!name || !description) {
    var error = new Error(`Parametros: {name, description} missing`);
    error.status = 400;
    next(error);
  }

  name = name.trim();
  description = description.trim();

  if (name === "" || description === "") {
    return res.status(400).send("Nombre y descripcion no pueden estar vacios");
  }

  Category.update(
    { name, description },
    { where: { id: req.params.id }, returning: true }
  )
    // Devuelve un arreglo: [cant.rowsupdated, actual row]
    .then((categories) => {
      if (categories[0] === 0) {
        res.status(400).json({ message: "No se actualizo la categoria" });
      } else {
        res.send(categories[1][0].dataValues);
      }
    })
    .catch((error) => next(error));
});

server.get("/", (req, res, next) => {
  let { idCategoria } = req.query;

  // Devuelve Productos en Categorias(array)
  if (idCategoria && idCategoria.length > 0) {
    Category.findAll({
      where: { id: idCategoria },
      include: Product,
    })
      .then((productos) => {
        return res.send(productos);
      })
      .catch((error) => {
        next(error);
      });
  }

  //Devuelve el listado de categorias
  Category.findAll()
    .then((category) => {
      res.send(category);
    })
    .catch((error) => next(error));
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
    .catch((error) => next(error));
});

module.exports = server;
