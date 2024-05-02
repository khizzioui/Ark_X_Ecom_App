const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfileController } = require('../Controllers/userController');
const { registerValidation, loginValidation } = require('../Middlewares/authValidationMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/register', registerValidation(), register);
router.post('/login', loginValidation(), login);
router.patch('/update', authMiddleware, updateProfileController);
//router.patch('/update', updateProfileController);
router.post('/logout', logout);

module.exports = router;