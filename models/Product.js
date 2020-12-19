const products = [];
const fs = require('fs');
const path = require('path');

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		const p = path.join(
			path.dirname(process.mainModule.filename),
			'data',
			'product.json'
		);
		fs.readFile(p, (err, fileContent) => {
			let products = [];
			if (!err) {
				products = JSON.parse(fileContent);
			}
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAllData(callback) {
		const p = path.join(
			path.dirname(process.mainModule.filename),
			'data',
			'product.json'
		);
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				callback([]);
			}
			callback(JSON.parse(fileContent));
		});
	}
};
