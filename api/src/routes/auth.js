const server = require("express").Router();
const session = require('express-session');
const passport = require('passport');
const { User} = require("../db.js");
const { Sequelize } = require("sequelize");


server.post('/login',  passport.authenticate('local', { failureRedirect: '/auth/login'}),
  function(req, res) {
    res.status(200).send({id: req.user.id, role: req.user.role})
})

server.get('/login', function(req, res){
    res.status(401).send("Fallo el inicio de sesion");
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    console.log("no logeado")
    res.send('no logeado');
  }
}

server.get('/logout',
  function(req, res){
    req.logout();
    res.status(205).send("Deslogeado correctamente")
  });


module.exports = server;
