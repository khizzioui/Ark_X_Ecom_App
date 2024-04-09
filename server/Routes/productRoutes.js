const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', productController.addProduct);
router.patch('/product', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
