const server = require('express').Router();
const { Product } = require('../db.js');
const { Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.get('/Category/:NameCategory', (req, res, next) => {   
	Category.findAll()
	    .then(Category =>{              
			res.send(Category);          	
		})          	
		.catch(next);
	});
	server.post("/", (req, res) => {   
		const { name, description, price, stock } = req.body;   
		if (name && description && price && stock) {     
			Product.create({ name, description, price, stock }).then((product) => {       
				res.status(201);       
				res.send(product.dataValues);     
			});   
		} else 
			{     
				res.sendStatus(400);   
			} 
		});	





serve.put('/:productsid', (req, res) =>{
    
});
module.exports = server;