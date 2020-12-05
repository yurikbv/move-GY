const express = require('express');
const router = express.Router();

//Load controllers
const { googleController, facebookController} = require('../controllers/auth.controller.js');

//Google login or register
router.post('/google_login', googleController);

//facebook login or register
router.post('/facebook_login', facebookController);

module.exports = router;