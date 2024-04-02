// middleware/superadminAuth.js

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function authJwt(req, res, next) {
 const authHeader = req.headers.authorization;
 if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, keys.jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.superadmin = user;
      next();
    });
 } else {
    res.sendStatus(401);
 }
}

module.exports = authJwt;

