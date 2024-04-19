const express = require("express");
const router = express.Router();
const locationController = require('../Controllers/locationController');









router.get('/location', locationController.getAllLocation);
router.post('/location', locationController.addLocation);
router.patch('/location', locationController.updateLocation);
router.delete('/location/:id', locationController.deleteLocation);


module.exports = router;