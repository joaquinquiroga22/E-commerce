const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { User } = require("../db.js");
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
  User.findAll()
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

module.exports = server;

