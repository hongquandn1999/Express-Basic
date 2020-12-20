const express = require('express');

const router = express.Router();

// controllers
const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
// /admin/products => GET
router.get('/admin/products', adminController.getProducts);
module.exports = router;
