const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

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
	constructor(title, imgURL, price, description) {
		this.title = title;
		this.imgURL = imgURL;
		this.price = price;
		this.description = description;
	}

	save() {
		this.id = shortid.generate();
		getProductFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
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
