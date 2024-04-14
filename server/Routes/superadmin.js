const express = require('express');
const router = express.Router();
const { registerSuperadmin, loginSuperadmin, seeAllUsers, deleteUser, getAllProducts, deleteProduct } = require('../controllers/superadminController');
const { authJwt, isAdmin } = require('../Middlewares/superadminAuth');

// Register a new superadmin
router.post('/admin/register', registerSuperadmin);
//router.use(authJwt); 
// Login superadmin
router.post('/admin/login', loginSuperadmin);
// See all users (accessible only by admin)
router.get('/admin/users', isAdmin, seeAllUsers);
// Delete user (accessible only by admin)
router.delete('/admin/users/:userId', isAdmin, deleteUser);
// View all products
router.get('/admin/products', isAdmin, getAllProducts);
// Delete a product by ID
router.delete('/admin/products/:productId', isAdmin, deleteProduct);

module.exports = router;


