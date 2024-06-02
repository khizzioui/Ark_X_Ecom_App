const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { check, validationResult } = require('express-validator');

function authJwt(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = jwt.verify(token, keys.jwtSecret);
        req.superadmin = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}


const isAdmin = (req, res, next) => {
    // Retrieve the token from the cookie
    const token = req.cookies.token;
    
    if (!token) return res.status(401).send('Access Denied');
    
    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, keys.jwtSecret);
        // Check if the decoded token indicates admin privileges
        
        if (decoded.isAdmin) {
            
            req.user = decoded; // Attach the user information to the request object
            next(); // Pass control to the next middleware or route handler
            
        } else {
            res.status(403).json({ message: 'Unauthorized: Admin access required' });
        }
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

const adminValidationMiddleware = [
    check('username')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters long')
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username may contain only alphanumeric characters, underscores, or hyphens'),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

];


  module.exports = { authJwt, isAdmin , adminValidationMiddleware };
