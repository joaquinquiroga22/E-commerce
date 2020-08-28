const server = require("express").Router();
const session = require('express-session');
const passport = require('passport');
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");


server.post('/login',  passport.authenticate('local',  { failureFlash: 'Invalid username or password.' }),
  function(req, res) {
    res.status(200).send(true)
})

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    console.log("logeado")
    next();
  } else {
    console.log("no logeado")
    res.send('no logeado');
  }
}

server.get('/me',
  isAuthenticated,
  function(req, res){
    res.send(req.user);
});


server.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


  
module.exports = server;
