const express = require('express');
const router = express.Router();
const { register, login, logout, updateProfile } = require('../Controllers/userController');
const { registerValidation, loginValidation, validate } = require('../Middlewares/authValidationMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/register', registerValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);
router.patch('/update', authMiddleware, updateProfile);
router.post('/logout', logout);

module.exports = router;