const Carts = require('./containerCarts.js');

const carts = new Carts();
let admin;

//Add cart
const addCart = async (req, res) => {
	await carts.save(req.body);
	res.json({ message: 'Cart added' });
}

//Delete cart
const deleteCart = async (req, res) => {
	await carts.deleteById(req.params.id);
	res.json({ message: 'Cart eliminated' });
}

//Get products from cart
const getProducts = async (req, res) => {
	const cartSelected = await carts.getProducts(req.params.id);
	res.send(cartSelected);
}

//Add product to cart
const addProduct = (req, res) => {
	carts.saveProduct(req.body.idCart, req.params.id);
	res.json({ message: 'Product added' });
}

//Delete product from cart
const deleteProduct = (req, res) => {
	carts.deleteProduct(req.params.id, req.params.id_prod);
	res.json({ message: 'Product eliminated' });
}

module.exports = { addCart, deleteCart, getProducts, addProduct, deleteProduct };