const express = require('express');

const router = express.Router();

const {getCitiesController, addCityController, updateCityController, deleteCityController} = require('../controllers/city.controller');

router.get('/cities', getCitiesController);
router.post('/city', addCityController);
router.put('/city/:cityId', updateCityController)
router.delete('/city/:cityId', deleteCityController)

module.exports = router;