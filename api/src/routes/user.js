const server = require("express").Router();
const bcrypt = require("bcryptjs");
const { User, Order, Productsorder, Product } = require("../db.js");

server.post("/", (req, res, next) => {
  let { email, name, lastname, password, role } = req.body;
  if (email && name && lastname && password && role) {
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
    include: [Order],
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
  User.findAll({ include: Order })
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

server.post("/:userid/cart",(req, res, next) => {
  const idUser = req.params.userid;
  const { idProduct, state, address, quantity, description } = req.body;

  const product = Product.findOne({where:{ id: idProduct}});


  Order.findAll({ where: { userId: idUser, state: "cart"} })
    .then((orders) => {
      //Si no hay ninguna orden del usuario en estado cart, creamos una.
      if (orders.length === 0){
        console.log("no hay nah")
        const newOrder = Order.create({ userId: idUser,state: "cart", address: "general pico" })

        Promise.all([product,newOrder])
        .then((values) => {
          let productToAdd = values[0].dataValues;
          let orderData = values[1].dataValues;
          Productsorder.create({price: productToAdd.price, quantity: quantity,
          description: productToAdd.description, orderId: orderData.id, productId: productToAdd.id})
          return orders;
        })
      }
      let updateOrder = orders[0].dataValues;
      const productInOrder = Productsorder.findOne({where: {productId: idProduct, orderId: updateOrder.id}})
      //Si no hay ningun producto en esa orden lo agrega (devuelve null)
      Promise.all([product,productInOrder]).then((values) => {
        let productToAdd = values[0].dataValues;
        if(values[1] === null){
          Productsorder.create({price: productToAdd.price, quantity: quantity,
          description: productToAdd.description, orderId: updateOrder.id, productId: productToAdd.id})
          return values;
        }
        Productsorder.update({price: productToAdd.price, quantity: quantity,
        description: productToAdd.description, productId: productToAdd.id}, {where: { productId: productToAdd.id}});
        return orders;
      })
      .then((values) => {return values})

    })
    .then((order) => {
      res.send(order)
    })
    .catch((err) => {return res.send(err)})

  //Fin del POST
})

server.get("/:idUser/cart", (req, res, next) => {
  var orderId;
  Order.findAll({
    where: { userId: req.params.idUser },
    include: User,
  })
    .then((orders) => {
      if (orders && orders.length === 0) {
        return res.status(400).json({
          message: `No hay ningun usuario con el id: ${req.params.idUser}`,
        });
      } else {
        orderId = orders[0].dataValues.id;
        return Productsorder.findAll({
          where: { orderId: orderId },
        });
      }
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

server.put("/:idUser/cart", (req, res, next) => {
  const { quantity, idProducto } = req.body;
  var orderId;
  if (quantity && idProducto) {
    Order.findAll({
      where: { userId: req.params.idUser },
      include: User,
    }).then((orders) => {
      if (orders && orders.length === 0) {
        res.status(400).json({
          message: `No hay ningun usuario con el id: ${req.params.idUser}`,
        });
      }
      if (orders[0].dataValues.id !== idProducto) {
        res
          .status(400)
          .json({ message: `No hay ningun usuario con el id: ${idProducto}` });
      }
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
