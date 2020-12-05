const express = require('express');

const router = express.Router();

// const { requireSignin } = require('../controllers/auth.controller');
const { readController, updateController, setLocationUserController, logoutUser, activeUser } 
= require('../controllers/user.controller');

router.get('/user/:id', readController);
router.put('/user/:id', updateController);
router.put('/user/location/:id', setLocationUserController);
router.put('/user/logout/:id', logoutUser);
router.put('/user/active/:id', activeUser);

module.exports = router;