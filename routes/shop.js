const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/cart', shopController.getCard);
router.post('/cart', shopController.postCard);
router.get('/orders', shopController.getOrders);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
