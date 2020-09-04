const server = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const { User, Toresetpassword } = require("../db.js");
const { Sequelize } = require("sequelize");

server.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),

  function (req, res) {
    let { email } = req.body;
    console.log(email);
    Toresetpassword.findOne({ where: { email: email } }).then((user) => {
      if (!user) {
        console.log("Entro al !user");
        res.status(200).send({
          id: req.user.id,
          role: req.user.role,
          name: req.user.name,
          lastname: req.user.lastname,
        });
      } else {
        console.log("Entro al update");
        res.status(200);
        console.log(user);
        res.json({ message: "Necesitas cambiar tu password." });
      }
    });
  }
);

server.use(
  "/google/callback",
  passport.authenticate("google", {
    // succesRedirect: "/products",
    failureRedirect: "/auth/login",
  }),
  function (req, res) {
    console.log("----------------------------------- req");
    console.log(req.user[0].dataValues);
    res.send(req.user[0].dataValues);
    // console.log("----------------------------------- resssssssssssssssss");
    // console.log(res);
    // res.send(req[0].dataValues);
    // console.log(res);
    // const user = req[0];
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    // const email = user.dataValues.email;

    // User.findOne({ where: { email: email } }).then((user) => {
    //   // console.log(user.dataValues);
    //   // console.log(res);
    //   // done();
    //   res.send(user.dataValues);
    // });
  }
);

server.use(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

server.get("/login", function (req, res) {
  res.status(401).send("Fallo el inicio de sesion");
});

function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("no logeado");
    res.send("no logeado");
  }
}

server.get("/logout", function (req, res) {
  req.logout();
  res.status(205).send("Deslogeado correctamente");
});

module.exports = server;
