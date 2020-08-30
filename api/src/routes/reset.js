const server = require("express").Router();
const bcrypt = require('bcryptjs');
const { User, Order, Productsorder, Product, Toresetpassword } = require("../db.js");
  

server.post("/", (req, res, next) => {
const {email} = req.body;

  Toresetpassword.create({email})
                .then((users) => {
                  console.log(users)
                  res.status(201);
                  res.send(users.dataValues);
                })
                .catch((error) => {
                  res.status(400)
                  res.send(error);
                });
          });
    
  
  
     
   


module.exports = server;
