const { check } = require('express-validator');



async function searchMiddleware(){
    check('q').notEmpty().withMessage('Field is required')
}


module.exports = {
    searchMiddleware
}