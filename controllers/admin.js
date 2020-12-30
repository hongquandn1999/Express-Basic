const Product = require('../models/Product');
exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imgURL = req.body.imgURL;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(null, title, imgURL, price, description);
	product.save();
	res.redirect('/');
};
// Edit product

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const proId = req.params.productId;
	Product.fetchProduct(proId, (product) => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const proId = req.body.productId;
	const title = req.body.title;
	const imgURL = req.body.imgURL;
	const price = req.body.price;
	const description = req.body.description;

	const updatedProduct = new Product(proId, title, imgURL, price, description);
	updatedProduct.save();
	res.redirect('/admin/products');
};
// --------------------------------------------------------------------
// Delete product
exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId);
	res.redirect('/admin/products');
};
//---------------------------------------------------------------------
exports.getProducts = (req, res, next) => {
	Product.fetchAllData((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
};
