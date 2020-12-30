const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const Cart = require('./Cart');
const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'product.json'
);

const getProductFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};
module.exports = class Product {
	constructor(id, title, imgURL, price, description) {
		this.id = id;
		this.title = title;
		this.imgURL = imgURL;
		this.price = price;
		this.description = description;
	}

	save() {
		getProductFromFile((products) => {
			if (this.id) {
				const existingProduct = products.findIndex((p) => p.id === this.id);
				const updatedProduct = [...products];
				updatedProduct[existingProduct] = this;
				fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
					console.log(err);
				});
			} else {
				this.id = shortid.generate();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static deleteById(id) {
		getProductFromFile((products) => {
			const product = products.find((prod) => prod.id === id);
			const updatedProduct = products.filter((p) => p.id !== id);
			fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
				if (!err) {
					Cart.deleteProduct(id, product.price);
				}
			});
		});
	}

	static fetchAllData(callback) {
		getProductFromFile(callback);
	}

	static fetchProduct(id, cb) {
		getProductFromFile((products) => {
			const product = products.find((p) => p.id === id);
			cb(product);
		});
	}
};
