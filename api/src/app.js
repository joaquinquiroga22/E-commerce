const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;
require("./db.js");

const server = express();
//Middlewares
//Usamos el modulo cors para las politics cors

server.name = "API";
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// app.use(require('express-session')({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false
// }));


server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// passport.use(new Strategy(
//   function(username, password, done) {
//     db.users.findByUsername(username)
//       .then((user) => {
//         if(!user) {
//           return done(null, false);
//         }
//         if(user.password != password) {
//           return done(null, false);
//         }
//         return done(null, user);
//       })
//     .catch(err => {
//       return done(err);
//     })
//   }));

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
  // Al deserealizar la información del usuario va a quedar almacenada en req.user
  
  // passport.deserializeUser(function(id, done) {
  //   db.users.findByPk(id)
  //     .then((user) => {
  //       done(null, user);
  //     })
  //     .catch(err => {
  //       return done(err);
  //     })
  // });
  




module.exports = server;
