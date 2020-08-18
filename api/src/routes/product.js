const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Category_Products } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll({include: Category})
    .then((products) => res.send(products))
    .catch((error) => next(error));
});

server.post("/", (req, res, next) => {
  let { name, description, price, stock, idCategoria, image } = req.body;

  //Validamos que price y stock sean numeros y positivos
  let numeroPrice = isNaN(parseInt(price));
  let numeroStock = isNaN(parseInt(stock));
  name = name.trim();
  description = description.trim();
  if (parseInt(stock) < 0 || numeroStock) {
    return res
      .status(400)
      .json({ message: "El stock debe ser un Entero positivo" });
  }

  if (parseInt(price) < 0 || numeroPrice) {
    return res.status(400).send("El precio debe ser un numero positivo");
  }
  //Validamos que name y description no esten vacios (despues de trim)
  if (name === "" || description === "") {
    return res.status(400).send("Nombre y descripcion no pueden estar vacios");
  }
  //validamos que se seleccionaron categorias para el producto
  if(!idCategoria || idCategoria.length === 0){
    return res.status(400).send("Category missing");
  }

  if (name && description && price && stock) {
    Product.create({ name, description, price, image, stock })
      .then((product) => {
        product.setCategories(idCategoria);
        res.status(201).send(product.dataValues);
      })

      .catch((error) => next(error));
  } else {
    res.sendStatus(400).json({ message: "Missing information" });
  }
});

server.delete("/:id", (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deleted) {
      if (deleted > 0) {
        res.status(200).json({ message: "Borrado Satisfactoriamente" });
      } else {
        res.status(400).json({ message: "No se elimino el producto" });
      }
    })
    .catch((error) => next(error));
});

server.put("/:id", (req, res, next) => {
  let { name, description, price, stock } = req.body;

  name = name.trim();
  description = description.trim();

  //Validamos que price y stock sean numeros y positivos
  const numeroPrice = isNaN(parseInt(price));
  const numeroStock = isNaN(parseInt(stock));
  if (parseInt(stock) < 0 || numeroStock) {
    return res
      .status(400)
      .json({ message: "El stock debe ser un Entero positivo" });
  }
  if (parseInt(price) < 0 || numeroPrice) {
    return res
      .status(400)
      .json({ message: "El precio debe ser un numero positivo" });
  }

  if (name === "" || description === "") {
    return res.status(400).send("Nombre y descripcion no pueden estar vacios");
  }

  Product.update(
    { name, description, price, stock },
    { where: { id: req.params.id }, returning: true }
  )
    .then((products) => {
      if (products[0] === 0) {
        return res.status(400).json({ message: "No se modifico el producto" });
      }
      res.send(products[1][0].dataValues);
    })
    .catch((error) => next(error));
});

server.get("/:id", (req, res, next) => {
  Product.findAll({ where: { id: req.params.id }, returning: true })
    .then((products) => {
      if (products.length === 0) {
        return res.status(400).json({ message: "No se encontro el producto" });
      }
      res.send(products[0]);
    })
    .catch((error) => next(error));
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
      next(error);
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
      next(error);
    });
});

module.exports = server;
