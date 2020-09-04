const server = require("express").Router();
const API_KEY = "8c2187dc7c9fd962c4e8f92e52d63f8e-7cd1ac2b-31b88aa3";
const DOMAIN = "sandbox65c135321b814aaa8813daf82bba2367.mailgun.org";
const mailgun = require("mailgun-js");
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Order, User, Productsorder } = require("../db.js");
const { Sequelize } = require("sequelize");
const mercadopago = require("mercadopago");

server.post("/", (req, res, next) => {
  let { state, address } = req.body;
  Order.create({ state, address })
    .then((users) => {
      res.status(201);
      res.send(users.dataValues);
    })
    .catch((error) => {
      next(error);
    });
});

server.get("/", (req, res, next) => {
  const key = Object.keys(req.query);
  const status = req.query[key];
  if (status) {
    Order.findAll({ where: { state: status }, include: User })
      .then((orders) => {
        if (orders && orders.length === 0) {
          return res
            .status(400)
            .json({ message: `No hay ordenes con status: ${status}` });
        }
        res.send(orders);
      })
      .catch((error) => next(error));
  } else {
    Order.findAll({ include: User })
      .then((orders) => {
        if (orders && orders.length === 0) {
          return res
            .status(400)
            .json({ message: `No se ha creado ninguna orden` });
        }
        res.send(orders);
      })
      .catch((error) => next(error));
  }
});

server.get("/:id", (req, res, next) => {
  const idOrder = req.params.id;
  Order.findAll({
    where: { id: idOrder },
    include: User,
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch((error) => {
      next(error);
    });
});

server.put("/:id", (req, res, next) => {
  const { state, address } = req.body;
  if (state && address) {
    Order.update(
      { state, address },
      { where: { id: req.params.id }, returning: true }
    )
      .then((orders) => {
        sendEmail();
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else if (state) {
    Order.update({ state }, { where: { id: req.params.id }, returning: true })
      .then((orders) => {
        sendEmail();
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else if (address) {
    Order.update({ address }, { where: { id: req.params.id }, returning: true })
      .then((orders) => {
        sendEmail();
        res.send(orders[1][0].dataValues);
      })
      .catch((error) => next(error));
  } else {
    res
      .status(400)
      .json({ message: "Debe pasar un state o address para modificar" });
  }
});

mercadopago.configure({
  sandbox: true,
  access_token:
    "TEST-7291361459687504-090121-277640c872600cf5f29c4db7d737b521-250042965",
});

server.get("/mercadopago", (req, res, next) => {
  mercadopago.payment.search().then((values) => {
    console.log(values);
    res.send(values);
  });
});

//mailgun

sendEmail = () =>
  new Promise((resolve, reject) => {
    const data = {
      from: "cailletn@northlands.edu.ar",
      to: "cailletn@northlands.edu.ar",
      subject: "Viverooooo",
      text: "Estamos enviando el mail del checkout",
    };

    mg.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }
      console.log(body);
      return resolve();
    });
  });

server.post("/mailgun", (req, res, next) => {
  sendEmail()
    .then((values) => {
      console.log(values);
      res.json({ message: "Your query has been sent" });
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = server;
