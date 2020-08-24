const server = require("express").Router();
const { Product, Reviews, User } = require("../db.js");
const { Category } = require("../db.js");
const { Category_Products } = require("../db.js");

//Hacemos un get a / products

server.get("/", (req, res, next) => {
  Product.findAll({ include: Category }) // Traemos todos los productos con sus categorias asociadas
    .then((products) => {
      if (products.length === 0) {
        return res.status(200).send([]);
        //.send({ message: `Todavia no se ha creado ningun Producto` });
      }
      res.send(products);
    })
    .catch((error) => {
      next(error);
    });
});

//Hcemos un post a / products

server.post("/", (req, res, next) => {
  //Tomamos las props del body y hacemos un destructuring
  let { name, description, price, stock, idCategoria, image } = req.body;

  //Validamos que price y stock sean numeros y positivos
  let numeroPrice = isNaN(parseInt(price));
  let numeroStock = isNaN(parseInt(stock));
  name = name.trim();
  description = description.trim();
  if (parseInt(stock) <= 0 || numeroStock) {
    return res
      .status(400)
      .json({ message: "El stock debe ser un Entero positivo" });
  }

  if (parseInt(price) <= 0 || numeroPrice) {
    return res.status(400).send("El precio debe ser un numero positivo");
  }
  //Validamos que name y description no esten vacios (despues de trim)
  if (name === "" || description === "") {
    return res.status(400).send("Nombre y descripcion no pueden estar vacios");
  }
  //validamos que se seleccionaron categorias para el producto
  if (!idCategoria || idCategoria.length === 0) {
    return res.status(400).send("Category missing");
  }

  if (name && description && price && stock) {
    Category.findAll({ where: { id: idCategoria } })
      .then((categories) => {
        if (categories.length !== idCategoria.length) {
          return res
            .status(400)
            .send({ message: `Debe pasar un idCategoria valido` });
        } else {
          return Product.create({ name, description, price, image, stock });
        }
      })
      .then((product) => {
        product.setCategories(idCategoria);
        res.status(201).send(product.dataValues);
      })
      .catch((error) => next(error));
  } else {
    res.sendStatus(404).json({ message: "Missing information" });
  }
});

//Hacemos un delete a / products/:id pasandole un id de productos

server.delete("/:id", (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(function (deleted) {
      if (deleted > 0) {
        res.status(200).json({
          message: `Producto con id: ${req.params.id} Borrado Satisfactoriamente`,
        });
      } else {
        res.status(400).json({ message: "No se elimino el producto" });
      }
    })
    .catch((error) => next(error));
});

//Hacemos un put / product/:id pasandole un id de producto a modificar

server.put("/:id", (req, res, next) => {
  let { name, description, price, image, stock, idCategoria } = req.body;
  if (name) {
    name = name.trim();
  }
  if (description) {
    description = description.trim(); //Saca los espacios del string principio y final
  }

  //Validamos que price y stock existan y sean numeros y positivos.
  if (stock) {
    //existencia
    const numeroStock = isNaN(parseInt(stock));
    if (parseInt(stock) < 0 || numeroStock) {
      return res
        .status(400)
        .json({ message: "El stock debe ser un Entero positivo" });
    }
  }
  if (price) {
    //existencia
    const numeroPrice = isNaN(parseInt(price));
    if ((price && parseInt(price) < 0) || numeroPrice) {
      return res
        .status(400)
        .json({ message: "El precio debe ser un numero positivo" });
    }
  }

  if (name === "" || description === "") {
    return res.status(400).send("Nombre y descripcion no pueden estar vacios");
  }

  if (idCategoria && idCategoria.length > 0) {
    //
    Product.findOne({ where: { id: req.params.id } })
      .then((products) => {
        products.setCategories(idCategoria);
        res.send(products.dataValues);
      })
      .catch((error) => next(error));
  }

  if (name || description || price || image || stock) {
    Product.update(
      { name, description, price, image, stock },
      { where: { id: req.params.id }, returning: true }
    )
      .then((products) => {
        if (products[0] === 0) {
          return res
            .status(400)
            .json({ message: "No se modifico el producto" });
        }
        return res.send(products[1][0].dataValues);
      })
      .catch((error) => next(error));
  }
});

//Hacemos un get a / products/:id para traer un producto por su id

server.get("/:id", (req, res, next) => {
  Product.findAll({
    where: { id: req.params.id },
    include: Category,
  })
    .then((products) => {
      if (products.length === 0) {
        return res.status(400).json({ message: "No se encontro el producto" });
      }
      res.send(products[0]);
    })
    .catch((error) => next(error));
});

// Tasks 17
// Agrega la categoria a un producto
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

// Elimina la categoria de un producto
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

server.post("/:id/review", (req, res, next) => {
  const idProducto = req.params.id;
  const { title, stars, description, idUser } = req.body;
  const promiseProduct = Product.findByPk(idProducto);
  const promiseReviews = Reviews.create({ title, stars, description });
  const promiseUser = User.findByPk(idUser);
  Promise.all([promiseProduct, promiseReviews, promiseUser])
    .then((values) => {
      const product = values[0];
      const review = values[1].dataValues.id;
      const users = values[2];
      product.addReviews(review);
      return users.addReviews(review);
    })
    .then((values) => {
      console.log(values);
      res.send(values);
    })
    .catch((error) => next(error));
});

module.exports = server;
