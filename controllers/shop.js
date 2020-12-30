const Product = require('../models/Product');
const Cart = require('../models/Cart');
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
exports.getCart = (req, res, next) => {
	Cart.getItemCart((cart) => {
		Product.fetchAllData((products) => {
			const cartProducts = [];
			for (product of products) {
				const cartProductData = cart.products.find(
					(prod) => prod.id === product.id
				);
				if (cartProductData) {
					cartProducts.push({
						productData: product,
						quantity: cartProductData.quantity,
					});
				}
			}
			res.render('shop/cart', {
				pageTitle: 'Your cart',
				path: '/cart',
				products: cartProducts,
			});
		});
	});
};

// [POST] /cart
exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.fetchProduct(prodId, (prod) => {
		Cart.addProductToCart(prodId, prod.price);
	});
	res.redirect('/cart');
};

// [POST] /cart-delete-item
exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.fetchProduct(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
		res.redirect('/cart');
	});
};

// [GET] /orders
exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Your orders',
		path: '/orders',
	});
};

// [GET] /checkout
exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout',
	});
};

// [GET] /products/:productId
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.fetchProduct(prodId, (product) => {
		res.render('shop/product-detail', {
			pageTitle: product.title,
			product: product,
			path: '/products',
		});
	});
};
