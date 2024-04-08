const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product', productController.getAllPost);
router.get('/product/:id', productController.getPostById);
router.post('/product', productController.addProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
