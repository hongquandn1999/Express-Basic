const Product = require('../models/Product');
// [GET] /products
exports.getProducts = (req, res, next) => {
	Product.fetchAllData((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All Products',
			path: '/products',
		});
	});
};
// [GET] /
exports.getIndex = (req, res, next) => {
	Product.fetchAllData((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
		});
	});
};
// [GET] /cart
exports.getCard = (req, res, next) => {
	res.render('shop/cart', {
		pageTitle: 'Your card',
		path: '/cart',
	});
};
// [GET] /checkout
exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout',
	});
};
