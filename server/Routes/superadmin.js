const express = require('express');
const router = express.Router();
const { registerSuperadmin, loginSuperadmin } = require('../controllers/superadminController');
const authJwt = require('../middleware/authJwt');

//router.use(authJwt); 
// Register a new superadmin
router.post('/register', registerSuperadmin);

// Login superadmin
router.post('/login', loginSuperadmin);

module.exports = router;