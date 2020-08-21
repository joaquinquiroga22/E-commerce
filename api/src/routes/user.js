const server = require("express").Router();
const { User, Order, Productsorder, Product } = require("../db.js");

server.post("/", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  if(email && name && lastname && password && role){
    User.create({ email, name, lastname, password, role })
      .then((users) => {
        res.status(201);
        res.send(users.dataValues);
      })
      .catch((error) => {
        next(error);
      });

  } else {
    res.status(400).json({message: "Debe pasar los parametros requeridos."})
  }
});

server.put("/:id", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  if(email || name || lastname || password || role ){
    User.update(
      { email, name, lastname, password, role },
      { where: { id: req.params.id }, returning: true }
    )
      .then((users) => {
        res.send(users[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else{
    res.status(400).json({message: "Debe pasar los parametros a modificar"})
  }
});

server.get("/", (req, res, next) => {
  User.findAll({ include: Order })
    .then((users) => {
      if(users && users.length === 0){
        return res.status(400).json({message: "No existe ningun usuario"})
      }
      res.send(users);
    })
    .catch((error) => next(error));
});

server.delete("/:id", (req, res, next) => {
  const idUser = req.params.id
  User.destroy({ where: { id: idUser } })
    .then((users) => {
      if (users > 0) {
        res
          .status(200)
          .json({ message: "El Usuario se ha borrado satisfactoriamente." });
      } else {
        res.sendStatus(400,{ message: `No hay ningun usuario con el id: ${idUser}` })
      } 
    })
    .catch((error) => next(error));
});

server.post("/:idUser/cart", (req, res, next) => {
  const idUser = req.params.idUser;
  const { idProduct, state, address, quantity } = req.body;
  if(!idProduct || !state || !address || quantity === null ) {
    return res.status(400).json({message: "Debe pasar los parametros necesarios"})
  }
  const promiseProduct = Product.findByPk(idProduct);
  const promiseOrder = Order.findOrCreate({
    where: { userId: idUser, state: state, address: address },
  });
  var price;
  var orderId;
  Promise.all([promiseProduct, promiseOrder])
    .then((values) => {
      orderId = values[1][0].dataValues.id;
      if(values[0] == null) {
        return res.status(400).json({message: "Debe pasar un idProduct valido"})
      }
      price = values[0].dataValues.price;
      let stock = values[0].dataValues.stock;
      if (quantity > stock ) {
        return res.status(400).json({ message: "Sin stock disponible" });
      }
      if (quantity < 1 ) {
        return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
      }
      if(values[1][0] === null) {
        res.status(400).json({message: "No existe un usuario con ese id"})
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

server.put("/:idUser/cart", (req, res, next) => {
  const { quantity, idProducto } = req.body;
  var orderId;
  Order.findAll({
    where: { userId: req.params.idUser },
    include: User,
  }).then((orders) => {
    
    orderId = orders[0].dataValues.id;
    return Productsorder.update(
      { quantity },
      { where: { productId: idProducto, orderId: orderId }, returning: true }
      
    )
      .then((productsorders) => {
        
        res.send(productsorders[1][0]);
      })
      .catch((error) => next(error));
  });
});

server.get("/:idUser/orders", (req, res, next) => {
  User.findAll({
    where: { id: req.params.idUser },
    include: Order,
  })
    .then((orders) => {
      console.log(orders);
      res.send(orders);
    })
    .catch((error) => next(error));
});
module.exports = server;
