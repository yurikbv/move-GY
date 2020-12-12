const express = require('express');

const router = express.Router();

const {getRoutesByNumberController} = require('../controllers/route.controller');

router.get('/routes/:number',getRoutesByNumberController);

module.exports = router;