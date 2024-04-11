const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/userController');
const { registerValidation, loginValidation, validate } = require('../Middlewares/authValidationMiddleware');

router.post('/register', registerValidation(), validate, register);
router.post('/login', loginValidation(), validate, login);

module.exports = router;