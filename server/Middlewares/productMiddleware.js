const { check ,validationResult} = require('express-validator');



const productAddMiddleware = [
    check('title').notEmpty().withMessage('Field is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }
        next();
    },
    check('images').notEmpty().withMessage('Field is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        
        }
        next();
    }
];
const productUpdateMiddleware = [
    check('price').notEmpty().withMessage('Field is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        next();
    }
];


module.exports = {
    productAddMiddleware,
    productUpdateMiddleware
}