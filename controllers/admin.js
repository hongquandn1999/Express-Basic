const Product = require('../models/Product');
exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imgURL = req.body.imgURL;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, imgURL, price, description);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAllData((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
};
