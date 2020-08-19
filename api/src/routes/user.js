const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { User , Order , Products_Order } = require("../db.js");
const { Sequelize } = require("sequelize");

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
    { where: {id: req.params.id}, returning: true}
  ).then((users) => {
    res.send(users[1][0].dataValues)
  }).catch(error => next(error)) 
})

server.get("/", (req, res, next) => {
  User.findAll({include : Order})
  .then((users) => {
  res.send(users)
  }).catch(error => next(error))
})

server.delete("/:id", (req, res, next) => {
  User.destroy(
    { where: {id: req.params.id}}
  ).then((users) => {
    if(users > 0 ){
      res.status(200).json({message : "Su Usuario se ha borrado satisfactoriamente."})
    }else {
      res.status(400).json({message : "No hay ningun producto con ese id."})
    }
    console.log(users)
    res.send(users)
    }).catch(error => next(error))
})

server.post("/:idUser/order", (req, res, next) => {
  // let { idOrder } = req.body
  let { state , address } = req.body;
  var idOrders
  Order.create({ state , address})
    .then((orders) => {
      idOrders = orders.dataValues.id
      return User.findOne({where: {id : req.params.idUser}})
    })
  .then(user => {
    return user.setOrders(idOrders);
  }).then( user => {
    return User.findOne( {include : Order})
  }).then(user => {
    res.status(201).send(user)
  })
  .catch(error => next(error))
})

module.exports = server;







