const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

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
  module.exports = { authJwt, isAdmin };
