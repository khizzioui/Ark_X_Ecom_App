const {body, validationResult} = require("express-validator");

const registerValidation = () => [
    body('firstName')
        .trim()
        .not()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({min: 2})
        .withMessage('First name must be at least 2 characters long'),
    body('lastName')
        .trim()
        .not()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({min: 2})
        .withMessage('Last name must be at least 2 characters long'),
    body('email')
        .trim()
        .not()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain a special character')

];

const loginValidation = () => [
    body('email')
        .trim()
        .not()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain a special character')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    registerValidation,
    loginValidation,
    validate
};