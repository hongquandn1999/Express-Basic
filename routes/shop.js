const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/card', shopController.getCard);
router.get('/products', shopController.getProducts);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
