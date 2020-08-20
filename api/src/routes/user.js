const server = require("express").Router();
const { User, Order, Productsorder, Product } = require("../db.js");

server.post("/", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  User.create({ email, name, lastname, password, role })
    .then((users) => {
      res.status(201);
      res.send(users.dataValues);
    })
    .catch((error) => {
      next(error);
    });
});

server.put("/:id", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  User.update(
    { email, name, lastname, password, role },
    { where: { id: req.params.id }, returning: true }
  )
    .then((users) => {
      res.send(users[1][0].dataValues);
    })
    .catch((error) => next(error));
});

server.get("/", (req, res, next) => {
  User.findAll({ include: Order })
    .then((users) => {
      res.send(users);
    })
    .catch((error) => next(error));
});

server.delete("/:id", (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then((users) => {
      if (users > 0) {
        res
          .status(200)
          .json({ message: "El Usuario se ha borrado satisfactoriamente." });
      } else {
        res.status(400).json({ message: "No hay ningun producto con ese id." });
      }
      res.send(users);
    })
    .catch((error) => next(error));
});

server.post("/:idUser/cart", (req, res, next) => {
  const idUser = req.params.idUser;
  const { idProduct, state, address, quantity } = req.body;
  const promiseProduct = Product.findByPk(idProduct);
  const promiseOrder = Order.findOrCreate({
    where: { userId: idUser, state: state, address: address },
  });
  var price;
  var orderId;
  Promise.all([promiseProduct, promiseOrder])
    .then((values) => {
      orderId = values[1][0].dataValues.id;
      price = values[0].dataValues.price;
      let stock = values[0].dataValues.stock;
      console.log("order: ----------------" + values[1][0].dataValues.id);
      if (quantity > stock) {
        return res.status(400).json({ message: "Sin stock disponible" });
      }
      let cart = values[1][0];
      let product = values[0];
      return cart.addProducts(product);
    })
    .then((values) => {
      return Productsorder.update(
        { price, quantity },
        { where: { productId: idProduct, orderId: orderId }, returning: true }
      );
    })
    .then((values) => {
      res.send(values[1][0]);
    })
    .catch((error) => next(error));
});

server.get("/:idUser/cart", (req, res, next) => {
  var orderId;
  Order.findAll({
    where: { userId: req.params.idUser },
    include: User,
  })
    .then((orders) => {
      console.log(orders);
      orderId = orders[0].dataValues.id;
      return Productsorder.findAll({
        where: { orderId: orderId },
      });
    })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => next(error));
});

server.delete("/:idUser/cart/", (req, res, next) => {
  var orderId;
  Order.findAll({
    where: { userId: req.params.idUser },
    include: User,
  })
    .then((orders) => {
      orderId = orders[0].dataValues.id;
      return Productsorder.destroy({
        where: { orderId: orderId },
      });
    })
    .then((orders) => {
      if (orders > 0) {
        res
          .status(200)
          .json({ message: "El Carrito se ha vaciado satisfactoriamente." });
      } else {
        res.status(400).json({ message: "No hay ninguna orden con ese id." });
      }
    })
    .catch((error) => next(error));
});

module.exports = server;
