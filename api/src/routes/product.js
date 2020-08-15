const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Category_Products } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => res.send(products))
    .catch(next);
});


server.post("/", (req, res, next) => {
  const { name, description, price, stock } = req.body;
  const numero = isNaN(parseInt(price));
  const numeroStock = isNaN(parseInt(stock));
  if (parseInt(stock) < 0 || numeroStock) {
    return res.status(400).send("El stock debe ser un Entero positivo");
  }
  if (parseInt(price) < 0 || numero) {
    return res.status(400).send("El precio debe ser un numero positivo");
  }
  if (name && description && price && stock) {
    Product.create({ name, description, price, stock })
      .then((product) => {
        res.status(201);
        res.send(product.dataValues);
      })
      .catch(next);

  } else {
    res.sendStatus(400);
  }
});

server.delete("/:id", (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deleted) {
      if (deleted === 1) {
        res.status(200).json({ message: "Borrado Satisfactoriamente" });

      } else {
        var error = new Error(
          `No se pudo eliminar el producto con id: ${req.params.id}`
        );
        error.status = 400;
        throw error;

      }
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  const { name, description, price, stock } = req.body;
  Product.update(
    { name, description, price, stock },
    { where: { id: req.params.id }, returning: true }
  )
    .then((products) => {
      if (products[0] === 0) {
        var error = new Error(
          `No se pudo actualizar el producto con id: ${req.params.id}`
        );
        error.status = 400;
        throw error;
      }
      res.send(products[1][0].dataValues);
    })
    .catch(next);
});

server.get("/:id", (req, res, next) => {
  Product.findAll({ where: { id: req.params.id }, returning: true })
    .then((products) => {
      console.log(products);
      if (products.length === 0) {
        var error = new Error(
          `No se pudo encontrar el producto con id: ${req.params.id}`
        );
        error.status = 400;
        throw error;
      }
      res.send(products[0]);
    })
    .catch(next);
});

server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
  const { idProducto, idCategoria } = req.params;
  Category_Products.findOrCreate({
    where: {
      productId: idProducto,
      categoryId: idCategoria,
    },
  })
    .then((prodcat) => {
      res.status(201).send(prodcat[0]);
    })
    .catch((error) => {
      res.status(400).send(error.parent.detail);
    });
});

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
  const { idProducto, idCategoria } = req.params;
  Category_Products.destroy({
    where: {
      productId: idProducto,
      categoryId: idCategoria,
    },
  })
    .then(res.send("Categoria eliminada del producto"))
    .catch((error) => {
      res.status(400).send(error.parent.detail);
    });
});

module.exports = server;
