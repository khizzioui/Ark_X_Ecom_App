const { Router } = require("express");

const router = require("express").Router();
const searchController = require('../Controllers/searchController');
const  searchMiddleware  = require('../Middlewares/searchMiddleware');









router.get("/search",[searchMiddleware.searchMiddleware,],searchController.search)


module.exports = router;