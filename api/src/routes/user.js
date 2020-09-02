const server = require("express").Router();
const bcrypt = require("bcryptjs");
const { User, Order, Productsorder, Product, Reviews } = require("../db.js");
const { response } = require("../app.js");

server.post("/", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  if (email && name && lastname && password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        const newUser = {
          email: email,
          name: name,
          lastname: lastname,
          password: hash,
          role: role,
        };
        User.create(newUser)
          .then((users) => {
            console.log(users);
            res.status(201);
            res.send(users.dataValues);
          })
          .catch((error) => {
            console.log("Boka");
            res.status(400);
            res.send(error);
          });
      });
    });
  } else {
    return res
      .status(400)
      .json({ message: "Debe pasar los parametros requeridos." });
  }
});

server.put("/:id", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  if (email || name || lastname || password || role) {
    User.update(
      { email, name, lastname, password, role },
      { where: { id: req.params.id }, returning: true }
    )
      .then((users) => {
        res.send(users[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else {
    res.status(400).json({ message: "Debe pasar los parametros a modificar" });
  }
});

server.get("/:id", (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
    include: [Order, Reviews],
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "No se encontro el usuario" });
      }
      return res.send(user);
    })
    .catch((error) => next(error));
});

server.get("/", (req, res, next) => {
  User.findAll({ include: [Order, Reviews] })
    .then((users) => {
      if (users && users.length === 0) {
        return res.send([]);
      }
      res.send(users);
    })
    .catch((error) => next(error));
});

server.delete("/:id", (req, res, next) => {
  const idUser = req.params.id;
  User.destroy({ where: { id: idUser } })
    .then((users) => {
      if (users > 0) {
        return res
          .status(200)
          .json({ message: "El Usuario se ha borrado satisfactoriamente." });
      } else {
        return res.sendStatus(400, {
          message: `No hay ningun usuario con el id: ${idUser}`,
        });
      }
    })
    .catch((error) => next(error));
});

server.post("/:userid/cart", (req, res, next) => {
  const idUser = req.params.userid;
  const { idProduct, quantity, price } = req.body;
  var resOrder;
  var prodFound;
  //VALIDA QUE PRODUCTO EXISTA
  Product.findOne({ where: { id: idProduct } })
    .then((product) => {
      if (!product) {
        return res.send({
          message: `El producto ID: ${req.params.id} no esta en la base de datos `,
        });
      }
      //Guardo el producto en la variable
      prodFound = product;
      //Busca sino crea ORDEN con (userid y state == "cart")
      return Order.findOrCreate({
        where: { userId: idUser, state: "cart" },
      });
    })
    .then((order) => {
      async function isInCart() {
        //Metodo que verifica si existe el producto en la orden
        const exist = await order[0].hasProduct(prodFound);

        //Si no existe lo agrega
        if (!exist) {
          const agrega = await order[0].addProduct(idProduct, {
            through: { price: price, quantity: quantity },
          });
        }
      }
      isInCart();
      //Metodo que devuelve todos los productos de esa orden;
      return order[0].getProducts();
    })
    .then((productos) => {
      res.send(productos);
    })
    .catch((err) => res.send(err));
});

server.get("/:idUser/cart", (req, res, next) => {
  Order.findOne({
    where: { userId: req.params.idUser, state: "cart" },
    include: Product,
  })
    .then((order) => {
      console.log(order);
      let orderId = order.dataValues.id;
      res.send(order);
    })
    .catch((err) => res.send(err));
});

server.delete("/:idUser/cart/", (req, res, next) => {
  var orderId;
  Order.findAll({
    where: { userId: req.params.idUser },
    include: User,
  })
    .then((orders) => {
      if (orders && orders.length === 0) {
        res.status(400).json({
          message: `No hay ningun usuario con el id: ${req.params.idUser}`,
        });
      }
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
      }
    })
    .catch((error) => next(error));
});

server.delete("/:iduser/cart/:idproduct", (req, res, next) => {
  const idUser = req.params.iduser;
  const idProduct = req.params.idproduct;

  findOrder = Order.findOne({ where: { userId: idUser, state: "cart" } });
  Promise.all([findOrder])
    .then((values) => {
      let order = values[0].dataValues;

      return order;
    })
    .then((order) => {
      Productsorder.destroy({
        where: { orderId: order.id, productId: idProduct },
      });
      return res.send("Producto eliminado del carrito");
    })
    .catch((err) => res.send(err));
});

server.put("/:idUser/cart", (req, res, next) => {
  console.log(`EL ID DE USUARIO QUE LLEGA ES: ${req.params.idUser}`);
  const { quantity, idProducto } = req.body;
  var idUser = req.params.idUser;
  var orderId;
  if (quantity && idProducto) {
    Order.findAll({
      where: { userId: idUser },
      include: User,
    }).then((orders) => {
      if (orders && orders.length === 0) {
        return res.status(400).json({
          message: `No hay ningun usuario con el id: ${req.params.idUser}`,
        });
      }
      // if (orders[0].dataValues.productId !== idProducto) {
      //   return res
      //     .status(400)
      //     .json({ message: `No hay ningun producto con el id: ${idProducto}` });
      // }
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
  } else {
    res.status(400).json({ message: "Debe pasar los parametros necesarios" });
  }
  // Lo que le faltaria a este es que tire un mensaje cuando el idPrdocut que le pasas no coincide con ningun product.
});

// Esta en verdad vendria a ser la password update

server.put("/:id/passwordUpdate", (req, res, next) => {
  let { password } = req.body;
  console.log(password);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      var password = hash;
      User.update(
        { password },
        { where: { id: req.params.id }, returning: true }
      )
        .then((response) => {
          console.log("correcto");
          res.json(response);
        })
        .catch((error) => {
          console.log("ripeo");
          res.json(error);
        });
    });
  });
});

server.put("/:id/passwordReset", (req, res, next) => {
  let password2 = " ";

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password2, salt, function (err, hash) {
      var password = hash;
      User.update(
        { password },
        { where: { id: req.params.id }, returning: true }
      )
        .then((response) => {
          console.log(response);
          res.json(response);
        })
        .catch((error) => {
          console.log("ripeo");
          res.json(error);
        });
    });
  });
});

server.get("/:idUser/orders", (req, res, next) => {
  User.findAll({
    where: { id: req.params.idUser },
    include: Order,
  })
    .then((orders) => {
      if (orders && orders.length === 0) {
        res.status(400).json({
          message: `No hay ningun usuario con el id: ${req.params.idUser}`,
        });
      }
      res.send(orders);
    })
    .catch((error) => next(error));
});

module.exports = server;
