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

// server.use(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })
// );

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
  req.session.destroy(function (e) {
    req.logout();
    // res.redirect('/');
    res.status(205).send({ message: "Deslogeado correctamente" });
  });
  // req.logout();
  // res.cookie("connect.sid", "", { expires: new Date(1), path: "/" });
  // req.logout();
  // // res.clearCookie("connect.sid", { path: "/" });
  // // res.redirect("/");
  // console.log(req.session);
  // req.session = null;
  // req.session.destroy((err) => {
  //   if (!err) {
  //     res
  //       .status(200)
  //       .clearCookie("connect.sid", { path: "/" })
  //       .json({ status: "Success" });
  //   } else {
  //     res.send(err);
  //   }
  // });
  // res.clearCookie("connect.sid");
  // res.redirect("/");
});

module.exports = server;
