const express = require('express');
const router = express.Router();
const { registerSuperadmin, loginSuperadmin, seeAllUsers, deleteUser, getAllProducts, deleteProduct ,updateCategory,createCategory,deleteCategory,getCategories,getUserCount,getProductCount,getCategoryCount} = require('../controllers/adminController');
const { isAdmin ,adminValidationMiddleware } = require('../Middlewares/adminAuth');

// Register a new superadmin
router.post('/admin/register',adminValidationMiddleware,  registerSuperadmin);
// Login superadmin
router.post('/admin/login',loginSuperadmin);
// See all users (accessible only by admin)
router.get('/admin/users', isAdmin, seeAllUsers);
// Delete user (accessible only by admin)
router.delete('/admin/users/:userId', isAdmin, deleteUser);
// View all products
router.get('/admin/products', isAdmin, getAllProducts);
// Delete a product by ID
router.delete('/admin/products/:productId', isAdmin, deleteProduct);
// Create a new category
router.post('/admin/categories', isAdmin, createCategory);

// Update an existing category
router.put('/admin/categories/:id', isAdmin, updateCategory);

// Delete a category
router.delete('/admin/categories/:id', isAdmin, deleteCategory);

router.get('/admin/categories', isAdmin, getCategories);

router.get('/admin/users/count', isAdmin, getUserCount);
router.get('/admin/products/count', isAdmin, getProductCount);
router.get('/admin/categories/count', isAdmin, getCategoryCount);


module.exports = router;


