const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../Middlewares/authMiddleware');
const { productAddMiddleware, productUpdateMiddleware } = require('../Middlewares/productMiddleware');

router.get('/product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product',authMiddleware,productAddMiddleware, productController.addProduct);
router.patch('/product',authMiddleware,productUpdateMiddleware, productController.updateProduct);
router.delete('/product/:id',authMiddleware, productController.deleteProduct);

module.exports = router;
