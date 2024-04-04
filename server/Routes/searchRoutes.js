const { Router } = require("express");

const router = require("express").Router();
const searchController = require("../controller/searchController");
const { searchMiddleware } = require("../middleware/searchMiddleware");









router.get("/search",[searchMiddleware.searchMiddleware,],searchController.search)


module.exports = router;