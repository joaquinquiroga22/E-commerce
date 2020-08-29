const server = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  function (req, res) {
    res.status(200).send({
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      lastname: req.user.lastname,
    });
  }
);

server.get("/login", function (req, res) {
  res.status(401).send("Fallo el inicio de sesion");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("no logeado");
    res.send("no logeado");
  }
}

server.get("/me", isAuthenticated, function (req, res) {
  res.send(req.user);
});

server.get("/logout", function (req, res) {
  req.logout();
  res.send(205, "Deslogeado correctamente");
});

module.exports = server;
