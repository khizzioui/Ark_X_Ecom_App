const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfileController, getUserProfile } = require('../Controllers/userController');
const { registerValidation, loginValidation } = require('../Middlewares/authValidationMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/register', registerValidation(), register);
router.post('/login', loginValidation(), login);
router.patch('/update', authMiddleware, updateProfileController);
router.get('/userId', authMiddleware, getUserProfile);
router.post('/logout', logout);

module.exports = router;