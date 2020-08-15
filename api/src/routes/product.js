const server = require("express").Router();
const { Product } = require("../db.js");
const { Category } = require("../db.js");
const { Category_Products } = require("../db.js");

server.get("/", (req, res, next) => {
    Product.findAll()
        .then((products) => res.send(products))
        .catch(next);
});

server.post("/", (req, res) => {
    const { name, description, price, stock } = req.body;
    if (name && description && price && stock) {
        Product.create({ name, description, price, stock }).then((product) => {
            res.status(201);
            res.send(product.dataValues);
        });
    } else {
        res.sendStatus(400);
    }
});
server.delete("/:id", (req, res, next) => {
    Product.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then(function(deleted) {
            if (deleted === 1) {
                res.status(200).json({ message: "Borrado Satisfactoriamente" });
            }
        })
        .catch(next);
});
server.put("/:id", (req, res, next) => {
    const { name, description, price, stock } = req.body;
    Product.update({ name, description, price, stock }, { where: { id: req.params.id }, returning: true })
        .then((products) => {
            res.send(products[1][0].dataValues);
        })
        .catch(next);
});

server.get("/:id", (req, res, next) => {
    Product.findAll({ where: { id: req.params.id }, returning: true })
        .then((products) => res.send(products[0]))
        .catch(next);
});

server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
    const { idProducto, idCategoria } = req.params;
    Category_Products.findOrCreate({
            where: {
                productId: idProducto,
                categoryId: idCategoria
            }
        })
        .then(prodcat => {
            res.status(201).send(prodcat[0])
        })
})

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
    const { idProducto, idCategoria } = req.params;
    Category_Products.destroy({
            where: {
                productId: idProducto,
                categoryId: idCategoria
            }
        })
        .then(
            res.send("Categoria eliminada del producto")
        )
})


module.exports = server;